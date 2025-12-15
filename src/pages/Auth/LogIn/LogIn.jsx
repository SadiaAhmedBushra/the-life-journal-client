import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import skyImg from "../../../assets/login-register-page-img.webp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveOrUpdateUser } from "../../../utils";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import useRole from "../../../Hooks/useRole";

const LogIn = () => {
  const { signInUser, user, loading } = useAuth();
  const [role, roleLoading] = useRole(); 
  const location = useLocation();
  const navigate = useNavigate();
  // const from = location.state?.from?.pathname || "/";
// default fallback for normal users
const defaultRedirect = "/dashboard";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

if (loading || roleLoading) return <LoadingSpinner />;

 if (user && role) {
    if (role === "admin") {
      return <Navigate to="/dashboard/admin" replace />;
    }
    return <Navigate to={defaultRedirect} replace />;
  }

  const handleLogIn = async (data) => {
    try {
      const result = await signInUser(data.email, data.password);

      await saveOrUpdateUser({
        name: data.name,
        email: data.email,
      });

      toast.success("Welcome back!");
      // No navigation here! Wait for user & role to update and trigger redirect
    } catch (error) {
      toast.error(`Sorry! Login failed: ${error.message}`);
    }
  };

//   const handleLogIn = async (data) => {
//     try {
//       const result = await signInUser(data.email, data.password);
//       await saveOrUpdateUser({
//         name: data.name,
//         email: data.email,
//       });
//       setTimeout(() => {
//       if (role === "admin") {
//         navigate("/admin-dashboard", { replace: true });
//       } else {
//         navigate(defaultRedirect, { replace: true });
//       }
//     }, 800);
//   } catch (error) {
//     toast.error(`Sorry! Login failed: ${error.message}`);
//   }
// };




const onError = (errors) => {
    if (errors.email) {
      toast.error("Email is required and must be valid");
    }
    if (errors.password) {
      if (errors.password.type === "required") {
        toast.error("Password is required");
      }
      if (errors.password.type === "minLength") {
        toast.error("Password must be at least 6 characters");
      }
      if (errors.password.type === "pattern") {
        toast.error(
          "Password must contain at least one uppercase and one lowercase letter"
        );
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-fixed bg-cover bg-center my-10 rounded-2xl"
      style={{ backgroundImage: `url(${skyImg})` }}
    >
      <div className="backdrop-blur-sm rounded-3xl max-w-md p-10 border border-[#818CF8]">
        <h3 className="text-4xl font-extrabold mb-4 text-primary text-center">
          Good to See You Again 🌿
        </h3>
        <p className="mb-5 text-center text-muted font-light">
          Log in to continue your journey of reflection and growth.
        </p>

        <form
          onSubmit={handleSubmit(handleLogIn, onError)}
          className="space-y-6"
        >
          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold text-text-primary">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="rounded-full w-full px-4 py-3 border border-[#818CF8] focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-indigo-900 bg-white"
              placeholder="Email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                This field is required
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-semibold text-text-primary">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
              })}
              className="rounded-full w-full px-4 py-3 border border-[#818CF8] focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-indigo-900 bg-white/90"
              placeholder="Create a password"
            />
            {errors.password?.type === "required" && (
              <p className="mt-1 text-sm text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="mt-1 text-sm text-red-600">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="mt-1 text-sm text-red-600">
                Password must contain at least one uppercase and one lowercase
                letter
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <a className="link link-hover text-primary hover:text-black cursor-pointer">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-secondary font-light">
          New to The Life Journal?{" "}
          <Link
            to="/auth/register"
            className="underline hover:text-black text-primary"
          >
            Register
          </Link>
        </p>

        <div className="mt-5">
          <SocialLogin />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LogIn;
