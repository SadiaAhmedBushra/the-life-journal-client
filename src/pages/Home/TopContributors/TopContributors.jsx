import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { FaUserAlt } from "react-icons/fa";

const TopContributors = () => {
  const axiosSecure = useAxiosSecure();

const { data, isLoading, error } = useQuery({
  queryKey: ["top-contributors-week"],
  queryFn: async () => {
    const res = await axiosSecure.get("/analytics/top-contributors-week");
    return res.data;
  },
});

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Failed to load contributors</p>;

  if (!data || data.length === 0)
    return <p className="text-muted text-center">No contributions yet this week.</p>;

  return (
    <div className="max-w-6xl mx-auto my-10 p-10">

      <h1 className="text-3xl font-bold mb-6 text-primary text-center">Our Top Contributors</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {data.map(({ userEmail, name, lessonsCount }) => (
        <div
          key={userEmail}
          className="p-4 rounded shadow flex items-center gap-4"
        >
          <FaUserAlt className="text-primary text-4xl" />
          <div>
            <p className="font-semibold text-lg">{name || userEmail}</p>
            <p className="text-sm text-muted">{lessonsCount} lessons added</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default TopContributors;
