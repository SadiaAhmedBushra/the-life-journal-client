import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LessonCard from "../LessonCard/LessonCard";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["public-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const publicLessons = lessons.filter(
    (lesson) => lesson.privacy === "public"
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary text-center my-10">
        Checkout Some Life Changing Lessons
      </h1>

      {publicLessons.length === 0 ? (
        <p className="text-center text-secondary">No public lessons available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {publicLessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicLessons;
