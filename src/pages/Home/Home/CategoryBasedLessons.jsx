import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LessonCard from "../../Shared/LessonCard/LessonCard";
import LoadingSpinner from "../../../Components/LoadingSpinner";

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

const CategoryBasedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const query = useQueryParams();

  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 6;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [emotionalTone, setEmotionalTone] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const urlCategory = query.get("category") || "";
    setCategory(urlCategory);
    setCurrentPage(1);
  }, [query]);

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["public-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  const filteredLessons = useMemo(() => {
    let data = lessons.slice();

    if (search) {
      const keyword = search.toLowerCase();
      data = data.filter(
        (lesson) =>
          lesson.lessonTitle?.toLowerCase().includes(keyword) ||
          lesson.description?.toLowerCase().includes(keyword) ||
          lesson.category?.toLowerCase().includes(keyword) ||
          lesson.emotionalTone?.toLowerCase().includes(keyword)
      );
    }

    if (category) {
      data = data.filter((lesson) => lesson.category === category);
    }

    if (emotionalTone) {
      data = data.filter((lesson) => lesson.emotionalTone === emotionalTone);
    }

    if (sortBy === "newest") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (sortBy === "saved") {
      data = data
        .filter((lesson) => (lesson.favoritesCount || 0) >= 1)
        .sort((a, b) => (b.favoritesCount || 0) - (a.favoritesCount || 0));
    }

    return data;
  }, [lessons, search, category, emotionalTone, sortBy]);

  const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = filteredLessons.slice(
    indexOfFirstLesson,
    indexOfLastLesson
  );

  const totalPages = Math.ceil(filteredLessons.length / lessonsPerPage);

  const paginate = (page) => setCurrentPage(page);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-primary text-center my-10">
        Checkout Some Life Changing Lessons
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search lessons..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="input input-bordered w-full border-secondary/50 rounded-lg"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="select select-bordered border-secondary/50 rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Relationships">Relationships</option>
          <option value="Mindset">Mindset</option>
          <option value="Mistakes Learned">Mistakes Learned</option>
        </select>

        <select
          value={emotionalTone}
          onChange={(e) => {
            setEmotionalTone(e.target.value);
            setCurrentPage(1);
          }}
          className="select select-bordered border-secondary/50 rounded-lg"
        >
          <option value="">All Emotional Tones</option>
          <option value="Motivational">Motivational</option>
          <option value="Sad">Sad</option>
          <option value="Realization">Realization</option>
          <option value="Gratitude">Gratitude</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered border-secondary/50 rounded-lg"
        >
          <option value="newest">Newest</option>
          <option value="saved">Most Saved</option>
        </select>
      </div>

      {filteredLessons.length === 0 ? (
        <p className="text-center text-secondary">No lessons found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentLessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>

          <div className="flex flex-wrap justify-center mt-8 gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-sm"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => paginate(num)}
                className={`btn btn-sm ${
                  currentPage === num ? "btn-primary" : ""
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-sm"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryBasedLessons;
