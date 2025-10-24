import { useState } from 'react';
import { Clock, Heart, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ExerciseCardProps {
  exercise: {
    id: string;
    name: string;
    duration: string;
    intensity: string;
    description: string;
    instructions: string[];
    benefits: string[];
    image: string;
  };
  onSwipe: (direction: 'left' | 'right') => void;
  isActive: boolean;
}

export default function ExerciseCard({ exercise, onSwipe, isActive }: ExerciseCardProps) {
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    if (currentX > threshold) {
      onSwipe('right');
    } else if (currentX < -threshold) {
      onSwipe('left');
    }
    
    setCurrentX(0);
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'gentle': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className={cn(
        "relative transition-all duration-300 ease-out",
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-50",
        isDragging && "transition-none"
      )}
      style={{
        transform: `translateX(${currentX}px) ${isActive ? '' : 'scale(0.95)'}`,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Card className={cn(
        "w-full max-w-md mx-auto border-0 shadow-2xl rounded-3xl overflow-hidden",
        "bg-gradient-to-br from-white to-gray-50"
      )}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={exercise.image}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-4 right-4">
            <Badge className={getIntensityColor(exercise.intensity)}>
              {exercise.intensity}
            </Badge>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {exercise.name}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            {exercise.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-pink-500" />
              <span className="text-gray-700 font-medium">{exercise.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-gray-700 font-medium">{exercise.intensity}</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-lg">How to do it:</h4>
            <ol className="space-y-2">
              {exercise.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="bg-pink-100 text-pink-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-lg">Benefits:</h4>
            <div className="flex flex-wrap gap-2">
              {exercise.benefits.map((benefit, index) => (
                <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-xl py-3 text-lg font-semibold"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Exercise
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Swipe indicators */}
      <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 opacity-50">
        <ChevronLeft className="w-12 h-12 text-gray-400" />
      </div>
      <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 opacity-50">
        <ChevronRight className="w-12 h-12 text-gray-400" />
      </div>
    </div>
  );
}