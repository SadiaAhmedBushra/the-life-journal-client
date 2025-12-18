import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import LessonCard from "../../Shared/LessonCard/LessonCard";

const AuthorLessons = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // author info
  const {
    data: author,
    isLoading: authorLoading,
    error: authorError,
  } = useQuery({
    queryKey: ["author", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/authors/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  // author's lessons
  const {
    data: lessons = [],
    isLoading: lessonsLoading,
    error: lessonsError,
  } = useQuery({
    queryKey: ["author-lessons", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/authors/${email}/lessons`);
      return res.data;
    },
    enabled: !!email,
  });

  if (authorLoading || lessonsLoading) return <LoadingSpinner />;

  if (authorError || lessonsError) {
    return (
      <div className="text-center mt-20 text-red-500">
        Failed to load author data.
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto my-12 px-4">
      <section className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-lg p-8 rounded-xl mb-12">
        <img
          src={author?.photoURL || "/default-profile.png"}
          alt={author?.name}
          className="w-28 h-28 rounded-full object-cover border"
        />

        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-primary">
            {author?.name || "Unknown Author"}
          </h1>

          <p className="text-gray-600 mt-1">{author?.email}</p>

          <p className="mt-2 text-lg font-semibold">
            {author?.lessonsCreated} lesson
            {author?.lessonsCreated !== 1 && "s"} created
          </p>

          <button onClick={() => navigate(-1)} className="mt-4 btn btn-outline">
            ← Back
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 border-b-4 border-secondary inline-block">
          Lessons by {author?.name}
        </h2>

        {lessons.length === 0 && (
          <p className="text-gray-500 italic mt-6">
            This author hasn’t published any public lessons yet.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default AuthorLessons;
