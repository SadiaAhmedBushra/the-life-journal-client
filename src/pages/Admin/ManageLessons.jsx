import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Swal from "sweetalert2";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({
    category: "",
    privacy: "",
    isFlagged: "",
  });

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["admin-lessons", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.privacy) params.append("privacy", filters.privacy);
      if (filters.isFlagged) params.append("flagged", filters.isFlagged);
      const res = await axiosSecure.get(`/admin/lessons?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-lesson-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/lessons/stats");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/lessons/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-lessons"]);
      queryClient.invalidateQueries(["admin-lesson-stats"]);
    },
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: ({ id, current }) =>
      axiosSecure.put(`/lessons/${id}`, { isFeatured: !current }),
    onSuccess: () => queryClient.invalidateQueries(["admin-lessons"]),
  });

  const toggleReviewedMutation = useMutation({
    mutationFn: ({ id, current }) =>
      axiosSecure.put(`/lessons/${id}`, { isReviewed: !current }),
    onSuccess: () => queryClient.invalidateQueries(["admin-lessons"]),
  });

  if (isLoading || statsLoading) return <LoadingSpinner />;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the lesson.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="max-w-6xl my-10 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Manage Lessons</h1>

      <div className="flex gap-8 mb-6">
        <div>
          <h3 className="font-semibold">Public Lessons</h3>
          <p>{stats.publicLessons ?? 0}</p>
        </div>
        <div>
          <h3 className="font-semibold">Private Lessons</h3>
          <p>{stats.privateLessons ?? 0}</p>
        </div>
        <div>
          <h3 className="font-semibold">Flagged Lessons</h3>
          <p>{stats.flaggedLessons ?? 0}</p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <select
          className="select select-bordered border-primary rounded-lg w-auto"
          value={filters.category}
          onChange={(e) =>
            setFilters((f) => ({ ...f, category: e.target.value }))
          }
        >
          <option value="">All Categories</option>
          <option value="Mindset">Mindset</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Productivity">Productivity</option>
        </select>

        <select
          className="select select-bordered w-auto border-primary rounded-lg"
          value={filters.privacy}
          onChange={(e) =>
            setFilters((f) => ({ ...f, privacy: e.target.value }))
          }
        >
          <option value="">All Privacy</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <select
          className="select select-bordered w-auto border-primary rounded-lg"
          value={filters.isFlagged}
          onChange={(e) =>
            setFilters((f) => ({ ...f, isFlagged: e.target.value }))
          }
        >
          <option value="">All</option>
          <option value="true">Flagged</option>
          <option value="false">Not Flagged</option>
        </select>
      </div>

      <div className="overflow-x-auto w-full rounded-lg shadow-sm">
        <table className="table min-w-[700px] lg:min-w-full text-sm lg:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Privacy</th>
              <th>Flagged</th>
              <th>Report Count</th>
              <th>Featured</th>
              <th>Reviewed</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson, i) => (
              <tr key={lesson._id} className="hover">
                <td>{i + 1}</td>
                <td>{lesson.lessonTitle}</td>
                <td>{lesson.category}</td>
                <td>{lesson.privacy}</td>
                <td>{lesson.isFlagged ? "Yes" : "No"}</td>
                <td>{lesson.ReportCount ?? 0}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={!!lesson.isFeatured}
                    onChange={() =>
                      toggleFeaturedMutation.mutate({
                        id: lesson._id,
                        current: !!lesson.isFeatured,
                      })
                    }
                    className="checkbox"
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={!!lesson.isReviewed}
                    onChange={() =>
                      toggleReviewedMutation.mutate({
                        id: lesson._id,
                        current: !!lesson.isReviewed,
                      })
                    }
                    className="checkbox"
                  />
                </td>
                <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-primary btn-xs lg:btn-lg"
                    onClick={() => handleDelete(lesson._id)}
                  >
                    Delete
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

export default ManageLessons;
