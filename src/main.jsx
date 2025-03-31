import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { GymProvider } from './context/GymContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <GymProvider>
        <App />
      </GymProvider>
    </AuthProvider>
  </React.StrictMode>
);