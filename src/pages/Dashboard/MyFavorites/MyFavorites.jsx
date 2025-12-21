import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { IoHeartDislikeOutline } from "react-icons/io5";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [categoryFilter, setCategoryFilter] = useState("");
  const [emotionalToneFilter, setEmotionalToneFilter] = useState("");

  const { data: favorites = [], isLoading, refetch } = useQuery({
    queryKey: ["my-favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/favorites/${user.email}`);
      return res.data;
    },
  });

  // toggle off
  const removeFavoriteMutation = useMutation({
    mutationFn: (lessonId) =>
      axiosSecure.patch(`/lessons/${lessonId}/favorite`, { userId: user.email }),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-favorites", user.email]);
      queryClient.invalidateQueries(["lesson-details"]);
      refetch();
      Swal.fire({
        icon: "success",
        title: "Removed from Favorites",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const handleRemoveFavorite = (lessonId) => {
    Swal.fire({
      title: "Remove this lesson from favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFavoriteMutation.mutate(lessonId);
      }
    });
  };

  const filteredFavorites = favorites.filter((lesson) => {
    return (
      (categoryFilter ? lesson.category === categoryFilter : true) &&
      (emotionalToneFilter ? lesson.emotionalTone === emotionalToneFilter : true)
    );
  });

  const categories = Array.from(new Set(favorites.map((l) => l.category).filter(Boolean)));
  const emotionalTones = Array.from(new Set(favorites.map((l) => l.emotionalTone).filter(Boolean)));

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="px-3 lg:px-0 my-10">
      <h2 className="text-3xl font-bold my-10 text-center text-primary">
        My Favorite Lessons
      </h2>
      <h1 className="text-lg font-semibold mb-4 lg:text-2xl">
        Number of favorites: {favorites.length}
      </h1>

      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div>
          <label className="font-semibold mr-2" htmlFor="categoryFilter">
            Filter by Category:
          </label>
          <select
            id="categoryFilter"
            className="border border-primary rounded-lg p-1"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold mr-2" htmlFor="emotionalToneFilter">
            Filter by Emotional Tone:
          </label>
          <select
            id="emotionalToneFilter"
            className="border border-primary rounded-lg p-1"
            value={emotionalToneFilter}
            onChange={(e) => setEmotionalToneFilter(e.target.value)}
          >
            <option value="">All</option>
            {emotionalTones.map((tone) => (
              <option key={tone} value={tone}>
                {tone}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto w-full rounded-lg shadow-sm">
        <table className="table min-w-[700px] lg:min-w-full text-sm lg:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th></th>
              <th>Title</th>
              <th>Category</th>
              <th>Emotional Tone</th>
              <th>Privacy</th>
              <th>Likes</th>
              <th>Favorites Count</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredFavorites.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center p-4 italic text-gray-500">
                  No favorites found.
                </td>
              </tr>
            )}

            {filteredFavorites.map((lesson, index) => (
              <tr key={lesson._id} className="hover">
                <th>{index + 1}</th>
                <td>{lesson.lessonTitle}</td>
                <td>{lesson.category || "-"}</td>
                <td>{lesson.emotionalTone || "-"}</td>
                <td>{lesson.privacy || "-"}</td>
                <td>{lesson.likesCount}</td>
                <td>{lesson.favoritesCount}</td>
                <td>{lesson.views}</td>
                <td className="flex gap-2">
                  <Link to={`/lesson/${lesson._id}`}>
                    <button className="btn btn-secondary btn-xs lg:btn-sm" title="View Details">
                      <HiOutlineDocumentMagnifyingGlass size={15}/>
                    </button>
                  </Link>

                  <button
                    onClick={() => handleRemoveFavorite(lesson._id)}
                    className="btn btn-secondary btn-xs lg:btn-sm"
                    title="Remove from Favorites"
                  >
                    <IoHeartDislikeOutline size={15}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavorites;
