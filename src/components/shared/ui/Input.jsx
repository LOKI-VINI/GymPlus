import React from 'react';

const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`
        w-full
        px-4 py-2
        bg-gray-800
        text-white
        rounded-lg
        focus:outline-none focus:ring-2 focus:ring-red-500
        ${className}
      `}
      {...props}
    />
  );
};

export default Input;