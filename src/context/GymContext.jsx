import React, { createContext, useState, useContext } from 'react';

const GymContext = createContext(null);

// Create the useGym hook within the same file
export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
};

export const GymProvider = ({ children }) => {
  // Dummy data for testing
  const [stats] = useState({
    totalMembers: 150,
    activeMembers: 120,
    totalClasses: 25,
    monthlyRevenue: 250000
  });

  const getStats = () => {
    return stats;
  };

  const value = {
    getStats,
    stats
  };

  return (
    <GymContext.Provider value={value}>
      {children}
    </GymContext.Provider>
  );
};