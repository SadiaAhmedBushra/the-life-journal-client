import React from "react";
import useAuth from "../Hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <LoadingSpinner></LoadingSpinner>
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
