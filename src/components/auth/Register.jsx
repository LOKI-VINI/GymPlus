import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    membershipType: 'basic', // default to basic plan
    gender: '',
    dateOfBirth: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add registration logic here
    console.log('Registration data:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">

         {/* back button */}
      <div className="absolute top-4 left-4">
      <Link 
        to="/" 
        className="flex items-center text-gray-300 hover:text-red-500 transition-colors"
      >
        <svg 
          className="w-6 h-6 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
        <span>Back to Home</span>
      </Link>
    </div>
      {/* Registration Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link to="/" className="flex justify-center mb-6">
          <span className="text-4xl font-bold text-white">
            Gym<span className="text-red-600">Plus</span>
          </span>
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-white">
          Start Your Fitness Journey
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-red-500 hover:text-red-400">
            Sign in here
          </Link>
        </p>
      </div>

      {/* Registration Form */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  required
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  required
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Membership Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Membership Plan
              </label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {['basic', 'premium', 'elite'].map((plan) => (
                  <label
                    key={plan}
                    className={`
                      relative rounded-lg border p-4 flex cursor-pointer focus:outline-none
                      ${formData.membershipType === plan 
                        ? 'border-red-500 bg-gray-700 text-white' 
                        : 'border-gray-600 text-gray-400'}
                    `}
                  >
                    <input
                      type="radio"
                      name="membershipType"
                      value={plan}
                      className="sr-only"
                      checked={formData.membershipType === plan}
                      onChange={handleChange}
                    />
                    <div className="flex-1">
                      <span className="block text-sm font-medium capitalize">
                        {plan}
                      </span>
                      <span className="mt-1 block text-xs">
                        {plan === 'basic' && '₹1,499/month'}
                        {plan === 'premium' && '₹2,999/month'}
                        {plan === 'elite' && '₹4,999/month'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="text-red-500 hover:text-red-400">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;