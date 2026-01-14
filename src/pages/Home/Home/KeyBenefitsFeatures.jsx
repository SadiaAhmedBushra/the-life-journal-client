import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaMobileAlt, FaGlobeAmericas } from "react-icons/fa";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const KeyBenefitsFeatures = () => {
  const benefits = [
    {
      icon: <FaUsers className="w-12 h-12 text-primary mx-auto mb-4" />,
      title: "Community Support",
      desc: "Join a vibrant community of learners to share knowledge and grow together.",
    },
    {
      icon: <FaMobileAlt className="w-12 h-12 text-primary mx-auto mb-4" />,
      title: "Learn Anywhere",
      desc: "Access your courses on desktop, tablet, or mobile anytime, anywhere.",
    },
    {
      icon: <FaGlobeAmericas className="w-12 h-12 text-primary mx-auto mb-4" />,
      title: "Global Reach",
      desc: "Join learners from around the world and expand your horizons.",
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={fadeUpVariant}
      transition={{ duration: 0.7 }}
      className="max-w-4xl mx-auto p-8 bg-[var(--bg-card)] rounded-xl shadow-lg mb-20 overflow-hidden"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-[var(--text-primary)]">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map(({ icon, title, desc }, idx) => (
          <motion.div
            key={idx}
            className="p-6 border border-[var(--border-color)] rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-default flex flex-col justify-between bg-primary/5"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ minHeight: "230px" }}
          >
            <div>
              {icon}
              <h3 className="text-xl font-semibold text-center mb-2 text-[var(--text-primary)]">
                {title}
              </h3>
              <p className="text-[var(--text-muted)] text-center">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default KeyBenefitsFeatures;
