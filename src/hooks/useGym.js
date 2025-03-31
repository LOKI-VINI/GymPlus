import { useContext } from 'react';
import { GymContext } from '../context/GymContext';

export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
};