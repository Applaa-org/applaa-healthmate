import { useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { ChevronLeft, Clock, Activity, ChefHat, Volume2, Play, Heart } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { healthConditions } from '@/data/healthConditions';
import Header from '@/components/Header';
import ExerciseCard from '@/components/ExerciseCard';
import RecipeCard from '@/components/RecipeCard';
import { MadeWithApplaa } from '@/components/made-with-applaa';

const ConditionDetail = () => {
  const { conditionId } = useParams({ from: '/condition/$conditionId' });
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'exercises' | 'recipes'>('exercises');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  const condition = healthConditions.find(c => c.id === conditionId);

  if (!condition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Condition Not Found</h1>
          <Button
            onClick={() => router.navigate({ to: '/' })}
            className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-full px-6 py-3"
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleExerciseSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentExerciseIndex((prev) => 
        prev < condition.exercises.length - 1 ? prev + 1 : 0
      );
    } else {
      setCurrentExerciseIndex((prev) => 
        prev > 0 ? prev - 1 : condition.exercises.length - 1
      );
    }
  };

  const handleRecipeSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentRecipeIndex((prev) => 
        prev < condition.recipes.length - 1 ? prev + 1 : 0
      );
    } else {
      setCurrentRecipeIndex((prev) => 
        prev > 0 ? prev - 1 : condition.recipes.length - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <Button
          onClick={() => router.navigate({ to: '/' })}
          variant="ghost"
          className="mb-6 text-pink-600 hover:text-pink-700 hover:bg-pink-100 rounded-full px-4 py-2"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className={`w-20 h-20 ${condition.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
            <Heart className="w-10 h-10 text-pink-500" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            {condition.name}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {condition.description}
          </p>
          <Button
            onClick={() => speakText(`Welcome to ${condition.name} care. Here you'll find gentle exercises and healthy recipes tailored for your condition.`)}
            variant="outline"
            className="rounded-full px-6 py-3 border-pink-200 text-pink-600 hover:bg-pink-50"
          >
            <Volume2 className="w-5 h-5 mr-2" />
            Listen to Introduction
          </Button>
        </div>

        {/* Tips Section */}
        <Card className="mb-12 bg-white/90 backdrop-blur-sm rounded-3xl border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <Heart className="w-6 h-6 mr-3 text-pink-500" />
              Helpful Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {condition.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full flex-shrink-0 mt-2" />
                  <span className="text-lg text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <Button
              onClick={() => setActiveTab('exercises')}
              className={cn(
                "rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300",
                activeTab === 'exercises' 
                  ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg" 
                  : "text-gray-600 hover:text-pink-600"
              )}
            >
              <Activity className="w-5 h-5 mr-2" />
              Exercises ({condition.exercises.length})
            </Button>
            <Button
              onClick={() => setActiveTab('recipes')}
              className={cn(
                "rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300",
                activeTab === 'recipes' 
                  ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg" 
                  : "text-gray-600 hover:text-orange-600"
              )}
            >
              <ChefHat className="w-5 h-5 mr-2" />
              Recipes ({condition.recipes.length})
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-2xl mx-auto">
          {activeTab === 'exercises' && (
            <div className="relative">
              {condition.exercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className={cn(
                    "absolute w-full transition-all duration-300",
                    index === currentExerciseIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  )}
                >
                  <ExerciseCard
                    exercise={exercise}
                    onSwipe={handleExerciseSwipe}
                    isActive={index === currentExerciseIndex}
                  />
                </div>
              ))}
              <div className="h-[600px]" /> {/* Spacer for card height */}
            </div>
          )}

          {activeTab === 'recipes' && (
            <div className="relative">
              {condition.recipes.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className={cn(
                    "absolute w-full transition-all duration-300",
                    index === currentRecipeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  )}
                >
                  <RecipeCard
                    recipe={recipe}
                    onSwipe={handleRecipeSwipe}
                    isActive={index === currentRecipeIndex}
                  />
                </div>
              ))}
              <div className="h-[800px]" /> {/* Spacer for card height */}
            </div>
          )}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {activeTab === 'exercises' && condition.exercises.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentExerciseIndex ? "bg-pink-500" : "bg-pink-200"
              )}
            />
          ))}
          {activeTab === 'recipes' && condition.recipes.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentRecipeIndex ? "bg-orange-500" : "bg-orange-200"
              )}
            />
          ))}
        </div>
      </section>

      <MadeWithApplaa />
    </div>
  );
};

export default ConditionDetail;