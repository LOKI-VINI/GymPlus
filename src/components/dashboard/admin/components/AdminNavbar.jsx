import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/admin" className="flex items-center">
              <span className="text-xl font-bold text-white">
                Gym<span className="text-red-600">Plus</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/admin" 
              className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/members" 
              className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Members
            </Link>
            <Link 
              to="/admin/trainers" 
              className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Trainers
            </Link>
            <Link 
              to="/admin/classes" 
              className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Classes
            </Link>
            <Link 
              to="/admin/payments" 
              className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Payments
            </Link>
          </div>

          {/* Profile and Logout */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center text-sm text-gray-300 hover:text-red-500">
                <img
                  className="h-8 w-8 rounded-full border-2 border-red-500"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Admin profile"
                />
                <span className="ml-2">Admin</span>
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center text-sm text-gray-300 hover:text-red-500 px-3 py-2"
            >
              <svg 
                className="h-5 w-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;