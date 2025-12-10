import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import formbg from "../../assets/formbg1.webp";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const categories = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

const emotionalTones = ["Motivational", "Sad", "Realization", "Gratitude"];

const isPremiumUser = false;

const AddLesson = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!isPremiumUser) {
      setValue("accessLevel", "free");
    }
  }, [isPremiumUser, setValue]);

  const handleAddLesson = (data) => {
    if (!user) {
      toast.error("You must be logged in to add a lesson");
      return;
    }

    const lessonData = {
      ...data,

      email: user.email,
      creatorId: user.uid,
      creatorName: user.displayName,
      creatorPhoto: user.photoURL,

      createdAt: new Date(),
      updatedAt: new Date(),

      likesCount: 0,
      likes: [],
      favoritesCount: 0,
      views: Math.floor(Math.random() * 10000),
      isFeatured: false,
      isReviewed: false,
    };

    //   console.log("Final Lesson Data:", lessonData);

    axiosSecure
      .post("/lessons", lessonData)
      .then((res) => {
        //   console.log("Lesson added:", res.data);
        toast.success("Lesson added successfully!");
        reset();
        setSelectedImage(null);
        queryClient.invalidateQueries(["my-lessons", user.email]);
      })
      .catch((error) => {
        console.error("Error adding lesson:", error);
        toast.error("Failed to add lesson");
      });
  };

  return (
    <div
      className="max-w-6xl mx-auto my-10 p-8 rounded-lg bg-cover bg-center"
      style={{ backgroundImage: `url(${formbg})` }}
    >
      <div className="backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-8 text-center text-primary">
          Add A Lesson
        </h2>

        <form
          onSubmit={handleSubmit(handleAddLesson)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Lesson Title */}
          <div>
            <label
              className="block font-semibold mb-1 text-text-primary"
              htmlFor="lessonTitle"
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

          {/* Full Description */}
          <div className="lg:col-span-2">
            <label
              className="block font-semibold mb-1 text-text-primary"
              htmlFor="description"
            >
              Full Description / Story / Insight
            </label>
            <textarea
              id="description"
              rows="5"
              placeholder="Write about your lesson"
              {...register("description", {
                required: "Lesson description is required",
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
              className="block font-semibold mb-1 text-text-primary"
              htmlFor="category"
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
              <option value="">Select a category</option>
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
              className="block font-semibold mb-1 text-text-primary"
              htmlFor="emotionalTone"
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
              <option value="">Select emotional tone</option>
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

          {/* Image */}
          <div>
            <label
              className="block font-semibold mb-1 text-text-primary"
              htmlFor="image"
            >
              Featured Image (Optional)
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className="file-input file-input-bordered w-full"
            />
            {selectedImage && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file: {selectedImage.name}
              </p>
            )}
          </div>

          {/* Privacy */}
          <div>
            <label
              className="block font-semibold mb-1 text-text-primary"
              htmlFor="privacy"
            >
              Privacy
            </label>
            <select
              id="privacy"
              {...register("privacy", {
                required: "Privacy selection is required",
              })}
              className={`select select-bordered w-full ${
                errors.privacy ? "border-red-500" : ""
              }`}
            >
              <option value="">Select privacy</option>
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
              className="block font-semibold mb-1 text-text-primary"
              htmlFor="accessLevel"
            >
              Access Level
            </label>
            <select
              id="accessLevel"
              {...register("accessLevel", {
                required: isPremiumUser ? "Access level is required" : false,
              })}
              disabled={!isPremiumUser}
              title={
                !isPremiumUser
                  ? "Upgrade to Premium to create paid lessons"
                  : undefined
              }
              className={`select select-bordered w-full ${
                !isPremiumUser ? "bg-gray-200 cursor-not-allowed" : ""
              } ${errors.accessLevel ? "border-red-500" : ""}`}
            >
              <option value="">Select access level</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
            {errors.accessLevel && (
              <p className="text-red-500 mt-1">{errors.accessLevel.message}</p>
            )}
          </div>

          <div className="lg:col-span-2">
            <input
              type="submit"
              value="Add Lesson"
              className="btn btn-primary w-full"
            />
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AddLesson;
