import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: lessonData = [], refetch} = useQuery({
    queryKey: ["my-lessons", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDeleteLesson = (lessonId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/lessons/${lessonId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Lesson has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // console.log("LESSON DATA:", lessonData);

  return (
    <div>
      <h1>Number of lessons added: {lessonData.length}</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Privacy</th>
              <th>Access Level</th>
              <th>Created At</th>
              <th>Likes</th>
              <th>Favorites Count</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessonData.map((lesson, index) => (
              <tr key={lesson._id}>
                <th>{index + 1}</th>
                <td>{lesson.lessonTitle}</td>
                <td>{lesson.privacy}</td>
                <td>{lesson.accessLevel}</td>
                <td>{lesson.createdAt}</td>
                <td>{lesson.likesCount}</td>
                <td>{lesson.favoritesCount}</td>
                <td>{lesson.views}</td>
                <td>
                  <button className="btn btn-primary mx-2">
                    <FaRegEdit />
                  </button>

                  <button className="btn btn-secondary mx-2">
                    <HiOutlineDocumentMagnifyingGlass />
                  </button>

                  <button
                    onClick={() => handleDeleteLesson(lesson._id)}
                    className="btn btn-secondary mx-2"
                  >
                    <MdDeleteOutline />
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

export default MyLessons;
