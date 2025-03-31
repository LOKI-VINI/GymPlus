import React from 'react';
import MemberNavbar from '../components/MemberNavbar';
import { FaComments } from 'react-icons/fa';

const SupportChat = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <MemberNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Support Chat</h1>
        {/* Add support chat content */}
      </div>
    </div>
  );
};

export default SupportChat; 