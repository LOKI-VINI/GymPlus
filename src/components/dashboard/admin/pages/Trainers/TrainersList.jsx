import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { useTrainer } from '../../../../../context/TrainerContext';

const TrainersList = () => {
  const { trainers, deleteTrainer } = useTrainer();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      deleteTrainer(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white">Trainers</h1>
            <p className="text-gray-400 mt-1">Total Trainers: {trainers.length}</p>
          </div>
          <Link
            to="/admin/trainers/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Trainer
          </Link>
        </div>

        <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {trainers.map((trainer) => (
                <tr key={trainer.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-200">{trainer.name}</div>
                    <div className="text-sm text-gray-400">{trainer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {trainer.specialization}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {trainer.experience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {trainer.schedule}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      trainer.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {trainer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <Link
                        to={`/admin/trainers/${trainer.id}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        View
                      </Link>
                      <Link
                        to={`/admin/trainers/edit/${trainer.id}`}
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(trainer.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrainersList;