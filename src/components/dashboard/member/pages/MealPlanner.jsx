import React from 'react';
import MemberNavbar from '../components/MemberNavbar';
import { FaUtensils } from 'react-icons/fa';

const MealPlanner = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <MemberNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Meal Planner</h1>
        {/* Add meal planner content */}
      </div>
    </div>
  );
};

export default MealPlanner; 