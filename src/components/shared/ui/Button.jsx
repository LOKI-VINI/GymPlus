import React from 'react';

const variants = {
  primary: 'bg-red-600 text-white hover:bg-red-700',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const sizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  return (
    <button
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-lg
        transition-colors
        focus:outline-none focus:ring-2 focus:ring-red-500
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;