// import React from "react";
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import useAuth from "../../Hooks/useAuth";

// const LessonDetails = () => {
//   const { user } = useAuth();
//   const { id } = useParams(); // Get lesson ID from URL
//   const axiosSecure = useAxiosSecure();

//   // Fetch single lesson by ID
//   const { data: lesson = {}, isLoading, error } = useQuery({
//     queryKey: ["lesson-details", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/lessons/${id}`);
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="text-center py-20">
//         <span className="loading loading-dots loading-lg"></span>
//       </div>
//     );
//   }

//   if (error) {
//     return <p className="text-center text-red-500">Error loading lesson details.</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
//       <h1 className="text-3xl font-bold mb-4 text-indigo-600">
//         {lesson.lessonTitle}
//       </h1>

//       <p className="text-gray-700 mb-2">
//         <strong>Privacy:</strong> {lesson.privacy}
//       </p>

//       <p className="text-gray-700 mb-2">
//         <strong>Access Level:</strong> {lesson.accessLevel}
//       </p>
//       <p className="text-gray-700 mb-2">
//         <strong>Category:</strong> {lesson.category}
//       </p>
//       <p className="text-gray-700 mb-2">
//         <strong>Emotional Tone:</strong> {lesson.emotionalTone}
//       </p>

//       <p className="text-gray-700 mb-2">
//         <strong>Created At:</strong> {lesson.createdAt}
//       </p>

//       <p className="text-gray-700 mb-2">
//         <strong>Likes:</strong> {lesson.likesCount}
//       </p>

//       <p className="text-gray-700 mb-2">
//         <strong>Favorites:</strong> {lesson.favoritesCount}
//       </p>

//       <p className="text-gray-700 mb-2">
//         <strong>Views:</strong> {lesson.views}
//       </p>

//       <div className="mt-6 p-4 bg-gray-100 rounded-lg">
//         <h2 className="text-xl font-semibold mb-2">Lesson Description</h2>
//         <p className="text-gray-800">{lesson.description}</p>
//       </div>
//     </div>
//   );
// };

// export default LessonDetails;


import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaLock, FaUsers, FaTag, FaSmile, FaCalendarAlt, FaEye, FaHeart, FaStar } from "react-icons/fa";
import LoadingSpinner from "../../Components/LoadingSpinner";

const LessonDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: lesson = {}, isLoading, error } = useQuery({
    queryKey: ["lesson-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  if (error) {
    return (
      <p
        className="text-center text-lg font-semibold mt-16"
        style={{ color: "var(--color-secondary)" }}
      >
        Unable to load lesson details. Please try again later.
      </p>
    );
  }

  // Helper for bars with max value, scale to 100%
  const Bar = ({ value, max = 100, color }) => {
    const percentage = Math.min((value / max) * 100, 100);
    const bgColor = color === "primary" ? "var(--color-primary)" : "var(--color-secondary)";
    return (
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mt-1">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: bgColor }}
        />
      </div>
    );
  };

  return (
    <main
      className="max-w-5xl mx-auto rounded-xl my-10 p-10 relative overflow-hidden font-sans border"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--color-primary)",
        boxShadow: "0 12px 30px rgba(137,139,240,0.25)",
      }}
    >
      {/* Background soft circles */}
      <div
        className="absolute top-0 right-0 rounded-full opacity-20 pointer-events-none"
        style={{
          width: 192,
          height: 192,
          background: `radial-gradient(circle at top right, var(--color-primary), transparent)`,
          transform: "translate(25%, -25%)",
          zIndex: 0,
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 rounded-full opacity-15 pointer-events-none"
        style={{
          width: 288,
          height: 288,
          background: `radial-gradient(circle at bottom left, var(--color-secondary), transparent)`,
          transform: "translate(-15%, 15%)",
          zIndex: 0,
        }}
      ></div>

      <header className="mb-12 relative z-10">
        <h1
          className="text-5xl font-extrabold tracking-tight drop-shadow-sm flex items-center gap-4"
          style={{ color: "var(--color-primary)" }}
        >
          <FaStar className="text-4xl" />
          {lesson.lessonTitle}
        </h1>
        <p
          className="mt-2 text-lg font-medium max-w-xl"
          style={{ color: "var(--color-secondary)" }}
        >
          Insightful personal growth, shared with passion.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10 text-base">
        <InfoCard
          label="Privacy"
          value={lesson.privacy}
          icon={<FaLock />}
          titleColor="primary"
          textColor="secondary"
        />
        <InfoCard
          label="Access Level"
          value={lesson.accessLevel}
          icon={<FaUsers />}
          titleColor="primary"
          textColor="secondary"
        />
        <InfoCard
          label="Category"
          value={lesson.category}
          icon={<FaTag />}
          titleColor="primary"
          textColor="secondary"
        />
        <InfoCard
          label="Emotional Tone"
          value={lesson.emotionalTone}
          icon={<FaSmile />}
          titleColor="primary"
          textColor="secondary"
        />
        <InfoCard
          label="Created At"
          value={new Date(lesson.createdAt).toLocaleDateString()}
          icon={<FaCalendarAlt />}
          titleColor="primary"
          textColor="secondary"
        />
        <InfoCard
          label="Views"
          value={lesson.views}
          icon={<FaEye />}
          titleColor="primary"
          textColor="secondary"
        />
      </section>

      <article
        className="mt-14 rounded-2xl p-8 border text-lg leading-relaxed whitespace-pre-wrap relative z-10"
        style={{
          backgroundColor: "var(--color-primary)",
          borderColor: "var(--color-secondary)",
          color: "white",
          boxShadow: "0 8px 24px rgba(20,184,166,0.3)",
        }}
      >
        <h2
          className="text-3xl font-semibold mb-6 border-b-4 pb-2 inline-block flex items-center gap-3"
          style={{ borderColor: "var(--color-secondary)" }}
        >
          <FaStar />
          Lesson Description
        </h2>
        <p>{lesson.description}</p>
      </article>

      <section className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <StatPill label="Likes" value={lesson.likesCount} color="primary" icon={<FaHeart />} />
        <StatPill label="Favorites" value={lesson.favoritesCount} color="secondary" icon={<FaStar />} />
        <StatBar
          label="Views"
          value={lesson.views}
          max={lesson.views > 100 ? lesson.views : 100}
          color="primary"
          icon={<FaEye />}
        />
      </section>
    </main>
  );
};

const InfoCard = ({ label, value, icon, titleColor, textColor }) => (
  <div
    className="bg-white rounded-lg shadow-md border p-5 flex flex-col justify-center items-center gap-2"
    style={{
      borderColor: "var(--color-secondary)",
      boxShadow: "0 4px 12px rgba(20,184,166,0.1)",
      color: `var(--color-${textColor})`,
    }}
  >
    <div
      className="text-2xl mb-1"
      style={{ color: `var(--color-${titleColor})` }}
      aria-hidden="true"
    >
      {icon}
    </div>
    <p
      className="text-sm font-semibold uppercase tracking-wide"
      style={{ color: `var(--color-${titleColor})` }}
    >
      {label}
    </p>
    <p className="text-lg font-bold">{value || "-"}</p>
  </div>
);

const StatPill = ({ label, value, color, icon }) => {
  const colors = {
    primary: {
      bg: "rgba(137,139,240,0.2)",
      text: "var(--color-primary)",
      shadow: "0 6px 16px rgba(137,139,240,0.4)",
    },
    secondary: {
      bg: "rgba(20,184,166,0.2)",
      text: "var(--color-secondary)",
      shadow: "0 6px 16px rgba(20,184,166,0.4)",
    },
  };

  const style = {
    backgroundColor: colors[color].bg,
    color: colors[color].text,
    boxShadow: colors[color].shadow,
  };

  return (
    <div
      className="flex items-center gap-3 px-8 py-3 rounded-full font-semibold text-xl cursor-default select-none transition-transform transform hover:scale-105"
      style={style}
      title={`${label}: ${value}`}
    >
      <span className="text-2xl">{icon}</span>
      <span>
        {label}: <span className="font-extrabold">{value ?? 0}</span>
      </span>
    </div>
  );
};

const StatBar = ({ label, value, max, color, icon }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const bgColor = color === "primary" ? "var(--color-primary)" : "var(--color-secondary)";

  return (
    <div className="flex flex-col gap-2" title={`${label}: ${value}`}>
      <div className="flex items-center gap-3 text-lg font-semibold" style={{ color: bgColor }}>
        <span className="text-2xl">{icon}</span>
        <span>{label}</span>
        <span className="ml-auto font-bold">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="h-4 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: bgColor }}
        />
      </div>
    </div>
  );
};

export default LessonDetails;
