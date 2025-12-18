import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { motion, useAnimation, useInView } from "framer-motion";

const cardVariants = {
  offscreen: {
    y: 300,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    rotate: -5,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const ContributorCard = ({ userEmail, name, lessonsCount, author, totalLessons }) => {
  const ref = React.useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.8 });

  React.useEffect(() => {
    if (inView) {
      controls.start("onscreen");
    } else {
      controls.start("offscreen");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className="bg-primary/10 rounded-xl shadow-lg p-8 flex flex-col items-center text-center
                 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      initial="offscreen"
      animate={controls}
      variants={cardVariants}
      style={{ originX: 0.5, originY: 0.5 }}
    >
      <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 shadow-lg">
        <img
          src={author.photoURL || "/default-profile.png"}
          alt={author.name || name || userEmail}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-2xl font-semibold mb-1 text-muted">
        {author.name || name || userEmail}
      </h2>
      <p className="text-primary font-medium text-lg mb-2">
        {lessonsCount ?? 0} lessons added this week
      </p>
      <p className="text-secondary text-sm">
        Total lessons created: {totalLessons}
      </p>
    </motion.div>
  );
};

const TopContributors = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: contributors,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["top-contributors-week"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/top-contributors-week");
      return res.data;
    },
  });

  const { data: lessonsCountByAuthor = {}, isLoading: totalCountLoading } =
    useQuery({
      queryKey: [
        "lessons-count-by-author",
        contributors?.map((c) => c.userEmail),
      ],
      queryFn: async () => {
        if (!contributors || contributors.length === 0) return {};

        const emails = contributors.map((c) => c.userEmail);
        const results = await Promise.all(
          emails.map(async (email) => {
            const res = await axiosSecure.get(`/lessons/count/${email}`);
            return { email, count: res.data.lessonsCreated || 0 };
          })
        );

        return results.reduce((acc, cur) => {
          acc[cur.email] = cur.count;
          return acc;
        }, {});
      },
      enabled: !!contributors && contributors.length > 0,
    });

  const { data: authorsInfo = {}, isLoading: authorsLoading } = useQuery({
    queryKey: ["authors-info", contributors?.map((c) => c.userEmail)],
    queryFn: async () => {
      if (!contributors || contributors.length === 0) return {};

      const emails = contributors.map((c) => c.userEmail);
      const results = await Promise.all(
        emails.map(async (email) => {
          const res = await axiosSecure.get(`/users/${email}`);
          return { email, data: res.data };
        })
      );

      return results.reduce((acc, cur) => {
        acc[cur.email] = cur.data;
        return acc;
      }, {});
    },
    enabled: !!contributors && contributors.length > 0,
  });

  if (isLoading || authorsLoading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">Failed to load contributors</p>
    );

  if (!Array.isArray(contributors) || contributors.length === 0)
    return (
      <p className="text-muted text-center mt-10">No contributions yet this week.</p>
    );

  return (
    <div className="max-w-6xl mx-auto my-16 p-6">
      <h1 className="text-4xl font-extrabold mb-10 text-primary text-center tracking-wide">
        Our Top Contributors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {contributors.map(({ userEmail, name, lessonsCount }) => {
          const author = authorsInfo[userEmail] || {};
          const totalLessons = totalCountLoading
            ? "Loading..."
            : lessonsCountByAuthor[userEmail] ?? 0;

          return (
            <ContributorCard
              key={userEmail}
              userEmail={userEmail}
              name={name}
              lessonsCount={lessonsCount}
              author={author}
              totalLessons={totalLessons}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopContributors;
