import React, { useState, useEffect } from 'react';
import MemberNavbar from '../components/MemberNavbar';
import { FaDumbbell, FaPlay, FaCheck, FaCalendarAlt, FaFire, FaClock } from 'react-icons/fa';

const WorkoutPlans = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [completedWorkouts, setCompletedWorkouts] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(5); // Example streak

  const workoutPlans = {
    current: {
      name: "Full Body Transformation",
      totalDays: 6,
      workouts: [
        {
          day: "Monday",
          dayNumber: 1,
          name: "Chest & Triceps",
          duration: "60 min",
          intensity: "High",
          exercises: [
            { name: "Bench Press", sets: "4", reps: "12", weight: "60kg" },
            { name: "Incline Dumbbell Press", sets: "3", reps: "12", weight: "22kg" },
            { name: "Tricep Pushdowns", sets: "3", reps: "15", weight: "25kg" },
            { name: "Chest Flyes", sets: "3", reps: "12", weight: "15kg" }
          ],
          completed: true,
          calories: 450
        },
        {
          day: "Tuesday",
          dayNumber: 2,
          name: "Back & Biceps",
          duration: "55 min",
          intensity: "Medium",
          exercises: [
            { name: "Deadlifts", sets: "4", reps: "10", weight: "100kg" },
            { name: "Pull-ups", sets: "3", reps: "10", weight: "BW" },
            { name: "Barbell Rows", sets: "3", reps: "12", weight: "50kg" },
            { name: "Bicep Curls", sets: "3", reps: "12", weight: "15kg" }
          ],
          completed: true,
          calories: 400
        },
        {
          day: "Wednesday",
          dayNumber: 3,
          name: "Legs & Shoulders",
          duration: "65 min",
          intensity: "High",
          exercises: [
            { name: "Squats", sets: "4", reps: "12", weight: "80kg" },
            { name: "Leg Press", sets: "3", reps: "12", weight: "120kg" },
            { name: "Shoulder Press", sets: "3", reps: "12", weight: "40kg" },
            { name: "Lateral Raises", sets: "3", reps: "15", weight: "10kg" }
          ],
          completed: false,
          calories: 500
        },
        {
          day: "Thursday",
          dayNumber: 4,
          name: "Core & Cardio",
          duration: "45 min",
          intensity: "Medium",
          exercises: [
            { name: "Plank", sets: "3", reps: "60s" },
            { name: "Russian Twists", sets: "3", reps: "20" },
            { name: "Mountain Climbers", sets: "3", reps: "30" },
            { name: "HIIT Cardio", sets: "1", reps: "20 min" }
          ],
          completed: false,
          calories: 350
        },
        {
          day: "Friday",
          dayNumber: 5,
          name: "Upper Body Power",
          duration: "50 min",
          intensity: "High",
          exercises: [
            { name: "Military Press", sets: "4", reps: "8" },
            { name: "Weighted Dips", sets: "3", reps: "12" },
            { name: "Face Pulls", sets: "3", reps: "15" },
            { name: "Lateral Raises", sets: "3", reps: "12" }
          ],
          completed: false,
          calories: 400
        },
        {
          day: "Saturday",
          dayNumber: 6,
          name: "Lower Body Power",
          duration: "55 min",
          intensity: "High",
          exercises: [
            { name: "Romanian Deadlifts", sets: "4", reps: "10" },
            { name: "Bulgarian Split Squats", sets: "3", reps: "12" },
            { name: "Calf Raises", sets: "4", reps: "15" },
            { name: "Leg Extensions", sets: "3", reps: "12" }
          ],
          completed: false,
          calories: 450
        }
      ]
    }
  };

  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    setCurrentDay(today);
    
    const completed = workoutPlans.current.workouts.filter(w => w.completed).length;
    setCompletedWorkouts(completed);
  }, []);

  const renderWorkoutCard = (workout, index) => (
    <div 
      key={index} 
      className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
        workout.day === currentDay ? 'ring-2 ring-red-500' : ''
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Day {workout.dayNumber}: {workout.name}
            </h3>
            <p className="text-gray-400 text-sm mt-1">{workout.day}</p>
          </div>
          {workout.completed ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
              <FaCheck className="mr-1" /> Done
            </span>
          ) : workout.day === currentDay ? (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded-full">
              Today
            </span>
          ) : (
            <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
              Pending
            </span>
          )}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-400">
            <FaClock className="mr-2 text-red-500" />
            <span>{workout.duration}</span>
            <span className="mx-2">•</span>
            <FaFire className="mr-2 text-red-500" />
            <span>{workout.calories} kcal</span>
          </div>
          
          <div className="text-sm text-gray-400">
            <span className="text-red-500 font-medium">Intensity:</span> {workout.intensity}
          </div>
        </div>

        <div className="space-y-2">
          {workout.exercises.slice(0, 2).map((exercise, idx) => (
            <div key={idx} className="text-sm text-gray-300 flex justify-between">
              <span>{exercise.name}</span>
              <span className="text-gray-400">
                {exercise.sets}×{exercise.reps}
              </span>
            </div>
          ))}
          {workout.exercises.length > 2 && (
            <div className="text-sm text-gray-400">
              +{workout.exercises.length - 2} more exercises
            </div>
          )}
        </div>

        <button 
          className={`mt-4 w-full py-2 px-4 rounded-lg flex items-center justify-center transition-colors ${
            workout.completed
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
          disabled={workout.completed}
        >
          {workout.completed ? (
            <span className="flex items-center">
              <FaCheck className="mr-2" />
              Completed
            </span>
          ) : (
            <span className="flex items-center">
              <FaPlay className="mr-2" />
              Start Workout
            </span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <MemberNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <FaDumbbell className="mr-3 text-red-500" />
              {workoutPlans.current.name}
            </h1>
            <p className="text-gray-400 mt-2">
              Week Progress: {completedWorkouts}/{workoutPlans.current.totalDays} workouts completed
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="bg-gray-800 rounded-lg px-4 py-2 flex items-center">
              <FaFire className="text-red-500 mr-2" />
              <span className="text-white font-semibold">{currentStreak} Day Streak</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaCalendarAlt className="text-red-500 mr-2" />
              <span className="text-white font-semibold">Today: {currentDay}</span>
            </div>
            <span className="text-gray-400">
              {Math.round((completedWorkouts / workoutPlans.current.totalDays) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-red-500 to-red-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(completedWorkouts / workoutPlans.current.totalDays) * 100}%` }}
            />
          </div>
        </div>

        {/* Workout Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workoutPlans.current.workouts.map((workout, index) => renderWorkoutCard(workout, index))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlans; 