import React from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaSmile, FaChalkboardTeacher, FaStar } from "react-icons/fa";

const statsData = [
  {
    icon: <FaBookOpen className="w-12 h-12 mx-auto mb-3 text-primary" />,
    number: "5000+",
    label: "Lessons Published",
    colorClass: "text-primary",
  },
  {
    icon: <FaSmile className="w-12 h-12 mx-auto mb-3 text-secondary" />,
    number: "12000+",
    label: "Happy Learners",
    colorClass: "text-secondary",
  },
  {
    icon: <FaStar className="w-12 h-12 mx-auto mb-3 text-info" />,
    number: "98%",
    label: "Satisfaction Rate",
    colorClass: "text-info",
  },
];

const StatisticsSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.6 }}
      className="bg-primary/10 dark:bg-primary/20 rounded-xl p-12 max-w-6xl mx-auto mb-20"
    >
      <h2 className="text-3xl font-bold mb-10 text-center text-[var(--text-primary)] dark:text-[var(--text-primary)]">
        By the Numbers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
        {statsData.map(({ icon, number, label, colorClass }, idx) => (
          <motion.div
            key={idx}
            className="bg-[var(--bg-card)] dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center shadow-md cursor-default hover:shadow-lg transition-shadow duration-300"
            style={{ minHeight: "180px" }} // Equal size cards
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
            <p className={`text-4xl font-extrabold mb-2 ${colorClass} dark:${colorClass}`}>
              {number}
            </p>
            <p className="text-muted dark:text-gray-400 text-center">{label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default StatisticsSection;
