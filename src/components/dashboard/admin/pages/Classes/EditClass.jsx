import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { useClass } from '../../../../../context/ClassContext';

const EditClass = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getClassById, updateClass } = useClass();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    trainer: '',
    capacity: '',
    schedule: '',
    duration: '',
    level: '',
    description: '',
    status: '',
    enrolled: 0
  });

  useEffect(() => {
    const classData = getClassById(id);
    if (classData) {
      setFormData(classData);
    } else {
      navigate('/admin/classes');
    }
  }, [id, getClassById, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Class name is required';
    if (!formData.trainer.trim()) newErrors.trainer = 'Trainer name is required';
    if (!formData.capacity) newErrors.capacity = 'Capacity is required';
    if (!formData.schedule.trim()) newErrors.schedule = 'Schedule is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateClass(id, {
        ...formData,
        capacity: parseInt(formData.capacity)
      });
      alert('Class updated successfully!');
      navigate('/admin/classes');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-semibold text-white mb-6">Edit Class</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200">Class Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors.name ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200">Trainer</label>
                    <input
                      type="text"
                      name="trainer"
                      value={formData.trainer}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors.trainer ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.trainer && <p className="mt-1 text-sm text-red-500">{errors.trainer}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Full">Full</option>
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200">Schedule</label>
                    <input
                      type="text"
                      name="schedule"
                      value={formData.schedule}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors.schedule ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.schedule && <p className="mt-1 text-sm text-red-500">{errors.schedule}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors.duration ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200">Level</label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/classes')}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Class
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClass;