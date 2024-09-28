import React from 'react';

const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseStyles = 'py-2 px-4 rounded text-white focus:outline-none';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-600 hover:bg-gray-700',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
