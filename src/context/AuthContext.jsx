import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

// Add useAuth hook in the same file
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('authToken', 'dummy-token');
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Add check for loading state
  if (loading) {
    return null; // or a loading spinner
  }

  const value = { 
    user, 
    isAuthenticated, 
    login, 
    logout,
    // Add these helper methods
    isAdmin: () => user?.role === 'admin',
    isMember: () => user?.role === 'member'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};