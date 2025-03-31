import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { useClass } from '../../../../../context/ClassContext';

const AddClass = () => {
  const navigate = useNavigate();
  const { addClass } = useClass();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    trainer: '',
    capacity: '',
    schedule: '',
    duration: '',
    level: 'Beginner',
    description: '',
    status: 'Active'
  });

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
      addClass({
        ...formData,
        enrolled: 0,
        capacity: parseInt(formData.capacity)
      });
      alert('Class added successfully!');
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
            <h1 className="text-2xl font-semibold text-white mb-6">Add New Class</h1>
            
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
                    <label className="block text-sm font-medium text-gray-200">Capacity</label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      min="1"
                      className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors.capacity ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.capacity && <p className="mt-1 text-sm text-red-500">{errors.capacity}</p>}
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
                      placeholder="e.g., Mon, Wed, Fri - 9:00 AM"
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
                      placeholder="e.g., 60 mins"
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
                  placeholder="Brief description of the class"
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
                  Add Class
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;