import React from "react";
import { motion } from "framer-motion";
import { FiClock, FiCheckCircle, FiUsers } from "react-icons/fi";

const uniqueData = [
  {
    icon: <FiClock className="w-14 h-14 text-teal-600 mx-auto mb-5" />,
    title: "Wisdom Over Time",
    desc: "Life lessons drawn from real stories and timeless wisdom.",
  },
  {
    icon: <FiCheckCircle className="w-14 h-14 text-cyan-600 mx-auto mb-5" />,
    title: "Growth Mindset",
    desc: "Encouraging reflection and progress in every stage of life.",
  },
  {
    icon: <FiUsers className="w-14 h-14 text-blue-600 mx-auto mb-5" />,
    title: "Connected Community",
    desc: "A supportive space to share experiences and grow together.",
  },
];

const WhatMakesUsUnique = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.7 }}
      className="max-w-5xl mx-auto py-12 px-6 bg-[var(--bg-card)] rounded-xl shadow-lg mb-20 relative overflow-x-hidden"
    >
      <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-primary)]">
        What Makes Us Unique
      </h2>

      {/* Timeline line */}
      <div className="hidden sm:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 opacity-30 transform -translate-y-1/2"></div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-8 relative z-10">
        {uniqueData.map(({ icon, title, desc }, idx) => (
          <motion.div
            key={idx}
            className="bg-[var(--bg-card)] p-6 rounded-2xl shadow-md w-full sm:w-1/3 text-center flex flex-col"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
            <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">{title}</h3>
            <p className="text-[var(--text-muted)] flex-grow">{desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default WhatMakesUsUnique;
