import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const experts = [
  {
    question: "How do I stay motivated during learning?",
    answer: "Set small goals, celebrate progress, and connect with a community for support.",
    expert: "Jane Doe",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    question: "Best practices for managing study time?",
    answer: "Use the Pomodoro technique, minimize distractions, and prioritize tasks.",
    expert: "John Smith",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    question: "How can I improve creative thinking?",
    answer: "Practice brainstorming regularly, expose yourself to new experiences, and reflect daily.",
    expert: "Emily Lee",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const ExpertQandASection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={fadeUpVariant}
      transition={{ duration: 0.7 }}
      className="max-w-6xl mx-auto p-8 mb-20 bg-[var(--bg-card)] dark:bg-gray-900 rounded-xl"
      aria-label="Expert Q&A Spotlight"
    >
      <h2 className="text-3xl font-bold mb-12 text-center text-[var(--text-primary)] dark:text-[var(--text-primary)]">
        Expert Q&A Spotlight
      </h2>

      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.3 },
          1024: { slidesPerView: 2 },
        }}
        className="overflow-visible"
      >
        {experts.map(({ question, answer, expert, photo }, idx) => (
          <SwiperSlide key={idx}>
            <motion.div
              className="bg-primary/15 dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between min-h-[260px]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <p className="italic mb-6 text-[var(--text-primary)] dark:text-gray-200 flex-grow">
                &ldquo;{question}&rdquo;
              </p>
              <p className="mb-8 text-[var(--text-muted)] dark:text-gray-400">{answer}</p>

              <div className="flex items-center gap-4">
                {photo ? (
                  <img
                    src={photo}
                    alt={expert}
                    className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
                    loading="lazy"
                  />
                ) : null}
                <div>
                  <p className="font-semibold text-indigo-700 dark:text-indigo-400">{expert}</p>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default ExpertQandASection;
