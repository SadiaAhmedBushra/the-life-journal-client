import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner";
import purpleBg from "../../assets/purple.jpg";
import tealBg from "../../assets/tealBg.jpg";

import { FaFlag, FaUsers } from "react-icons/fa";
import { PiUserCircleGear } from "react-icons/pi";
import { MdPublic } from "react-icons/md";
import { IoToday } from "react-icons/io5";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/analytics");
      return res.data;
    },
  });

  const {
    data: lessonGrowthData,
    isLoading: isLessonLoading,
    isError: isLessonError,
  } = useQuery({
    queryKey: ["lesson-growth"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/analytics/lesson-growth");
      return res.data.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: userGrowthData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["user-growth"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/analytics/user-growth");
      return res.data.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="text-red-500 p-4">
        {error?.response?.data?.message || "Failed to load admin analytics"}
      </div>
    );
  }

  const formattedLessonGrowth =
    lessonGrowthData?.map(({ _id, count }) => ({
      date: _id,
      count,
    })) || [];

  const formattedUserGrowth =
    userGrowthData?.map(({ _id, count }) => ({
      date: _id,
      count,
    })) || [];

  return (
    <div className="max-w-6xl mx-auto my-10">
      <h2 className="text-3xl font-bold my-10 text-center text-primary">
        Admin Dashboard Overview
      </h2>

      <div className="w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div
          className="py-10 px-5 rounded-lg flex flex-col gap-2 items-center"
          style={{ backgroundImage: `url(${purpleBg})` }}
        >
          <FaUsers size={50} className="text-primary" />
          <h4 className="text-sm text-accent">Total Users</h4>
          <p className="text-2xl text-muted font-bold">
            {data?.totalUsers ?? 0}
          </p>
        </div>

        <div
          className="py-10 px-5 rounded-lg flex flex-col gap-2 items-center"
          style={{ backgroundImage: `url(${purpleBg})` }}
        >
          <PiUserCircleGear size={50} className="text-primary" />

          <h4 className="text-sm text-accent">Most Active Contributor</h4>
          <p className="text-lg lg:text-2xl text-muted font-bold">
            {data?.topContributor ?? "N/A"}
          </p>
        </div>
      </div>

      <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div
          className="py-10 px-5 rounded-lg flex flex-col gap-2 items-center"
          style={{ backgroundImage: `url(${tealBg})` }}
        >
          <MdPublic size={50} className="text-secondary" />

          <h4 className="text-sm text-accent">Public Lessons</h4>
          <p className="text-2xl text-muted font-bold">
            {data?.publicLessons ?? 0}
          </p>
        </div>

        <div
          className="py-10 px-5 rounded-lg flex flex-col gap-2 items-center"
          style={{ backgroundImage: `url(${tealBg})` }}
        >
          <FaFlag size={50} className="text-secondary" />
          <h4 className="text-sm text-accent">Flagged Lessons</h4>
          <p className="text-2xl text-muted font-bold">
            {data?.flaggedLessons ?? 0}
          </p>
        </div>

        <div
          className="py-10 px-5 rounded-lg flex flex-col gap-2 items-center"
          style={{ backgroundImage: `url(${tealBg})` }}
        >
          <IoToday size={50} className="text-secondary" />
          <h4 className="text-sm text-accent">Today's New Lessons</h4>
          <p className="text-2xl text-muted font-bold">
            {data?.todayLessons ?? 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-primary/5 rounded-lg p-4 shadow">
          <h3 className="font-bold text-xl text-secondary mb-2">Lesson Growth</h3>
          {isLessonLoading ? (
            <LoadingSpinner />
          ) : isLessonError ? (
            <p className="text-red-500">Failed to load lesson growth data.</p>
          ) : formattedLessonGrowth.length === 0 ? (
            <p className="text-muted">No lesson growth data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={formattedLessonGrowth}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#14B8A6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-secondary/5 rounded-lg p-4 shadow">
          <h3 className="font-bold text-xl text-primary mb-2">User Growth</h3>
          {isUserLoading ? (
            <LoadingSpinner />
          ) : isUserError ? (
            <p className="text-red-500">Failed to load user growth data.</p>
          ) : formattedUserGrowth.length === 0 ? (
            <p className="text-muted">No user growth data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={formattedUserGrowth}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  // type="monotone"
                  dataKey="count"
                  stroke="#898bf0"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
