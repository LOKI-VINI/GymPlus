import React, { useState } from 'react';
import MemberNavbar from '../components/MemberNavbar';
import { 
  FaUtensils, 
  FaAppleAlt, 
  FaWeight, 
  FaChartLine, 
  FaCalendarAlt,
  FaGlassWhiskey,
  FaCheckCircle,
  FaInfoCircle
} from 'react-icons/fa';

const DietPlan = () => {
  const [selectedDay, setSelectedDay] = useState('monday');

  const dietPlan = {
    calories: 2400,
    protein: 180,
    carbs: 240,
    fats: 80,
    mealPlans: {
      monday: {
        breakfast: {
          time: '8:00 AM',
          meals: [
            { name: 'Oatmeal with Banana', calories: 320, protein: 12, carbs: 58, fats: 6 },
            { name: 'Greek Yogurt', calories: 130, protein: 15, carbs: 8, fats: 4 },
            { name: 'Mixed Nuts', calories: 170, protein: 6, carbs: 6, fats: 15 }
          ]
        },
        morningSnack: {
          time: '10:30 AM',
          meals: [
            { name: 'Apple with Peanut Butter', calories: 250, protein: 8, carbs: 30, fats: 12 }
          ]
        },
        lunch: {
          time: '1:00 PM',
          meals: [
            { name: 'Grilled Chicken Breast', calories: 280, protein: 35, carbs: 0, fats: 8 },
            { name: 'Brown Rice', calories: 220, protein: 5, carbs: 45, fats: 2 },
            { name: 'Steamed Vegetables', calories: 100, protein: 4, carbs: 20, fats: 1 }
          ]
        },
        eveningSnack: {
          time: '4:30 PM',
          meals: [
            { name: 'Protein Shake', calories: 150, protein: 25, carbs: 5, fats: 2 }
          ]
        },
        dinner: {
          time: '7:30 PM',
          meals: [
            { name: 'Grilled Fish', calories: 250, protein: 30, carbs: 0, fats: 12 },
            { name: 'Quinoa', calories: 180, protein: 6, carbs: 35, fats: 3 },
            { name: 'Mixed Salad', calories: 120, protein: 3, carbs: 15, fats: 7 }
          ]
        }
      },
      tuesday: {
        breakfast: {
          time: '8:00 AM',
          meals: [
            { name: 'Whole Grain Toast with Eggs', calories: 340, protein: 20, carbs: 30, fats: 18 },
            { name: 'Spinach Smoothie', calories: 150, protein: 8, carbs: 25, fats: 3 }
          ]
        },
        morningSnack: {
          time: '10:30 AM',
          meals: [
            { name: 'Mixed Berries with Almonds', calories: 200, protein: 6, carbs: 25, fats: 10 }
          ]
        },
        lunch: {
          time: '1:00 PM',
          meals: [
            { name: 'Grilled Fish Fillet', calories: 250, protein: 30, carbs: 0, fats: 12 },
            { name: 'Sweet Potato', calories: 180, protein: 3, carbs: 40, fats: 0 },
            { name: 'Green Beans', calories: 80, protein: 4, carbs: 15, fats: 0 }
          ]
        },
        eveningSnack: {
          time: '4:30 PM',
          meals: [
            { name: 'Greek Yogurt with Honey', calories: 180, protein: 20, carbs: 15, fats: 5 }
          ]
        },
        dinner: {
          time: '7:30 PM',
          meals: [
            { name: 'Turkey Breast', calories: 220, protein: 35, carbs: 0, fats: 8 },
            { name: 'Quinoa Salad', calories: 200, protein: 8, carbs: 35, fats: 5 }
          ]
        }
      },
      wednesday: {
        breakfast: {
          time: '8:00 AM',
          meals: [
            { name: 'Protein Pancakes', calories: 350, protein: 25, carbs: 40, fats: 12 },
            { name: 'Fresh Fruits', calories: 120, protein: 2, carbs: 30, fats: 0 }
          ]
        },
        morningSnack: {
          time: '10:30 AM',
          meals: [
            { name: 'Protein Bar', calories: 220, protein: 20, carbs: 25, fats: 8 }
          ]
        },
        lunch: {
          time: '1:00 PM',
          meals: [
            { name: 'Lean Beef Stir Fry', calories: 300, protein: 35, carbs: 15, fats: 15 },
            { name: 'Brown Rice', calories: 220, protein: 5, carbs: 45, fats: 2 }
          ]
        },
        eveningSnack: {
          time: '4:30 PM',
          meals: [
            { name: 'Cottage Cheese with Fruits', calories: 200, protein: 25, carbs: 15, fats: 5 }
          ]
        },
        dinner: {
          time: '7:30 PM',
          meals: [
            { name: 'Baked Salmon', calories: 280, protein: 30, carbs: 0, fats: 16 },
            { name: 'Roasted Vegetables', calories: 150, protein: 5, carbs: 25, fats: 5 }
          ]
        }
      },
      thursday: {
        breakfast: {
          time: '8:00 AM',
          meals: [
            { name: 'Egg White Omelette', calories: 280, protein: 28, carbs: 5, fats: 12 },
            { name: 'Whole Grain Toast', calories: 120, protein: 4, carbs: 25, fats: 2 }
          ]
        },
        morningSnack: {
          time: '10:30 AM',
          meals: [
            { name: 'Banana with Protein Shake', calories: 250, protein: 25, carbs: 30, fats: 3 }
          ]
        },
        lunch: {
          time: '1:00 PM',
          meals: [
            { name: 'Chicken Quinoa Bowl', calories: 350, protein: 35, carbs: 35, fats: 10 },
            { name: 'Mixed Vegetables', calories: 100, protein: 4, carbs: 20, fats: 1 }
          ]
        },
        eveningSnack: {
          time: '4:30 PM',
          meals: [
            { name: 'Rice Cakes with Peanut Butter', calories: 200, protein: 8, carbs: 25, fats: 8 }
          ]
        },
        dinner: {
          time: '7:30 PM',
          meals: [
            { name: 'Tofu Stir-Fry', calories: 300, protein: 20, carbs: 25, fats: 15 },
            { name: 'Brown Rice', calories: 220, protein: 5, carbs: 45, fats: 2 }
          ]
        }
      },
      friday: {
        breakfast: {
          time: '8:00 AM',
          meals: [
            { name: 'Protein Smoothie Bowl', calories: 380, protein: 30, carbs: 45, fats: 10 },
            { name: 'Granola', calories: 150, protein: 4, carbs: 25, fats: 6 }
          ]
        },
        morningSnack: {
          time: '10:30 AM',
          meals: [
            { name: 'Mixed Nuts and Dried Fruits', calories: 200, protein: 6, carbs: 20, fats: 14 }
          ]
        },
        lunch: {
          time: '1:00 PM',
          meals: [
            { name: 'Tuna Salad', calories: 280, protein: 35, carbs: 10, fats: 12 },
            { name: 'Whole Grain Crackers', calories: 130, protein: 3, carbs: 25, fats: 3 }
          ]
        },
        eveningSnack: {
          time: '4:30 PM',
          meals: [
            { name: 'Greek Yogurt Parfait', calories: 220, protein: 20, carbs: 25, fats: 5 }
          ]
        },
        dinner: {
          time: '7:30 PM',
          meals: [
            { name: 'Grilled Chicken Breast', calories: 250, protein: 35, carbs: 0, fats: 10 },
            { name: 'Sweet Potato Mash', calories: 180, protein: 3, carbs: 40, fats: 0 }
          ]
        }
      },
      saturday: {
        breakfast: {
          time: '8:00 AM',
          meals: [
            { name: 'Protein Waffles', calories: 340, protein: 25, carbs: 35, fats: 14 },
            { name: 'Berry Compote', calories: 100, protein: 1, carbs: 25, fats: 0 }
          ]
        },
        morningSnack: {
          time: '10:30 AM',
          meals: [
            { name: 'Protein Ball', calories: 180, protein: 12, carbs: 20, fats: 8 }
          ]
        },
        lunch: {
          time: '1:00 PM',
          meals: [
            { name: 'Turkey Wrap', calories: 320, protein: 30, carbs: 30, fats: 12 },
            { name: 'Greek Salad', calories: 150, protein: 5, carbs: 10, fats: 12 }
          ]
        },
        eveningSnack: {
          time: '4:30 PM',
          meals: [
            { name: 'Hummus with Carrots', calories: 200, protein: 8, carbs: 25, fats: 10 }
          ]
        },
        dinner: {
          time: '7:30 PM',
          meals: [
            { name: 'Lean Beef Steak', calories: 300, protein: 40, carbs: 0, fats: 15 },
            { name: 'Roasted Potatoes', calories: 200, protein: 4, carbs: 40, fats: 4 }
          ]
        }
      },
      sunday: {
        breakfast: {
          time: '8:00 AM',
          meals: [
            { name: 'Protein French Toast', calories: 360, protein: 25, carbs: 40, fats: 12 },
            { name: 'Fresh Berries', calories: 80, protein: 1, carbs: 20, fats: 0 }
          ]
        },
        morningSnack: {
          time: '10:30 AM',
          meals: [
            { name: 'Protein Smoothie', calories: 200, protein: 25, carbs: 20, fats: 3 }
          ]
        },
        lunch: {
          time: '1:00 PM',
          meals: [
            { name: 'Grilled Shrimp', calories: 250, protein: 35, carbs: 0, fats: 8 },
            { name: 'Quinoa Bowl', calories: 220, protein: 8, carbs: 40, fats: 4 }
          ]
        },
        eveningSnack: {
          time: '4:30 PM',
          meals: [
            { name: 'Apple with Almond Butter', calories: 220, protein: 7, carbs: 25, fats: 12 }
          ]
        },
        dinner: {
          time: '7:30 PM',
          meals: [
            { name: 'Baked Cod', calories: 200, protein: 35, carbs: 0, fats: 4 },
            { name: 'Mediterranean Rice', calories: 250, protein: 6, carbs: 45, fats: 6 }
          ]
        }
      }
    }
  };

  const days = [
    { id: 'monday', name: 'Monday' },
    { id: 'tuesday', name: 'Tuesday' },
    { id: 'wednesday', name: 'Wednesday' },
    { id: 'thursday', name: 'Thursday' },
    { id: 'friday', name: 'Friday' },
    { id: 'saturday', name: 'Saturday' },
    { id: 'sunday', name: 'Sunday' }
  ];

  const calculateTotalNutrients = (meals) => {
    return meals.reduce((acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <MemberNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <FaUtensils className="mr-3 text-red-500" />
              Your Diet Plan
            </h1>
            <p className="text-gray-400 mt-2">
              Personalized nutrition plan to achieve your fitness goals
            </p>
          </div>
        </div>

        {/* Nutrition Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 flex items-center">
            <div className="bg-red-500/10 p-3 rounded-lg">
              <FaAppleAlt className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-4">
              <p className="text-gray-400 text-sm">Daily Calories</p>
              <p className="text-2xl font-bold text-white">{dietPlan.calories}</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 flex items-center">
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <FaWeight className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-gray-400 text-sm">Protein</p>
              <p className="text-2xl font-bold text-white">{dietPlan.protein}g</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 flex items-center">
            <div className="bg-green-500/10 p-3 rounded-lg">
              <FaChartLine className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-gray-400 text-sm">Carbs</p>
              <p className="text-2xl font-bold text-white">{dietPlan.carbs}g</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 flex items-center">
            <div className="bg-yellow-500/10 p-3 rounded-lg">
              <FaGlassWhiskey className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="ml-4">
              <p className="text-gray-400 text-sm">Fats</p>
              <p className="text-2xl font-bold text-white">{dietPlan.fats}g</p>
            </div>
          </div>
        </div>

        {/* Day Selection */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <div className="flex space-x-2 overflow-x-auto">
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  selectedDay === day.id
                    ? 'bg-red-500 text-white'
                    : 'text-gray-400 hover:bg-gray-700'
                }`}
              >
                {day.name}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Schedule */}
        <div className="space-y-6">
          {Object.entries(dietPlan.mealPlans[selectedDay]).map(([mealTime, meal]) => (
            <div key={mealTime} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-red-500 mr-2" />
                    <h3 className="text-lg font-semibold text-white capitalize">
                      {mealTime.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                  </div>
                  <span className="text-gray-400">{meal.time}</span>
                </div>

                <div className="space-y-4">
                  {meal.meals.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-3" />
                        <div>
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-sm text-gray-400">
                            {item.calories} cal • {item.protein}g protein • {item.carbs}g carbs • {item.fats}g fats
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-red-500">
                        <FaInfoCircle className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Total for {mealTime.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span>
                      {calculateTotalNutrients(meal.meals).calories} calories
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DietPlan; 