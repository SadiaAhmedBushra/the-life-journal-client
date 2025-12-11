import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200/60 backdrop-blur-sm z-50">
      <div className="animate-pulse w-full max-w-2xl mx-auto">
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;