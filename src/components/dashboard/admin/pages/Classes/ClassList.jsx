import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { useClass } from '../../../../../context/ClassContext';

const ClassList = () => {
  const { classes, deleteClass } = useClass();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      deleteClass(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white">Classes</h1>
            <p className="text-gray-400 mt-1">Total Classes: {classes.length}</p>
          </div>
          <Link
            to="/admin/classes/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Class
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-white">{cls.name}</h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    cls.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {cls.status}
                  </span>
                </div>
                
                <div className="mt-4 space-y-2">
                  <p className="text-gray-300">
                    <span className="text-gray-400">Trainer:</span> {cls.trainer}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Schedule:</span> {cls.schedule}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Capacity:</span> {cls.enrolled}/{cls.capacity}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Level:</span> {cls.level}
                  </p>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <Link
                    to={`/admin/classes/${cls.id}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/classes/edit/${cls.id}`}
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(cls.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassList;