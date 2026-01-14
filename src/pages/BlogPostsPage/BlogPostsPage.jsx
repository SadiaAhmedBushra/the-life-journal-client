import React from "react";
import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const articles = [
  {
    id: "boost-personal-growth",
    title: "5 Tips to Boost Your Personal Growth",
    content: (
      <>
        <p>Personal growth is an ongoing journey that empowers you to become your best self...</p>
        <ul className="list-disc list-inside mt-4 mb-6">
          <li><strong>Set Clear Goals:</strong> Define what you want to achieve and create actionable steps.</li>
          <li><strong>Embrace Learning:</strong> Continuously seek knowledge through books, courses, and experiences.</li>
          <li><strong>Practice Self-Reflection:</strong> Regularly evaluate your progress and adjust as needed.</li>
          <li><strong>Build Positive Habits:</strong> Develop daily routines that support your growth.</li>
          <li><strong>Stay Resilient:</strong> Accept failures as lessons and keep moving forward.</li>
        </ul>
      </>
    ),
  },
  {
    id: "time-management-productivity",
    title: "Mastering Time Management for Productivity",
    content: (
      <>
        <p>Time management is key to achieving more with less stress...</p>
        <ul className="list-disc list-inside mt-4 mb-6">
          <li><strong>Prioritize Tasks:</strong> Use methods like the Eisenhower matrix to focus on what truly matters.</li>
          <li><strong>Plan Your Day:</strong> Schedule tasks in blocks and avoid multitasking.</li>
          <li><strong>Set Deadlines:</strong> Give yourself realistic deadlines to maintain focus and urgency.</li>
          <li><strong>Eliminate Distractions:</strong> Create a workspace free from interruptions.</li>
          <li><strong>Take Breaks:</strong> Use techniques like Pomodoro to rest and recharge.</li>
        </ul>
      </>
    ),
  },
  {
    id: "building-stronger-relationships",
    title: "Building Stronger Relationships: A Guide",
    content: (
      <>
        <p>Strong relationships enrich our lives and support our well-being...</p>
        <ul className="list-disc list-inside mt-4 mb-6">
          <li><strong>Communicate Openly:</strong> Share your thoughts and listen actively.</li>
          <li><strong>Show Empathy:</strong> Understand and validate others’ feelings.</li>
          <li><strong>Be Trustworthy:</strong> Keep promises and be reliable.</li>
          <li><strong>Spend Quality Time:</strong> Prioritize shared experiences.</li>
          <li><strong>Resolve Conflicts Calmly:</strong> Approach disagreements with patience and respect.</li>
        </ul>
      </>
    ),
  },
];

const BlogPostsPage = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUpVariant}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-12 bg-[var(--bg-card)] dark:bg-gray-900 rounded-xl shadow-lg mb-20"
    >
      <h1 className="text-4xl font-bold mb-12 text-[var(--text-primary)] dark:text-[var(--text-primary)]">
        All Blog Posts
      </h1>

      {articles.map(({ id, title, content }) => (
        <article key={id} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)] dark:text-[var(--text-primary)]">
            {title}
          </h2>
          <div className="prose prose-lg dark:prose-invert">{content}</div>
        </article>
      ))}
    </motion.section>
  );
};

export default BlogPostsPage;
