import React from "react";
import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const articles = [
  {
    id: "boost-personal-growth",
    title: "5 Tips to Boost Your Personal Growth",
    description:
      "Discover practical strategies to enhance your personal development and unlock your full potential in everyday life.",
  },
  {
    id: "time-management-productivity",
    title: "Mastering Time Management for Productivity",
    description:
      "Learn effective time management techniques to help you stay focused, reduce stress, and get more done efficiently.",
  },
  {
    id: "building-stronger-relationships",
    title: "Building Stronger Relationships: A Guide",
    description:
      "Explore key communication skills and habits that foster meaningful and lasting relationships both personally and professionally.",
  },
];

const LatestArticlesSection = () => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate("/blog"); 
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-6 py-12 mb-20"
      aria-label="Latest Articles"
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-[var(--text-primary)] dark:text-[var(--text-primary)]">
        Latest Articles
      </h2>

      <div className="grid gap-8 sm:grid-cols-3">
        {articles.map(({ id, title, description }, idx) => (
          <motion.article
            key={idx}
            variants={fadeUpVariant}
            className="bg-secondary/5 dark:bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col justify-between cursor-default hover:shadow-xl transition-shadow duration-300"
            style={{ minHeight: "260px" }} 
          >
            <div>
              <FaBookOpen className="text-primary dark:text-primary w-8 h-8 mb-4" />
              <h3 className="font-semibold mb-3 text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                {title}
              </h3>
              <p className="text-muted dark:text-gray-400 text-sm">{description}</p>
            </div>
            <button
              onClick={handleReadMore}
              className="btn btn-link mt-4 self-start"
              aria-label={`Read more about ${title}`}
            >
              Read More
            </button>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};

export default LatestArticlesSection;




// import React from "react";
// import { motion } from "framer-motion";
// import { FaBookOpen } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const fadeUpVariant = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0 },
// };

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.25,
//     },
//   },
// };

// const articles = [
//   {
//     id: "boost-personal-growth",
//     title: "5 Tips to Boost Your Personal Growth",
//     description:
//       "Discover practical strategies to enhance your personal development and unlock your full potential in everyday life.",
//     link: "https://example.com/blog/boost-personal-growth",
//   },
//   {
//     id: "time-management-productivity",
//     title: "Mastering Time Management for Productivity",
//     description:
//       "Learn effective time management techniques to help you stay focused, reduce stress, and get more done efficiently.",
//     link: "https://example.com/blog/time-management-productivity",
//   },
//   {
//     id: "building-stronger-relationships",
//     title: "Building Stronger Relationships: A Guide",
//     description:
//       "Explore key communication skills and habits that foster meaningful and lasting relationships both personally and professionally.",
//     link: "https://example.com/blog/building-stronger-relationships",
//   },
// ];

// const LatestArticlesSection = () => {
//   const navigate = useNavigate();

//   const handleReadMore = (id) => {
//     navigate(`/blog/${id}`);
//   };

//   return (
//     <motion.section
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: false, amount: 0.3 }}
//       variants={containerVariants}
//       transition={{ duration: 0.6 }}
//       className="max-w-6xl mx-auto px-6 py-12 mb-20"
//       aria-label="Latest Articles"
//     >
//       <h2 className="text-3xl font-bold text-center mb-10 text-[var(--text-primary)] dark:text-[var(--text-primary)]">
//         Latest Articles
//       </h2>

//       <div className="grid gap-8 sm:grid-cols-3">
//         {articles.map(({ id, title, description, link }, idx) => (
//           <motion.article
//             key={idx}
//             variants={fadeUpVariant}
//             className="bg-[var(--bg-card)] dark:bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col justify-between cursor-default hover:shadow-xl transition-shadow duration-300"
//             style={{ minHeight: "260px" }} // equal size cards
//           >
//             <div>
//               <FaBookOpen className="text-primary dark:text-primary w-8 h-8 mb-4" />
//               <h3 className="font-semibold mb-3 text-[var(--text-primary)] dark:text-[var(--text-primary)]">
//                 {title}
//               </h3>
//               <p className="text-muted dark:text-gray-400 text-sm">
//                 {description}
//               </p>
//             </div>
//             <button
//               onClick={() => handleReadMore(id)}
//               className="btn btn-link mt-4 self-start"
//               aria-label={`Read more about ${title}`}
//             >
//               Read More
//             </button>
//           </motion.article>
//         ))}
//       </div>
//     </motion.section>
//   );
// };

// export default LatestArticlesSection;
