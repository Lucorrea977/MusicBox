import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };
  return (
    <div className="flex justify-center items-center p-10 w-full">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-purple-500 ${sizeClasses[size] || sizeClasses.md}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;