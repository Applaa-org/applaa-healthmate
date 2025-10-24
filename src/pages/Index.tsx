import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Search, Heart, ChefHat, Activity, Mic, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { healthConditions } from '@/data/healthConditions';
import Header from '@/components/Header';
import { MadeWithApplaa } from '@/components/made-with-applaa';

const Index = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Voice input is not supported in your browser. Please type your health concern.');
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const matchedCondition = healthConditions.find(condition => 
        condition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        condition.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (matchedCondition) {
        router.navigate({ to: `/condition/${matchedCondition.id}` });
      } else {
        // Show a gentle message for unmatched conditions
        alert('We\'re sorry, but we don\'t have specific recommendations for that condition yet. Please try searching for joint pain, diabetes, or low energy, or consult with your healthcare provider.');
      }
    }
  };

  const handleConditionSelect = (conditionId: string) => {
    router.navigate({ to: `/condition/${conditionId}` });
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8; // Slower rate for seniors
      utterance.pitch = 1;
      utterance.volume = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent mb-6">
            Welcome to HealthMate
          </h1>
          <p className="text-2xl text-gray-600 mb-8 leading-relaxed">
            Your gentle companion for daily health and wellness
          </p>
          
          {/* Voice Input Button */}
          <div className="mb-8">
            <Button
              onClick={handleVoiceInput}
              className={cn(
                "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-full px-8 py-4 text-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105",
                isListening && "animate-pulse"
              )}
              size="lg"
            >
              <Mic className="w-6 h-6 mr-3" />
              {isListening ? 'Listening...' : 'Tap to Speak'}
            </Button>
            <p className="text-gray-500 mt-3 text-lg">Say things like "joint pain" or "diabetes"</p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <Input
              type="text"
              placeholder="Type your health concern (e.g., joint pain, diabetes, low energy)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-6 py-4 text-xl rounded-full border-2 border-pink-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 shadow-lg"
            />
            <Button
              onClick={handleSearch}
              className="absolute right-2 top-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-full px-6 py-2"
              size="lg"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Common Health Concerns
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {healthConditions.map((condition) => (
            <Card
              key={condition.id}
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-3xl overflow-hidden border-0 bg-white/90 backdrop-blur-sm"
              onClick={() => handleConditionSelect(condition.id)}
            >
              <div className={`h-32 ${condition.color} flex items-center justify-center`}>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-pink-500" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  {condition.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-gray-600 mb-4">
                  {condition.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-pink-500" />
                    <span className="text-gray-600">{condition.exercises.length} exercises</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ChefHat className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-600">{condition.recipes.length} recipes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">
            Designed for Your Comfort
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/90 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Gentle Exercises
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-gray-600">
                  Safe, low-impact exercises tailored for seniors with clear instructions and appropriate intensity levels
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Healthy Recipes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-gray-600">
                  Nutritious, easy-to-prepare recipes that support your specific health needs and dietary requirements
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <MadeWithApplaa />
    </div>
  );
};

export default Index;