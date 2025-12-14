import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import skyImg from "../../../assets/login-register-page-img.webp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveOrUpdateUser } from "../../../utils";
import { Link, Navigate, useLocation, useNavigate } from "react-router";

const Register = () => {
  const { registerUser, updateUserProfile, user, loading } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  // const from = location.state?.from?.pathname || "/";
 const from = "/dashboard";
     const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  if (loading) return <div>Loading...</div>;
  if (user) return <Navigate to={from} replace={true} />;



  const handleRegistration = async (data) => {
    try {
      if (!data.photo || !data.photo[0]) {
        toast.error("Please upload a photo");
        return;
      }

      const profileImg = data.photo[0];

      const formData = new FormData();
      formData.append("image", profileImg);

      const img_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMG_HOST_KEY
      }`;

      const imgRes = await axios.post(img_API_URL, formData);
      const photoURL = imgRes.data.data.display_url;

      const userProfile = {
        displayName: data.name,
        photoURL: photoURL,
      };

      const result = await registerUser(data.email, data.password);
      await saveOrUpdateUser({
        name: data.name,
        email: data.email,
        photo: photoURL,
      });

      await updateUserProfile(userProfile);

      toast.success("Congrats! Registration successful.");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 800);
    } catch (error) {
      toast.error(`Sorry! Registration failed: ${error.message}`);
    }
  };

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
          Start Your Journey Today ✨
        </h3>
        <p className="mb-5 text-center text-muted font-light">
          Create your free account and begin documenting your story.
        </p>

        <form
          onSubmit={handleSubmit(handleRegistration, onError)}
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold text-text-primary">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="rounded-full w-full px-4 py-2 border border-[#818CF8] focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-indigo-900 bg-white"
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">Name is required</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="block mb-2 font-semibold text-text-primary">
              Photo
            </label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="rounded-full w-full file-input file-input-bordered border-[#818CF8]"
              accept="image/*"
            />
            {errors.photo && (
              <p className="mt-1 text-sm text-red-600">Photo is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold text-text-primary">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="rounded-full w-full px-4 py-3 border border-[#818CF8] focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-indigo-900 bg-white/90"
              placeholder="Your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">Email is required</p>
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

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-secondary font-light">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="underline hover:text-black text-primary"
          >
            Log In
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

export default Register;
