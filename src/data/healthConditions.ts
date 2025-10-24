export interface Exercise {
  id: string;
  name: string;
  duration: string;
  intensity: 'low' | 'medium' | 'gentle';
  description: string;
  instructions: string[];
  benefits: string[];
  image: string;
}

export interface Recipe {
  id: string;
  name: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'easy' | 'medium';
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
}

export interface HealthCondition {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  recipes: Recipe[];
  tips: string[];
  color: string;
}

export const healthConditions: HealthCondition[] = [
  {
    id: 'joint-pain',
    name: 'Joint Pain',
    description: 'Gentle exercises and anti-inflammatory foods to reduce joint discomfort',
    color: 'bg-blue-100',
    tips: [
      'Start with gentle movements and gradually increase intensity',
      'Apply heat before exercising to relax joints',
      'Listen to your body and stop if you feel sharp pain',
      'Stay consistent with gentle daily movement'
    ],
    exercises: [
      {
        id: 'seated-knee-extensions',
        name: 'Seated Knee Extensions',
        duration: '5-10 minutes',
        intensity: 'gentle',
        description: 'Strengthen knee muscles while seated',
        instructions: [
          'Sit comfortably in a chair with feet flat on floor',
          'Slowly extend one leg until straight',
          'Hold for 3-5 seconds',
          'Lower slowly and repeat with other leg',
          'Do 10-15 repetitions per leg'
        ],
        benefits: ['Strengthens quadriceps', 'Improves knee stability', 'Reduces joint stiffness'],
        image: 'https://picsum.photos/300/200?random=1'
      },
      {
        id: 'gentle-neck-rolls',
        name: 'Gentle Neck Rolls',
        duration: '3-5 minutes',
        intensity: 'gentle',
        description: 'Release tension in neck and shoulders',
        instructions: [
          'Sit or stand comfortably with relaxed shoulders',
          'Slowly roll head to the right, then back, then left',
          'Keep movements slow and controlled',
          'Repeat 5 times in each direction',
          'Stop if you feel dizzy or painful'
        ],
        benefits: ['Reduces neck tension', 'Improves flexibility', 'Relieves headaches'],
        image: 'https://picsum.photos/300/200?random=2'
      }
    ],
    recipes: [
      {
        id: 'turmeric-ginger-tea',
        name: 'Golden Anti-Inflammatory Tea',
        prepTime: '5 minutes',
        cookTime: '10 minutes',
        servings: 2,
        difficulty: 'easy',
        ingredients: [
          '2 cups water',
          '1 inch fresh ginger, sliced',
          '1 tsp turmeric powder',
          '1 tbsp honey',
          'Juice of half lemon',
          'Pinch of black pepper'
        ],
        instructions: [
          'Bring water to gentle boil',
          'Add ginger and turmeric',
          'Simmer for 8-10 minutes',
          'Strain into cups',
          'Add honey, lemon, and pepper',
          'Enjoy warm'
        ],
        nutrition: {
          calories: 25,
          protein: '0g',
          fiber: '0g',
          sugar: '6g'
        },
        benefits: ['Reduces inflammation', 'Boosts immunity', 'Aids digestion'],
        image: 'https://picsum.photos/300/200?random=3'
      },
      {
        id: 'salmon-spinach-bowl',
        name: 'Omega-3 Salmon Bowl',
        prepTime: '15 minutes',
        cookTime: '12 minutes',
        servings: 2,
        difficulty: 'easy',
        ingredients: [
          '2 salmon fillets (4 oz each)',
          '4 cups fresh spinach',
          '1 cup quinoa',
          '2 tbsp olive oil',
          '1 lemon',
          'Salt and pepper to taste'
        ],
        instructions: [
          'Cook quinoa according to package directions',
          'Season salmon with salt and pepper',
          'Pan-sear salmon in olive oil for 4-5 minutes per side',
          'Steam spinach until wilted',
          'Serve salmon over quinoa and spinach',
          'Drizzle with lemon juice'
        ],
        nutrition: {
          calories: 380,
          protein: '28g',
          fiber: '6g',
          sugar: '3g'
        },
        benefits: ['Rich in omega-3 fatty acids', 'Anti-inflammatory properties', 'Supports joint health'],
        image: 'https://picsum.photos/300/200?random=4'
      }
    ]
  },
  {
    id: 'diabetes',
    name: 'Diabetes',
    description: 'Low-glycemic exercises and blood sugar-friendly meals',
    color: 'bg-green-100',
    tips: [
      'Monitor blood sugar before and after exercise',
      'Stay hydrated throughout your workout',
      'Choose low-impact activities to protect feet',
      'Eat regular, balanced meals'
    ],
    exercises: [
      {
        id: 'walking-routine',
        name: 'Gentle Walking Routine',
        duration: '20-30 minutes',
        intensity: 'low',
        description: 'Steady-paced walking to improve insulin sensitivity',
        instructions: [
          'Start with 5 minutes of slow walking',
          'Gradually increase to comfortable pace',
          'Maintain steady breathing',
          'Walk on flat, even surfaces',
          'Cool down with 5 minutes slow walking'
        ],
        benefits: ['Improves insulin sensitivity', 'Aids weight management', 'Strengthens heart'],
        image: 'https://picsum.photos/300/200?random=5'
      },
      {
        id: 'seated-arm-circles',
        name: 'Seated Arm Circles',
        duration: '5-8 minutes',
        intensity: 'gentle',
        description: 'Upper body exercise to improve circulation',
        instructions: [
          'Sit comfortably with good posture',
          'Extend arms to sides at shoulder height',
          'Make small circles forward for 30 seconds',
          'Reverse direction for 30 seconds',
          'Rest and repeat 3-4 times'
        ],
        benefits: ['Improves circulation', 'Strengthens shoulder muscles', 'Enhances flexibility'],
        image: 'https://picsum.photos/300/200?random=6'
      }
    ],
    recipes: [
      {
        id: 'quinoa-veggie-bowl',
        name: 'Blood Sugar Balancing Bowl',
        prepTime: '10 minutes',
        cookTime: '20 minutes',
        servings: 3,
        difficulty: 'easy',
        ingredients: [
          '1 cup quinoa',
          '2 cups mixed vegetables (broccoli, bell peppers, zucchini)',
          '2 tbsp olive oil',
          '1/4 cup nuts (almonds or walnuts)',
          'Fresh herbs (parsley, cilantro)',
          'Lemon juice and spices'
        ],
        instructions: [
          'Cook quinoa according to package directions',
          'Steam or sauté vegetables until tender-crisp',
          'Toast nuts lightly in a pan',
          'Combine quinoa, vegetables, and nuts',
          'Drizzle with olive oil and lemon juice',
          'Garnish with fresh herbs'
        ],
        nutrition: {
          calories: 280,
          protein: '9g',
          fiber: '8g',
          sugar: '4g'
        },
        benefits: ['Low glycemic index', 'High in fiber', 'Stabilizes blood sugar'],
        image: 'https://picsum.photos/300/200?random=7'
      },
      {
        id: 'greek-yogurt-parfait',
        name: 'Protein-Rich Yogurt Parfait',
        prepTime: '5 minutes',
        cookTime: '0 minutes',
        servings: 1,
        difficulty: 'easy',
        ingredients: [
          '1 cup plain Greek yogurt',
          '1/4 cup berries (blueberries, strawberries)',
          '1 tbsp chia seeds',
          '1 tsp cinnamon',
          'Few drops vanilla extract',
          'Stevia or small amount of honey if needed'
        ],
        instructions: [
          'Spoon yogurt into a bowl',
          'Top with fresh berries',
          'Sprinkle chia seeds and cinnamon',
          'Add vanilla extract',
          'Sweeten lightly if desired',
          'Enjoy immediately'
        ],
        nutrition: {
          calories: 180,
          protein: '20g',
          fiber: '5g',
          sugar: '8g'
        },
        benefits: ['High protein content', 'Low glycemic impact', 'Supports blood sugar control'],
        image: 'https://picsum.photos/300/200?random=8'
      }
    ]
  },
  {
    id: 'low-energy',
    name: 'Low Energy',
    description: 'Gentle energizing exercises and nutrient-rich meals',
    color: 'bg-yellow-100',
    tips: [
      'Start slowly and build up gradually',
      'Exercise can actually increase energy levels',
      'Stay well-hydrated throughout the day',
      'Eat small, frequent meals to maintain energy'
    ],
    exercises: [
      {
        id: 'deep-breathing',
        name: 'Energizing Deep Breathing',
        duration: '5-10 minutes',
        intensity: 'gentle',
        description: 'Breathing exercises to increase oxygen and energy',
        instructions: [
          'Sit comfortably with straight spine',
          'Inhale deeply through nose for 4 counts',
          'Hold breath for 4 counts',
          'Exhale slowly through mouth for 6 counts',
          'Repeat 10-15 times'
        ],
        benefits: ['Increases oxygen flow', 'Reduces fatigue', 'Calms mind'],
        image: 'https://picsum.photos/300/200?random=9'
      },
      {
        id: 'gentle-stretches',
        name: 'Morning Energy Stretches',
        duration: '10-15 minutes',
        intensity: 'gentle',
        description: 'Gentle stretches to wake up the body',
        instructions: [
          'Start with arms overhead stretch',
          'Gentle side bends left and right',
          'Shoulder rolls forward and backward',
          'Neck stretches gently',
          'Finish with deep breathing'
        ],
        benefits: ['Increases circulation', 'Reduces morning stiffness', 'Boosts energy naturally'],
        image: 'https://picsum.photos/300/200?random=10'
      }
    ],
    recipes: [
      {
        id: 'green-energy-smoothie',
        name: 'Morning Energy Smoothie',
        prepTime: '5 minutes',
        cookTime: '0 minutes',
        servings: 1,
        difficulty: 'easy',
        ingredients: [
          '1 cup spinach',
          '1 banana',
          '1/2 cup Greek yogurt',
          '1 tbsp almond butter',
          '1 cup almond milk',
          '1 tsp honey',
          'Few ice cubes'
        ],
        instructions: [
          'Add all ingredients to blender',
          'Blend until smooth and creamy',
          'Add more milk if too thick',
          'Pour into glass',
          'Enjoy immediately for best nutrition'
        ],
        nutrition: {
          calories: 220,
          protein: '12g',
          fiber: '5g',
          sugar: '15g'
        },
        benefits: ['Natural energy boost', 'Rich in B vitamins', 'Supports metabolism'],
        image: 'https://picsum.photos/300/200?random=11'
      },
      {
        id: 'oatmeal-energy-bowl',
        name: 'Warm Energy Oatmeal',
        prepTime: '2 minutes',
        cookTime: '5 minutes',
        servings: 1,
        difficulty: 'easy',
        ingredients: [
          '1/2 cup rolled oats',
          '1 cup water or milk',
          '1 tbsp ground flaxseed',
          '1/4 cup raisins',
          '1 tsp cinnamon',
          '1 tbsp chopped nuts',
          'Drizzle of maple syrup'
        ],
        instructions: [
          'Bring water or milk to boil',
          'Add oats and reduce heat',
          'Cook for 5 minutes, stirring occasionally',
          'Stir in flaxseed, raisins, and cinnamon',
          'Top with nuts and maple syrup',
          'Serve warm'
        ],
        nutrition: {
          calories: 310,
          protein: '8g',
          fiber: '7g',
          sugar: '18g'
        },
        benefits: ['Sustained energy release', 'Rich in fiber', 'Supports digestive health'],
        image: 'https://picsum.photos/300/200?random=12'
      }
    ]
  }
];