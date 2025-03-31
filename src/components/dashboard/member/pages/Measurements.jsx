import React from 'react';
import MemberNavbar from '../components/MemberNavbar';
import { FaRuler } from 'react-icons/fa';

const Measurements = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <MemberNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Measurements</h1>
        {/* Add measurements content */}
      </div>
    </div>
  );
};

export default Measurements; 