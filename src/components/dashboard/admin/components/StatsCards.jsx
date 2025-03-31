import React from 'react';
import Card from '../../../shared/ui/Card';
import { useGym } from '../../../../context/GymContext'; // Updated import
import { formatCurrency } from '../../../shared/utils/formatCurrency';

// ... rest of the component code
const StatsCards = () => {
  const { getStats } = useGym();
  const stats = getStats();

  const statsData = [
    {
      title: 'Total Members',
      value: stats.totalMembers,
      icon: (
        <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'red'
    },
    {
      title: 'Active Members',
      value: stats.activeMembers,
      icon: (
        <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'green'
    },
    {
      title: 'Total Classes',
      value: stats.totalClasses,
      icon: (
        <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'blue'
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(stats.monthlyRevenue),
      icon: (
        <svg className="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'yellow'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {statsData.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-full bg-${stat.color}-500 bg-opacity-10`}>
              {stat.icon}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">{stat.title}</p>
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;