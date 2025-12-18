import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LessonCard from "../LessonCard/LessonCard";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 6; 

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

  // pagination logic
  const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = publicLessons.slice(indexOfFirstLesson, indexOfLastLesson);

  const totalPages = Math.ceil(publicLessons.length / lessonsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-primary text-center my-10">
        Checkout Some Life Changing Lessons
      </h1>

      {publicLessons.length === 0 ? (
        <p className="text-center text-secondary">No public lessons available.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentLessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>

          <div className="flex flex-wrap justify-center mt-8 space-x-2 sm:space-x-3">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded ${
                  currentPage === number ? "bg-primary text-white" : "bg-gray-200"
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PublicLessons;
