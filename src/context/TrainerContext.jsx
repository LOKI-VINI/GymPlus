import React, { createContext, useContext, useState } from 'react';

const TrainerContext = createContext(null);

export const useTrainer = () => {
  const context = useContext(TrainerContext);
  if (!context) {
    throw new Error('useTrainer must be used within a TrainerProvider');
  }
  return context;
};

export const TrainerProvider = ({ children }) => {
  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: 'Mike Johnson',
      email: 'mike@gym.com',
      phone: '1234567890',
      specialization: 'Weight Training',
      experience: '5 years',
      status: 'Active',
      schedule: 'Morning',
      joinDate: '2024-01-15',
      certifications: ['ACE', 'NASM']
    }
  ]);

  const addTrainer = (newTrainer) => {
    setTrainers(prev => [...prev, { ...newTrainer, id: prev.length + 1, status: 'Active' }]);
  };

  const updateTrainer = (id, updatedTrainer) => {
    setTrainers(prev => prev.map(trainer => 
      trainer.id === parseInt(id) ? { ...trainer, ...updatedTrainer } : trainer
    ));
  };

  const deleteTrainer = (id) => {
    setTrainers(prev => prev.filter(trainer => trainer.id !== id));
  };

  const getTrainerById = (id) => {
    return trainers.find(trainer => trainer.id === parseInt(id));
  };

  return (
    <TrainerContext.Provider value={{
      trainers,
      addTrainer,
      updateTrainer,
      deleteTrainer,
      getTrainerById
    }}>
      {children}
    </TrainerContext.Provider>
  );
};

export default TrainerProvider;