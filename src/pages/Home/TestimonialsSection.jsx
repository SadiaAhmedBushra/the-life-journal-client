import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    text: "This platform changed how I learn. The lessons are clear and inspiring.",
    author: "Bob Smith",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    text: "I love the community support here. It motivates me to keep growing.",
    author: "Alice Johnson",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    text: "The content is well organized and the instructors are amazing.",
    author: "Charlie Brown",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    text: "Great lessons and fantastic community!",
    author: "Diana Miller",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    text: "I improved a lot thanks to this platform.",
    author: "Eva Davis",
    img: "https://randomuser.me/api/portraits/women/56.jpg",
  },
];

const TestimonialsSection = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let start = 0;
    let rafId;

    const step = () => {
      start += 0.5; // speed, adjust if needed
      if (start >= scrollContainer.scrollWidth / 2) {
        start = 0;
      }
      scrollContainer.scrollLeft = start;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, []);

  // Duplicate testimonials for infinite scroll effect
  const items = [...testimonials, ...testimonials];

  return (
    <section
      className="max-w-6xl mx-auto px-6 py-12 bg-secondary/5 dark:bg-gray-900 rounded-xl shadow-lg mb-20"
      aria-label="Testimonials"
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-[var(--text-primary)] dark:text-[var(--text-primary)]">
        What Learners Say
      </h2>

      <div
        ref={scrollRef}
  className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
  style={{ scrollBehavior: "smooth" }}
      >
        {items.map(({ text, author, img }, idx) => (
          <motion.div
            key={idx}
            className="snap-start bg-secondary/5 dark:bg-gray-800 rounded-lg p-6 shadow-md flex-shrink-0 w-[280px] flex flex-col justify-between items-center"
            style={{ minHeight: "250px" }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={img}
              alt={`${author} avatar`}
              className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-primary dark:border-primary"
            />
            <FaQuoteLeft className="text-primary dark:text-primary w-8 h-8 mb-4" />
            <p className="mb-6 italic text-[var(--text-muted)] dark:text-gray-300 flex-grow text-center">
              "{text}"
            </p>
            <p className="font-semibold text-[var(--text-primary)] dark:text-primary text-center">
              — {author}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
