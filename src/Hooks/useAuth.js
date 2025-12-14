import { useContext } from "react";
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAuth = () => {
  const authInfo = useContext(AuthContext);
  const { user } = authInfo;

  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return {
    ...authInfo,
    role,
    roleLoading,
  };
};

export default useAuth;
