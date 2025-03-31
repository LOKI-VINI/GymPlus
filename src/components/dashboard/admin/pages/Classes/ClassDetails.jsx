import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { useClass } from '../../../../../context/ClassContext';

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getClassById } = useClass();
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    const data = getClassById(id);
    if (data) {
      setClassData(data);
    } else {
      navigate('/admin/classes');
    }
  }, [id, getClassById, navigate]);

  if (!classData) {
    return (
      <div className="min-h-screen bg-gray-900">
        <AdminNavbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-white">Class Details</h1>
          <div className="space-x-4">
            <Link
              to={`/admin/classes/edit/${id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Class
            </Link>
            <button
              onClick={() => navigate('/admin/classes')}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to List
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Class Information */}
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Class Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Name:</span>
                <span className="ml-2 text-white">{classData.name}</span>
              </div>
              <div>
                <span className="text-gray-400">Trainer:</span>
                <span className="ml-2 text-gray-200">{classData.trainer}</span>
              </div>
              <div>
                <span className="text-gray-400">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                  classData.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {classData.status}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Level:</span>
                <span className="ml-2 text-gray-200">{classData.level}</span>
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Schedule Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Schedule:</span>
                <span className="ml-2 text-gray-200">{classData.schedule}</span>
              </div>
              <div>
                <span className="text-gray-400">Duration:</span>
                <span className="ml-2 text-gray-200">{classData.duration}</span>
              </div>
              <div>
                <span className="text-gray-400">Capacity:</span>
                <span className="ml-2 text-gray-200">{classData.enrolled}/{classData.capacity}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-800 rounded-lg shadow p-6 md:col-span-2">
            <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
            <p className="text-gray-200">
              {classData.description || 'No description available.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;