import React, { createContext, useContext, useState } from 'react';

const ClassContext = createContext(null);

export const useClass = () => {
  const context = useContext(ClassContext);
  if (!context) {
    throw new Error('useClass must be used within a ClassProvider');
  }
  return context;
};

export const ClassProvider = ({ children }) => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'Morning Yoga',
      trainer: 'Jane Smith',
      capacity: 20,
      enrolled: 15,
      schedule: 'Mon, Wed, Fri - 7:00 AM',
      duration: '60 mins',
      level: 'Beginner',
      description: 'Start your day with energizing yoga poses',
      status: 'Active'
    }
  ]);

  const addClass = (newClass) => {
    setClasses(prev => [...prev, { ...newClass, id: prev.length + 1 }]);
  };

  const updateClass = (id, updatedClass) => {
    setClasses(prev => prev.map(cls => 
      cls.id === parseInt(id) ? { ...cls, ...updatedClass } : cls
    ));
  };

  const deleteClass = (id) => {
    setClasses(prev => prev.filter(cls => cls.id !== id));
  };

  const getClassById = (id) => {
    return classes.find(cls => cls.id === parseInt(id));
  };

  return (
    <ClassContext.Provider value={{
      classes,
      addClass,
      updateClass,
      deleteClass,
      getClassById
    }}>
      {children}
    </ClassContext.Provider>
  );
};

export default ClassProvider;