import React from "react";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaTasks,
  FaBrain,
  FaPaintBrush,
  FaHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Personal Growth",
    icon: <FaUserGraduate className="w-6 h-6 inline mr-2" />,
    colorClass: "bg-primary/10 text-primary hover:bg-primary/20",
  },
  {
    name: "Career",
    icon: <FaTasks className="w-6 h-6 inline mr-2" />,
    colorClass: "bg-secondary/10 text-secondary hover:bg-secondary/20",
  },
  {
    name: "Mindset",
    icon: <FaBrain className="w-6 h-6 inline mr-2" />,
    colorClass: "bg-accent/10 text-accent hover:bg-accent/20",
  },
  {
    name: "Mistakes Learned",
    icon: <FaPaintBrush className="w-6 h-6 inline mr-2" />,
    colorClass: "bg-info/10 text-info hover:bg-info/20",
  },
  {
    name: "Relationships",
    icon: <FaHeart className="w-6 h-6 inline mr-2" />,
    colorClass: "bg-info/10 text-info hover:bg-info/20",
  },
];

const CategoriesSection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/lessons?category=${encodeURIComponent(category)}`);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-12 bg-[var(--bg-card)] rounded-xl shadow-lg mb-20"
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-[var(--text-primary)]">
        Explore Categories
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map(({ name, icon, colorClass }) => (
          <button
            key={name}
            onClick={() => handleCategoryClick(name)}
            className={`flex items-center justify-center rounded-lg px-8 py-3 font-semibold cursor-pointer transition-colors duration-300 min-w-[180px] text-center ${colorClass} bg-[var(--bg-card)] border border-transparent dark:border-gray-700`}
            type="button"
            aria-label={`Go to ${name} lessons`}
          >
            {icon}
            {name}
          </button>
        ))}
      </div>
    </motion.section>
  );
};

export default CategoriesSection;
