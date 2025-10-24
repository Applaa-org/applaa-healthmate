import { useState } from 'react';
import { Clock, Users, ChefHat, Flame, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RecipeCardProps {
  recipe: {
    id: string;
    name: string;
    prepTime: string;
    cookTime: string;
    servings: number;
    difficulty: string;
    ingredients: string[];
    instructions: string[];
    nutrition: {
      calories: number;
      protein: string;
      fiber: string;
      sugar: string;
    };
    benefits: string[];
    image: string;
  };
  onSwipe: (direction: 'left' | 'right') => void;
  isActive: boolean;
}

export default function RecipeCard({ recipe, onSwipe, isActive }: RecipeCardProps) {
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
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
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-4 right-4">
            <Badge className={getDifficultyColor(recipe.difficulty)}>
              {recipe.difficulty}
            </Badge>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {recipe.name}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Healthy and delicious recipe
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-pink-500" />
              <span className="text-gray-700 font-medium">
                Prep: {recipe.prepTime}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <ChefHat className="w-4 h-4 text-orange-500" />
              <span className="text-gray-700 font-medium">
                Cook: {recipe.cookTime}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-gray-700 font-medium">
                {recipe.servings} servings
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-3 text-lg flex items-center">
              <Flame className="w-5 h-5 mr-2 text-pink-500" />
              Nutrition per serving:
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">{recipe.nutrition.calories}</div>
                <div className="text-sm text-gray-600">Calories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{recipe.nutrition.protein}</div>
                <div className="text-sm text-gray-600">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{recipe.nutrition.fiber}</div>
                <div className="text-sm text-gray-600">Fiber</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{recipe.nutrition.sugar}</div>
                <div className="text-sm text-gray-600">Sugar</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-lg">Ingredients:</h4>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full flex-shrink-0" />
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 text-lg">Instructions:</h4>
            <ol className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
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
            <h4 className="font-semibold text-gray-800 mb-3 text-lg">Health Benefits:</h4>
            <div className="flex flex-wrap gap-2">
              {recipe.benefits.map((benefit, index) => (
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
              <Heart className="w-5 h-5 mr-2" />
              Save Recipe
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl"
            >
              <ChefHat className="w-5 h-5" />
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