import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'member'
  });

  // Test credentials object
  const testCredentials = {
    admin: {
      email: 'admin@gymplus.com',
      password: 'admin123'
    },
    member: {
      email: 'member@gymplus.com',
      password: 'member123'
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to fill test credentials
  const fillTestCredentials = () => {
    const credentials = formData.userType === 'admin' ? testCredentials.admin : testCredentials.member;
    setFormData(prev => ({
      ...prev,
      email: credentials.email,
      password: credentials.password
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Check credentials
      if (formData.userType === 'admin' && 
          formData.email === testCredentials.admin.email && 
          formData.password === testCredentials.admin.password) {
        // Login as admin
        await login({
          id: 1,
          name: 'Admin User',
          email: formData.email,
          role: 'admin'
        });
        navigate('/admin');
      } else if (formData.userType === 'member' && 
                formData.email === testCredentials.member.email && 
                formData.password === testCredentials.member.password) {
        // Login as member
        await login({
          id: 2,
          name: 'Member User',
          email: formData.email,
          role: 'member'
        });
        navigate('/member');
      } else {
        // Show error
        alert('Invalid credentials! Please use test credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      {/* Back button */}
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

      {/* Login Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link to="/" className="flex justify-center mb-8">
          <span className="text-4xl md:text-5xl font-bold text-white">
            Gym<span className="text-red-600">Plus</span>
          </span>
        </Link>
        <h2 className="text-center text-lg md:text-xl font-medium text-white">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          New to GymPlus?{' '}
          <Link to="/register" className="font-medium text-red-500 hover:text-red-400">
            Create an account
          </Link>
        </p>
      </div>

      {/* Login Form */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Test Credentials Notice */}
          <div className="mb-6 p-4 bg-gray-700 rounded-md">
            <p className="text-sm text-gray-300 mb-2">
              <span className="font-semibold text-red-500">Test Credentials:</span>
            </p>
            <div className="space-y-1">
              <p className="text-xs text-gray-400">
                Admin: {testCredentials.admin.email} / {testCredentials.admin.password}
              </p>
              <p className="text-xs text-gray-400">
                Member: {testCredentials.member.email} / {testCredentials.member.password}
              </p>
            </div>
            <button
              type="button"
              onClick={fillTestCredentials}
              className="mt-3 text-sm text-red-500 hover:text-red-400 font-medium"
            >
              Click to Auto-fill Test Credentials
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Login as
              </label>
              <div className="grid grid-cols-2 gap-4">
                {['member', 'admin'].map((type) => (
                  <label
                    key={type}
                    className={`
                      relative rounded-lg border p-4 flex cursor-pointer focus:outline-none
                      ${formData.userType === type 
                        ? 'border-red-500 bg-gray-700 text-white' 
                        : 'border-gray-600 text-gray-400'}
                    `}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={type}
                      className="sr-only"
                      checked={formData.userType === type}
                      onChange={handleChange}
                    />
                    <div className="flex-1 text-center">
                      <span className="block text-sm font-medium capitalize">
                        {type}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-red-500 hover:text-red-400">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Social Login Options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600"
              >
                <span className="sr-only">Sign in with Google</span>
                Google
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600"
              >
                <span className="sr-only">Sign in with Facebook</span>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;