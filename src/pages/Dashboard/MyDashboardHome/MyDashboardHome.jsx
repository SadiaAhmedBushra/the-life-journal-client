import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { FaBook, FaHeart, FaBolt } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import LessonCard from "../../Shared/LessonCard/LessonCard";

function formatDate(date) {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const MyDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch lessons created by user
  const { data: lessons = [], isLoading: loadingLessons } = useQuery({
    queryKey: ["my-lessons", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${user.email}`);
      return res.data;
    },
  });

  // Fetch favorites saved by user
  const { data: favorites = [], isLoading: loadingFavorites } = useQuery({
    queryKey: ["my-favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/favorites/${user.email}`);
      return res.data;
    },
  });

  if (loadingLessons || loadingFavorites) {
    return <LoadingSpinner />;
  }

  // Sort lessons to get recently added
  const recentLessons = [...lessons]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  // Group lessons by date 
  const contributionsMap = lessons.reduce((acc, lesson) => {
    const createdAt = lesson.createdAt || lesson.created_at;
    if (!createdAt) return acc;

    const dateKey = formatDate(createdAt);

    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {});

  // Convert map to array and sort by date ascending
  const analyticsData = Object.entries(contributionsMap)
    .map(([name, reflections]) => ({ name, reflections }))
    .sort((a, b) => new Date(a.name) - new Date(b.name));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Total Lessons */}
        <div className="bg-secondary/5 shadow rounded-lg p-6 flex items-center gap-4">
          <div className="p-4 bg-primary text-white rounded-full">
            <FaBook size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-muted">
              Total Lessons Created
            </h3>
            <p className="text-3xl font-bold text-primary">{lessons.length}</p>
          </div>
        </div>

        {/* Total Favorites */}
        <div className="bg-primary/5 shadow rounded-lg p-6 flex items-center gap-4">
          <div className="p-4 bg-secondary text-white rounded-full">
            <FaHeart size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-muted">
              Total Saved (Favorites)
            </h3>
            <p className="text-3xl font-bold text-secondary">
              {favorites.length}
            </p>
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <FaBolt className="text-yellow-500" />
            Quick Actions
          </h3>
          <div className="flex flex-col gap-3">
            <Link
              to="/dashboard/add-lesson"
              className="btn btn-primary py-2 text-center text-sm rounded"
            >
              Add New Lesson
            </Link>
            <Link
              to="/dashboard/my-lessons"
              className="btn btn-secondary py-2 text-center text-sm rounded"
            >
              View My Lessons
            </Link>
            <Link
              to="/dashboard/my-favorites"
              className="btn btn-primary py-2 text-center text-sm rounded"
            >
              View Favorites
            </Link>
            <Link
              to="/dashboard/update-my-profile"
              className="btn btn-secondary py-2 text-center text-sm rounded"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h3 className="text-2xl text-secondary font-semibold mb-6 text-muted border-b-3 border-secondary pb-2">
          Recently Added Lessons
        </h3>
        {recentLessons.length === 0 ? (
          <p className="text-gray-500">You have no lessons added yet.</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {recentLessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="text-2xl text-primary font-semibold mb-6 text-muted border-b-3 border-primary pb-2">
          Daily Contributions
        </h3>
        <div
          style={{
            width: "100%",
            height: 280,
            backgroundColor: "#f9fafb",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgb(0 0 0 / 0.05)",
          }}
        >
          <ResponsiveContainer>
            <BarChart
              data={analyticsData}
              margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fill: "#4b5563", fontWeight: "600" }}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "#4b5563", fontWeight: "600" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#e0f2f1",
                  borderRadius: 4,
                  border: "none",
                }}
              />
              <Bar dataKey="reflections" fill="#14B8A6" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default MyDashboardHome;
