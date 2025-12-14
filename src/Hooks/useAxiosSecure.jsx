import axios from "axios";
import { useContext, useEffect, useRef } from "react";
// import useAuth from "../Hooks/useAuth";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, loading, logOut } = useContext(AuthContext);
  const requestInterceptorRef = useRef(null);
  const responseInterceptorRef = useRef(null);

  useEffect(() => {
    // Always remove previous interceptors first (safe even if null)
    if (requestInterceptorRef.current !== null) {
      axiosSecure.interceptors.request.eject(requestInterceptorRef.current);
      requestInterceptorRef.current = null;
    }
    if (responseInterceptorRef.current !== null) {
      axiosSecure.interceptors.response.eject(responseInterceptorRef.current);
      responseInterceptorRef.current = null;
    }

    // Only add new ones if authenticated and not loading
    if (!loading && user?.accessToken) {
      // Request interceptor: add token
      requestInterceptorRef.current = axiosSecure.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      });

      // Response interceptor: handle 401/403
      responseInterceptorRef.current = axiosSecure.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            logOut()
              .then(() => {
                console.log("Logged out due to token issue.");
              })
              .catch(console.error);
          }
          return Promise.reject(err);
        }
      );
    }

    // Cleanup on unmount or deps change
    return () => {
      if (requestInterceptorRef.current !== null) {
        axiosSecure.interceptors.request.eject(requestInterceptorRef.current);
      }
      if (responseInterceptorRef.current !== null) {
        axiosSecure.interceptors.response.eject(responseInterceptorRef.current);
      }
    };
  }, [user, loading, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;