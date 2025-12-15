import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { MdAdminPanelSettings, MdWorkspacePremium } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { LuUserX } from "react-icons/lu";
import { LuUserRoundCheck } from "react-icons/lu";
import Swal from "sweetalert2";



const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Query to fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  // Query to promote to admin
  const promoteMutation = useMutation({
    mutationFn: (email) => axiosSecure.patch(`/admin/users/role/${email}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-users"]);
    },
  });

  // Query to delete user
  const deleteMutation = useMutation({
    mutationFn: (email) => axiosSecure.delete(`/admin/users/${email}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-users"]);
    },
  });

const handleDeleteUser = (email) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to delete this user?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteMutation.mutate(email, {
        onSuccess: () => {
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted successfully.",
            icon: "success",
          });
        },
        onError: (err) => {
          if (err.response?.status === 403) {
            Swal.fire("Forbidden", "You cannot delete this user", "error");
          } else {
            Swal.fire("Error", "Failed to delete user", "error");
          }
        },
      });
    }
  });
};


  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="px-3 lg:px-0 my-10">
      <h1 className="text-lg font-semibold mb-4 lg:text-2xl">
        Total users: {users.length}
      </h1>

      <div className="overflow-x-auto w-full rounded-lg shadow-sm">
        <table className="table min-w-[700px] lg:min-w-full text-sm lg:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th></th>
              <th>User Name</th>
              <th>Email</th>
              <th>Total Lessons</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.email} className="hover">
                <th>{index + 1}</th>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>{user.totalLessons}</td>

                <td>
                  {user.role === "admin" && (
                    <span>
                      <MdAdminPanelSettings
                        className="text-primary"
                        size={30}
                      />
                    </span>
                  )}
                  {user.role === "freeUser" && (
                    <span>
                      <FaUser
                        className="text-primary"
                        size={26}
                      />
                    </span>
                  )} 
                  {user.role === "Premium" && (
                    <span>
                      <MdWorkspacePremium
                        className="text-primary"
                        size={30}
                      />
                    </span>
                  )}
                </td>

                <td className="flex gap-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => promoteMutation.mutate(user.email)}
                      className="btn btn-secondary btn-xs lg:btn-sm"
                    >
                     <LuUserRoundCheck size={15}/> Make Admin
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteUser(user.email)}
                    className="btn btn-primary btn-xs lg:btn-sm"
                  >
                   <LuUserX size={15}/> Delete User
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

export default ManageUsers;
