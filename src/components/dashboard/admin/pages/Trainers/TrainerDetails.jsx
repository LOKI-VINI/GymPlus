import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { useTrainer } from '../../../../../context/TrainerContext';

const TrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTrainerById } = useTrainer();
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    const trainerData = getTrainerById(id);
    if (trainerData) {
      setTrainer(trainerData);
    }
  }, [id, getTrainerById]);

  if (!trainer) {
    return (
      <div className="min-h-screen bg-gray-900">
        <AdminNavbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center text-white">Trainer not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-white">Trainer Details</h1>
          <div className="space-x-4">
            <Link
              to={`/admin/trainers/edit/${id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Trainer
            </Link>
            <button
              onClick={() => navigate('/admin/trainers')}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to List
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Personal Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Name:</span>
                <span className="ml-2 text-white">{trainer.name}</span>
              </div>
              <div>
                <span className="text-gray-400">Email:</span>
                <span className="ml-2 text-gray-200">{trainer.email}</span>
              </div>
              <div>
                <span className="text-gray-400">Phone:</span>
                <span className="ml-2 text-gray-200">{trainer.phone}</span>
              </div>
              <div>
                <span className="text-gray-400">Status:</span>
                <span className={`ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  trainer.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {trainer.status}
                </span>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Professional Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Specialization:</span>
                <span className="ml-2 text-gray-200">{trainer.specialization}</span>
              </div>
              <div>
                <span className="text-gray-400">Experience:</span>
                <span className="ml-2 text-gray-200">{trainer.experience}</span>
              </div>
              <div>
                <span className="text-gray-400">Schedule:</span>
                <span className="ml-2 text-gray-200">{trainer.schedule}</span>
              </div>
              <div>
                <span className="text-gray-400">Certifications:</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {trainer.certifications.map((cert, index) => (
                    <span key={index} className="bg-gray-700 text-gray-200 px-2 py-1 rounded-md text-sm">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Classes Schedule */}
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Current Classes</h2>
            <div className="space-y-3">
              {trainer.classes ? (
                trainer.classes.map((class_, index) => (
                  <div key={index} className="flex justify-between items-center text-gray-200">
                    <span>{class_.name}</span>
                    <span className="text-gray-400">{class_.schedule}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No classes assigned</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Bio</h2>
            <p className="text-gray-200">
              {trainer.bio || 'No bio available'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;