import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  if (role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
