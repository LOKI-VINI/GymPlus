import React from 'react';
import MemberNavbar from '../components/MemberNavbar';
import { FaDumbbell, FaCalendar, FaUtensils, FaChartLine, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MemberDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <MemberNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome back, Member!</h1>
          <p className="text-gray-400 mt-2">Track your fitness journey and achieve your goals</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-red-500/10 p-3 rounded-lg">
                <FaDumbbell className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-4">
                <p className="text-gray-400">Next Workout</p>
                <p className="text-xl font-semibold text-white">Upper Body</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <FaCalendar className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-gray-400">Next Class</p>
                <p className="text-xl font-semibold text-white">Yoga - 2PM</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-500/10 p-3 rounded-lg">
                <FaChartLine className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-gray-400">Progress</p>
                <p className="text-xl font-semibold text-white">On Track</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/member/workout-plans" 
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition duration-300">
            <div className="flex items-center">
              <FaDumbbell className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">Workout Plans</h3>
                <p className="text-gray-400">View and track your workouts</p>
              </div>
            </div>
          </Link>

          <Link to="/member/diet-plan" 
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition duration-300">
            <div className="flex items-center">
              <FaUtensils className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">Diet Plan</h3>
                <p className="text-gray-400">Check your meal schedule</p>
              </div>
            </div>
          </Link>

          <Link to="/member/profile" 
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition duration-300">
            <div className="flex items-center">
              <FaUserCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">Profile</h3>
                <p className="text-gray-400">View and edit your profile</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Progress Section */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Your Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Weekly Goal</span>
                <span>4/5 workouts</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Monthly Goal</span>
                <span>18/20 workouts</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard; 