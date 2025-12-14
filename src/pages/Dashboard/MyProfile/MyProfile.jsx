import React from "react";
import formbg from "../../../assets/formbg1.webp";
import useRole from "../../../Hooks/useRole";
import { Link } from "react-router";
import { MdAdminPanelSettings, MdOutlineWorkspacePremium } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import LessonCard from "../../Shared/LessonCard/LessonCard";

const MyProfile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();

  const axiosSecure = useAxiosSecure();

  const {
    data: favorites = [],
    isLoading,
    refetch: refetchFavorites,
  } = useQuery({
    queryKey: ["my-favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/favorites/${user.email}`);
      return res.data;
    },
  });

  const { data: lessonData = [], refetch: refetchLessons } = useQuery({
    queryKey: ["my-lessons", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div
      className="max-w-6xl mx-auto my-10 p-6 lg:p-8 rounded-lg bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${formbg})` }}
    >
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-3xl lg:text-4xl font-extrabold my-4 text-primary text-center">
          Profile
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          <div className="backdrop-blur-sm bg-white/60 p-6 lg:p-8 rounded-lg shadow-lg  lg:col-span-4 flex flex-col items-center justify-between gap-4">
            <a href="#" className="relative block">
              <img
                alt="profile"
                src={user?.photoURL}
                className="mx-auto object-cover rounded-full h-32 w-32 lg:h-40 lg:w-40 border-2 border-white"
              />
            </a>
            {role === "Premium" && (
              <div className="flex items-center gap-1 btn-primary text-white ">
                <MdOutlineWorkspacePremium className="text-2xl" />
                <span>Premium User</span>
              </div>
            )}

            {role === "admin" && (
              <div className="flex items-center gap-1 btn-primary text-white ">
                <MdAdminPanelSettings className="text-2xl" />
                <span>Admin</span>
              </div>
            )}

            {role === "freeUser" && <div></div>}
            <p className="text-center text-md text-secondary">
              User Id: {user?.uid}
            </p>
          </div>

          <div className="backdrop-blur-sm rounded-lg shadow-lg bg-white/60 lg:col-span-8 p-6 lg:py-8">
            <div className="flex flex-col gap-13 w-full">
              <div className="flex flex-col lg:flex-row justify-between items-start w-full px-6 gap-10">
                <div className="flex flex-col justify-center items-start gap-6 w-full lg:w-1/2">
                  <p className="flex flex-col text-muted">
                    Name
                    <span className="font-bold text-primary text-xl">
                      {user?.displayName}
                    </span>
                  </p>
                  <p className="flex flex-col text-muted">
                    Email
                    <span className="font-bold text-primary text-xl">
                      {user?.email}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col justify-between items-start gap-6 w-full lg:w-1/2">
                  <p className="flex flex-col text-muted">
                    Lessons Created
                    <span className="font-bold text-primary text-xl">
                      {lessonData.length}
                    </span>
                  </p>
                  <p className="flex flex-col text-muted">
                    Lessons Saved
                    <span className="font-bold text-primary text-xl">
                      {favorites.length}
                    </span>
                  </p>
                </div>
              </div>

              <Link
                to="/dashboard/update-my-profile"
                className=" w-full lg:w-auto mx-auto"
              >
                <button className="btn btn-primary w-full lg:w-auto mx-auto">
                  Update Profile
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h4 className="text-2xl font-semibold text-primary mb-6 text-center">
            Lessons Created
          </h4>
          {lessonData.length === 0 ? (
            <p className="text-center text-muted">No lessons created yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {[...lessonData]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((lesson) => (
                  <div className="bg-white rounded-lg shadow-md">
                    <LessonCard key={lesson._id} lesson={lesson} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
