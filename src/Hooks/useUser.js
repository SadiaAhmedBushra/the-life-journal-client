import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users?email=${user.email}`)
        .then((res) => {
          setDbUser(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user, axiosSecure]);

  return { dbUser, loading };
};

export default useUser;
