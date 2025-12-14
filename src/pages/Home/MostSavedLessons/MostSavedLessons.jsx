import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import LessonCard from "../../Shared/LessonCard/LessonCard";

const MostSavedLessons = () => {
  const axiosSecure = useAxiosSecure();

const { data, isLoading, error } = useQuery({
  queryKey: ["most-saved-lessons"],
  queryFn: async () => {
    const res = await axiosSecure.get("/analytics/most-saved-lessons");
    return res.data;
  },
});


  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Failed to load lessons</p>;

  if (!data || data.length === 0)
    return <p className="text-gray-500 text-center">No saved lessons found.</p>;

  return (
    <div className="max-w-6xl mx-auto my-10 p-10">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">Check Out The Most Saved Lessons</h1>
      <div className="flex flex-col lg:flex-row gap-6 justify-center">
      {data.map((lesson) => (
        <LessonCard key={lesson._id} lesson={lesson} />
      ))}
    </div>
    </div>
  );
};

export default MostSavedLessons;
