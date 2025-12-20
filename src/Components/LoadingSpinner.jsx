import React from "react";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const LoadingSpinner = () => {
  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/20 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <span className="loading loading-dots loading-sm"></span>
        <span className="loading loading-dots loading-md"></span>
        <span className="loading loading-dots loading-lg"></span>
        <span className="loading loading-dots loading-lg"></span>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
