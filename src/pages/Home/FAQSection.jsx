import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const faqItems = [
  {
    question: "How do I sign up?",
    answer: "Just click Register and fill out the form.",
  },
  {
    question: "Are lessons free?",
    answer: "We offer both free and premium lessons.",
  },
  {
    question: "Can I upgrade my plan?",
    answer: "Yes, premium access unlocks extra content and features.",
  },
  {
    question: "How can I reset my password?",
    answer: "Use the 'Forgot Password' link on the login page to reset it easily.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={fadeUpVariant}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-6 py-12 mb-20"
      aria-label="Frequently Asked Questions"
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-[var(--text-primary)] dark:text-[var(--text-primary)]">
        Frequently Asked Questions
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {faqItems.map(({ question, answer }, idx) => (
          <details
            key={idx}
            className="group rounded-lg border border-gray-300 dark:border-gray-700 p-5 bg-primary/5 dark:bg-gray-900 min-h-[110px] flex flex-col justify-between cursor-pointer"
            onClick={() => toggleOpen(idx)}
            open={openIndex === idx}
          >
            <summary className="flex items-center justify-between font-semibold text-[var(--text-primary)] dark:text-[var(--text-primary)] list-none">
              {question}
              <FaChevronDown
                className={`ml-4 transition-transform duration-300 ${
                  openIndex === idx ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
              />
            </summary>
            <p className="mt-3 text-[var(--text-muted)] dark:text-gray-400 leading-relaxed">
              {answer}
            </p>
          </details>
        ))}
      </div>

    </motion.section>
  );
};

export default FAQSection;
