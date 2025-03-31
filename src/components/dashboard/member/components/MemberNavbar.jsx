import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import { useMember } from '../../../../context/MemberContext';
import { 
  FaDumbbell, 
  FaWallet, 
  FaCalendarAlt,
  FaUtensils, 
  FaChartLine,
  FaClipboardList,
  FaComments,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle,
  FaUser
} from 'react-icons/fa';

const MemberNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { currentMember } = useMember();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActiveLink = (path) => {
    if (path === '/member/workouts') {
      return location.pathname.includes('workouts');
    }
    if (path === '/member/classes') {
      return location.pathname.includes('classes') || location.pathname.includes('schedule');
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { 
      path: '/member/workouts', 
      icon: <FaDumbbell className="w-5 h-5" />, 
      text: 'Workouts'
    },
    { 
      path: '/member/classes', 
      icon: <FaCalendarAlt className="w-5 h-5" />, 
      text: 'Schedule'
    },
    { 
      path: '/member/diet', 
      icon: <FaUtensils className="w-5 h-5" />, 
      text: 'Diet'
    },
    { 
      path: '/member/payments', 
      icon: <FaWallet className="w-5 h-5" />, 
      text: 'Payments'
    },
    { 
      path: '/member/progress', 
      icon: <FaChartLine className="w-5 h-5" />, 
      text: 'Progress'
    }
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/member" className="text-xl font-bold flex items-center">
              <span className="text-white">Gym</span>
              <span className="text-red-500">Plus</span>
            </Link>
            
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActiveLink(link.path)
                        ? 'bg-red-500 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors duration-200"
            >
              <FaUser className="text-gray-300 w-5 h-5" />
              <span className="text-gray-300">Profile</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/member/profile"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                >
                  View Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsProfileOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActiveLink(link.path)
                    ? 'bg-red-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MemberNavbar;
