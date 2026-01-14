import React from "react";
import { motion } from "framer-motion";
import { FaClock, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const challenges = [
  {
    title: "Speed Reading Challenge",
    duration: "7 Days",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    points: ["Daily Reading Tasks", "Progress Tracking", "Focus Techniques"],
    description:
      "Improve reading speed and comprehension through guided daily exercises.",
  },
  {
    title: "Creative Writing Sprint",
    duration: "10 Days",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    points: ["Prompt-Based Writing", "Creativity Boost", "Daily Practice"],
    description:
      "Enhance creativity with short writing sessions designed to build consistency.",
  },
  {
  title: "Growth Mindset Reset",
  duration: "14 Days",
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  points: [
    "Daily Mindset Exercises",
    "Confidence Building",
    "Positive Habit Formation",
  ],
  description:
    "Rewire limiting beliefs and build a strong growth mindset through short, practical daily lessons.",
},
{
  title: "Healthy Relationships Blueprint",
  duration: "10 Days",
  image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
  points: [
    "Communication Skills",
    "Emotional Awareness",
    "Boundary Setting",
  ],
  description:
    "Learn how to build healthier personal and professional relationships with clarity and empathy.",
},

];

const JoinLearningChallengesSection = () => {
    const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/auth/register");
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.7 }}
      className=" rounded-2xl p-10 sm:p-12 max-w-5xl mx-auto text-center overflow-hidden"
    >
      <h2 className="text-3xl font-extrabold mb-6">
        Join Our Weekly Learning Challenges
      </h2>

      <p className="mb-10 max-w-2xl mx-auto text-lg font-medium opacity-90">
        Challenge yourself with structured learning paths designed to build
        skills, focus, and consistency.
      </p>

      {/* Challenge Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
        {challenges.map((challenge, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 220 }}
            className="bg-secondary/5 dark:bg-gray-900 text-left rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            {/* Image */}
            <img
              src={challenge.image}
              alt={challenge.title}
              className="h-44 w-full object-cover"
              loading="lazy"
            />

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-primary  mb-2">
                {challenge.title}
              </h3>

              <div className="flex items-center gap-2 text-sm mb-4">
                <FaClock />
                <span>{challenge.duration}</span>
              </div>

              <p className="mb-4 flex-1">
                {challenge.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {challenge.points.map((point, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-primary/15 text-primary"
                  >
                    <FaCheckCircle className="text-xs" />
                    {point}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={handleRegisterClick}
        className="btn-primary font-bold rounded-lg px-10 py-3 hover:brightness-110 transition"
      >
        Register Now to Join
      </button>
    </motion.section>
  );
};

export default JoinLearningChallengesSection;
