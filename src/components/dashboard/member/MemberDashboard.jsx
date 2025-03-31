import React from 'react';
import { Link } from 'react-router-dom';
import MemberNavbar from './components/MemberNavbar';
import { FaDumbbell, FaUtensils, FaCalendarAlt, FaChartLine, FaHeartbeat, FaUserCircle, FaComments } from 'react-icons/fa';

const MemberDashboard = () => {
  // Example data - replace with actual data from your context
  const memberStats = {
    name: "John Doe",
    nextWorkout: "Upper Body",
    nextClass: "Yoga at 2 PM",
    workoutsThisWeek: 3,
    totalWorkouts: 45,
    progress: "On Track"
  };

  const quickActions = [
    {
      title: "Workout Plans",
      icon: <FaDumbbell className="w-6 h-6" />,
      description: "View your workout schedule",
      link: "/member/workouts",
      color: "text-red-500"
    },
    {
      title: "Diet Plan",
      icon: <FaUtensils className="w-6 h-6" />,
      description: "Check your meal plans",
      link: "/member/diet",
      color: "text-blue-500"
    },
    {
      title: "Book Class",
      icon: <FaCalendarAlt className="w-6 h-6" />,
      description: "Schedule your next class",
      link: "/member/classes/book",
      color: "text-green-500"
    },
    {
      title: "Progress",
      icon: <FaChartLine className="w-6 h-6" />,
      description: "Track your fitness journey",
      link: "/member/progress",
      color: "text-purple-500"
    },
    {
      title: "Health Metrics",
      icon: <FaHeartbeat className="w-6 h-6" />,
      description: "View your health stats",
      link: "/member/measurements",
      color: "text-pink-500"
    },
    {
      title: "Support",
      icon: <FaComments className="w-6 h-6" />,
      description: "Get help and support",
      link: "/member/support",
      color: "text-yellow-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <MemberNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-gray-800 p-2 rounded-full">
              <FaUserCircle className="w-12 h-12 text-gray-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {memberStats.name}
              </h1>
              <p className="text-gray-400">
                Let's continue your fitness journey
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-red-500/10 p-3 rounded-lg">
                <FaDumbbell className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-4">
                <p className="text-gray-400">Next Workout</p>
                <p className="text-xl font-semibold text-white">{memberStats.nextWorkout}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <FaCalendarAlt className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-gray-400">Next Class</p>
                <p className="text-xl font-semibold text-white">{memberStats.nextClass}</p>
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
                <p className="text-xl font-semibold text-white">{memberStats.progress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition duration-300"
            >
              <div className="flex items-center">
                <div className={`${action.color}`}>
                  {action.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">{action.title}</h3>
                  <p className="text-gray-400">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Progress Section */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Your Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Weekly Workouts</span>
                <span>{memberStats.workoutsThisWeek}/5 completed</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-red-500 h-2.5 rounded-full" 
                  style={{ width: `${(memberStats.workoutsThisWeek / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Total Workouts</span>
                <span>{memberStats.totalWorkouts} completed</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full" 
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;