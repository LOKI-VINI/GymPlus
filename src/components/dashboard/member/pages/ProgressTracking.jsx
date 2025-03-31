import React, { useState } from 'react';
import MemberNavbar from '../components/MemberNavbar';
import { FaWeight, FaRulerVertical, FaHeartbeat, FaFireAlt, FaDumbbell, FaChartLine } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProgressTracking = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');

  // Example data - replace with actual data from your backend
  const progressData = {
    weight: {
      current: 75,
      target: 70,
      change: -2,
      unit: 'kg'
    },
    bodyFat: {
      current: 18,
      target: 15,
      change: -1.5,
      unit: '%'
    },
    muscle: {
      current: 35,
      target: 38,
      change: 1.2,
      unit: '%'
    },
    strength: {
      current: 80,
      target: 100,
      change: 5,
      unit: 'kg'
    }
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Weight',
        data: [78, 77, 76.5, 76, 75.5, 75],
        borderColor: 'rgb(239, 68, 68)',
        tension: 0.4
      },
      {
        label: 'Body Fat %',
        data: [20, 19.5, 19, 18.5, 18.2, 18],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      }
    }
  };

  const metrics = [
    {
      title: 'Weight',
      current: progressData.weight.current,
      target: progressData.weight.target,
      change: progressData.weight.change,
      unit: progressData.weight.unit,
      icon: <FaWeight className="w-6 h-6" />,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      title: 'Body Fat',
      current: progressData.bodyFat.current,
      target: progressData.bodyFat.target,
      change: progressData.bodyFat.change,
      unit: progressData.bodyFat.unit,
      icon: <FaRulerVertical className="w-6 h-6" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Muscle Mass',
      current: progressData.muscle.current,
      target: progressData.muscle.target,
      change: progressData.muscle.change,
      unit: progressData.muscle.unit,
      icon: <FaDumbbell className="w-6 h-6" />,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Strength',
      current: progressData.strength.current,
      target: progressData.strength.target,
      change: progressData.strength.change,
      unit: progressData.strength.unit,
      icon: <FaFireAlt className="w-6 h-6" />,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <MemberNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <FaChartLine className="text-red-500" />
              Progress Tracking
            </h1>
            <p className="text-gray-400 mt-2">
              Monitor your fitness journey and achievements
            </p>
          </div>
          <div className="flex gap-2">
            {['1W', '1M', '3M', '6M', '1Y'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedPeriod === period
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.bgColor} p-3 rounded-lg`}>
                  <div className={metric.color}>{metric.icon}</div>
                </div>
                <div className={`px-2 py-1 rounded-full text-sm ${
                  metric.change > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}{metric.unit}
                </div>
              </div>
              <h3 className="text-gray-400 text-sm">{metric.title}</h3>
              <div className="mt-2 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-semibold text-white">
                    {metric.current}{metric.unit}
                  </p>
                  <p className="text-sm text-gray-400">
                    Target: {metric.target}{metric.unit}
                  </p>
                </div>
                <div className="h-16 w-24">
                  {/* Mini chart placeholder */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Progress Overview</h2>
          <div className="h-[400px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Achievement Cards */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-green-500/20">
              <div className="flex items-center justify-between">
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <FaDumbbell className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-green-500 text-sm">New Record</span>
              </div>
              <h3 className="text-white mt-4">Bench Press PR</h3>
              <p className="text-gray-400 text-sm mt-1">Increased by 5kg</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <FaWeight className="w-6 h-6 text-blue-500" />
                </div>
                <span className="text-blue-500 text-sm">Goal Reached</span>
              </div>
              <h3 className="text-white mt-4">Weight Goal</h3>
              <p className="text-gray-400 text-sm mt-1">Lost 5kg this month</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-yellow-500/20">
              <div className="flex items-center justify-between">
                <div className="bg-yellow-500/10 p-3 rounded-lg">
                  <FaHeartbeat className="w-6 h-6 text-yellow-500" />
                </div>
                <span className="text-yellow-500 text-sm">Milestone</span>
              </div>
              <h3 className="text-white mt-4">Workout Streak</h3>
              <p className="text-gray-400 text-sm mt-1">30 Days Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking; 
 