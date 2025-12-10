import React from "react";
import useAuth from "../hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <span className="loading loading-dots loading-xs"></span>
      </div>
    );
  }

  if (!user) {
//   return <Navigate state={location.pathname} to="/login"></Navigate>;
return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
