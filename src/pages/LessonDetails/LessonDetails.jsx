import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const LessonDetails = () => {
  const { user } = useAuth();
  const { id } = useParams(); // Get lesson ID from URL
  const axiosSecure = useAxiosSecure();

  // Fetch single lesson by ID
  const { data: lesson = {}, isLoading, error } = useQuery({
    queryKey: ["lesson-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading lesson details.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">
        {lesson.lessonTitle}
      </h1>

      <p className="text-gray-700 mb-2">
        <strong>Privacy:</strong> {lesson.privacy}
      </p>

      <p className="text-gray-700 mb-2">
        <strong>Access Level:</strong> {lesson.accessLevel}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Category:</strong> {lesson.category}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Emotional Tone:</strong> {lesson.emotionalTone}
      </p>

      <p className="text-gray-700 mb-2">
        <strong>Created At:</strong> {lesson.createdAt}
      </p>

      <p className="text-gray-700 mb-2">
        <strong>Likes:</strong> {lesson.likesCount}
      </p>

      <p className="text-gray-700 mb-2">
        <strong>Favorites:</strong> {lesson.favoritesCount}
      </p>

      <p className="text-gray-700 mb-2">
        <strong>Views:</strong> {lesson.views}
      </p>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Lesson Description</h2>
        <p className="text-gray-800">{lesson.description}</p>
      </div>
    </div>
  );
};

export default LessonDetails;
