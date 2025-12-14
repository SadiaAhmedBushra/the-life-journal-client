import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import formbg from "../../../assets/formbg1.webp";
import useRole from "../../../Hooks/useRole";

const categories = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

const emotionalTones = ["Motivational", "Sad", "Realization", "Gratitude"];

const EditLesson = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [role, isRoleLoading] = useRole();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
    if (!isRoleLoading && role === "freeUser") {
      setValue("accessLevel", "free");
    }
  }, [role, isRoleLoading, setValue]);

//   useEffect(() => {
//     axiosSecure
//       .get(`/lessons/${id}`)
//       .then((res) => {
//         reset(res.data);
//       })
//       .catch((error) => {
//         toast.error("Failed to load lesson data");
//       })
//       .finally(() => setLoading(false));
//   }, [id, axiosSecure, reset]);

//   const onSubmit = (data) => {
//     const updatedData = {
//       ...data,
//       updatedAt: new Date(),
//     };

//     axiosSecure
//       .put(`/lessons/${id}`, updatedData)
//       .then((res) => {
//         toast.success("Lesson updated successfully!");
// navigate(`/lesson/${id}`);
//       })
//       .catch((error) => {
//         toast.error("Failed to update lesson");
//       });
//   };


  // ✅ GREEN TICK: default accessLevel for free users (unchanged logic)
  useEffect(() => {
    if (!isRoleLoading && role === "freeUser") {
      setValue("accessLevel", "free");
    }
  }, [role, isRoleLoading, setValue]);

  // ✅ GREEN TICK: handle unauthorized (403) lesson access
  useEffect(() => {
    axiosSecure
      .get(`/lessons/${id}`)
      .then((res) => {
        reset(res.data);
      })
      .catch((error) => {
        if (error?.response?.status === 403) {
          toast.error("You are not allowed to edit this lesson");
          navigate("/"); // redirect safely
        } else {
          toast.error("Failed to load lesson data");
        }
      })
      .finally(() => setLoading(false));
  }, [id, axiosSecure, reset, navigate]);

  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      updatedAt: new Date(),
    };

    axiosSecure
      .put(`/lessons/${id}`, updatedData)
      .then(() => {
        toast.success("Lesson updated successfully!");
        navigate(`/lesson/${id}`);
      })
      .catch((error) => {
        // ✅ GREEN TICK: handle forbidden edit (owner/admin enforced by backend)
        if (error?.response?.status === 403) {
          toast.error("You are not allowed to update this lesson");
        } else {
          toast.error("Failed to update lesson");
        }
      });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div
      className="max-w-6xl mx-auto my-10 p-8 rounded-lg bg-cover bg-center"
      style={{ backgroundImage: `url(${formbg})` }}
    >
      <div className="backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-8 text-center text-primary">
          Update Lesson
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Lesson Title */}
          <div>
            <label
              htmlFor="lessonTitle"
              className="block font-semibold mb-1 text-text-primary"
            >
              Lesson Title
            </label>
            <input
              id="lessonTitle"
              type="text"
              placeholder="Lesson Title"
              {...register("lessonTitle", {
                required: "Lesson title is required",
              })}
              className={`input input-bordered w-full ${
                errors.lessonTitle ? "border-red-500" : ""
              }`}
            />
            {errors.lessonTitle && (
              <p className="text-red-500 mt-1">{errors.lessonTitle.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <label
              htmlFor="description"
              className="block font-semibold mb-1 text-text-primary"
            >
              Full Description / Story / Insight
            </label>
            <textarea
              id="description"
              rows="5"
              placeholder="Write about your lesson"
              {...register("description", {
                required: "Description is required",
              })}
              className={`input input-bordered w-full resize-none ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <p className="text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block font-semibold mb-1 text-text-primary"
            >
              Category
            </label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className={`select select-bordered w-full ${
                errors.category ? "border-red-500" : ""
              }`}
            >
              <option disabled value="">
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Emotional Tone */}
          <div>
            <label
              htmlFor="emotionalTone"
              className="block font-semibold mb-1 text-text-primary"
            >
              Emotional Tone
            </label>
            <select
              id="emotionalTone"
              {...register("emotionalTone", {
                required: "Emotional tone is required",
              })}
              className={`select select-bordered w-full ${
                errors.emotionalTone ? "border-red-500" : ""
              }`}
            >
              <option disabled value="">
                Select emotional tone
              </option>
              {emotionalTones.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
            {errors.emotionalTone && (
              <p className="text-red-500 mt-1">
                {errors.emotionalTone.message}
              </p>
            )}
          </div>

          {/* Privacy */}
          <div>
            <label
              htmlFor="privacy"
              className="block font-semibold mb-1 text-text-primary"
            >
              Privacy
            </label>
            <select
              id="privacy"
              {...register("privacy", { required: "Privacy is required" })}
              className={`select select-bordered w-full ${
                errors.privacy ? "border-red-500" : ""
              }`}
            >
              <option disabled value="">
                Select privacy
              </option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            {errors.privacy && (
              <p className="text-red-500 mt-1">{errors.privacy.message}</p>
            )}
          </div>

          {/* Access Level */}
          <div>
            <label
              htmlFor="accessLevel"
              className="block font-semibold mb-1 text-text-primary"
            >
              Access Level
            </label>
            <select
              id="accessLevel"
              {...register("accessLevel", {
                required:
                  role === "premiumUser" ? "Access level is required" : false,
              })}
              disabled={role === "freeUser"}
              title={
                role === "freeUser"
                  ? "Upgrade to Premium to create paid lessons"
                  : undefined
              }
              className={`select select-bordered w-full ${
                role === "freeUser" ? "bg-gray-200 cursor-not-allowed" : ""
              } ${errors.accessLevel ? "border-red-500" : ""}`}
            >
              <option disabled value="">
                Select access level
              </option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default EditLesson;
