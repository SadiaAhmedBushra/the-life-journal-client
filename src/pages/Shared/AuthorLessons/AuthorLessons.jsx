import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const AuthorLessons = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: lessons = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["author-lessons", email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons?email=${email}&privacy=public&price=free`
      );
      return res.data;
    },
    enabled: !!email,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <p className="text-center text-red-600">Failed to load lessons.</p>;

  return (
    <main className="max-w-5xl mx-auto my-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Lessons by {email}</h1>
      {lessons.length === 0 ? (
        <p>No lessons found for this author.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              onClick={() => navigate(`/lessons/${lesson._id}`)}
              className="border rounded shadow cursor-pointer hover:shadow-lg p-4"
            >
              <h2 className="text-xl font-semibold mb-2">
                {lesson.lessonTitle}
              </h2>
              <p className="text-gray-700 line-clamp-3">{lesson.description}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default AuthorLessons;
