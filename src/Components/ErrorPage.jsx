import React from "react";
import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center playfair-display-font" style={{ backgroundColor: "var(--bg-main)" }}>
      <div className="text-[120px] mb-4" style={{ color: "var(--color-secondary)" }}>
        <MdErrorOutline />
      </div>

      <h1 className="text-7xl font-bold mb-2" style={{ color: "var(--color-primary)" }}>
        404
      </h1>

      <p className="text-xl mb-6 max-w-xl" style={{ color: "var(--text-secondary)" }}>
        Oops! The page you're looking for doesn't exist or may have been moved.
      </p>

      <div className="flex flex-wrap gap-4 justify-center mt-4">
        <Link
          to="/"
          className="btn-primary text-lg px-8 py-3 shadow-md hover:shadow-lg"
        >
          Go Home
        </Link>

      </div>

      <div
        className="mt-14 w-full max-w-md h-2 rounded-full mx-auto"
        style={{ background: "var(--color-secondary)" }}
      ></div>
    </div>
  );
};

export default ErrorPage;
