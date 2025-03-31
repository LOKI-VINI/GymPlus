import React, { useState } from 'react';
import { useClass } from '../../../../context/ClassContext';
import { useMember } from '../../../../context/MemberContext';
import MemberNavbar from '../components/MemberNavbar';
import Card from '../../../shared/ui/Card';
import Button from '../../../shared/ui/Button';
import { FaDumbbell, FaClock, FaUser } from 'react-icons/fa';

const MyClasses = () => {
  const { classes } = useClass();
  const { currentMember } = useMember();
  const [activeTab, setActiveTab] = useState('enrolled'); // enrolled, available

  // Filter classes based on member enrollment
  const enrolledClasses = classes.filter(cls => 
    cls.enrolledMembers?.includes(currentMember?.id)
  );

  // Available classes (not enrolled)
  const availableClasses = classes.filter(cls => 
    !cls.enrolledMembers?.includes(currentMember?.id) && 
    cls.status === 'Active'
  );

  const formatTime = (time) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <MemberNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">My Classes</h1>
          
          {/* Tab Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('enrolled')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'enrolled'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Enrolled Classes
            </button>
            <button
              onClick={() => setActiveTab('available')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'available'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Available Classes
            </button>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'enrolled' ? enrolledClasses : availableClasses).map((cls) => (
            <Card key={cls.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {cls.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {cls.description}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    cls.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {cls.status}
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-gray-300">
                    <FaUser className="w-4 h-4 text-blue-500" />
                    <span className="ml-2 text-sm">
                      Trainer: {cls.trainer}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FaClock className="w-4 h-4 text-blue-500" />
                    <span className="ml-2 text-sm">
                      Time: {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FaDumbbell className="w-4 h-4 text-blue-500" />
                    <span className="ml-2 text-sm">
                      Level: {cls.level}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  {activeTab === 'enrolled' ? (
                    <Button
                      variant="danger"
                      className="w-full"
                      onClick={() => {/* Handle unenroll */}}
                    >
                      Unenroll
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => {/* Handle enroll */}}
                    >
                      Enroll Now
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {((activeTab === 'enrolled' && enrolledClasses.length === 0) ||
          (activeTab === 'available' && availableClasses.length === 0)) && (
          <div className="text-center py-12">
            <FaDumbbell className="mx-auto h-12 w-12 text-gray-600" />
            <h3 className="mt-2 text-lg font-medium text-white">
              {activeTab === 'enrolled' 
                ? "You haven't enrolled in any classes yet"
                : "No classes available at the moment"}
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              {activeTab === 'enrolled'
                ? "Check out our available classes and start your fitness journey"
                : "Please check back later for new classes"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyClasses;
