import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/users/role/${user.email}`);

      console.log(result);
      return result.data.role;
    },
  });

  return [role, isRoleLoading];
};

export default useRole;
