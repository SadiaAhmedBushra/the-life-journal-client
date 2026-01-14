// import React from "react";
// import { FaFeatherAlt } from "react-icons/fa";
// import { Link } from "react-router";

// const Logo = ({ className }) => {
//   return (
//     <Link to="/" className={`flex items-center gap-2 flex-nowrap whitespace-nowrap ${className}`}>
//       <FaFeatherAlt className="lg:text-3xl text-xl text-primary" />
//       {/* <h3
//         className="lg:text-2xl text-sm font-extrabold"
//         style={{ color: "var(--text-primary)" }}
//       > */}
//         <h3
//   className="lg:text-2xl text-sm font-extrabold"
//   style={{ color: "var(--text-primary)", whiteSpace: "nowrap" }}
// >

//         The Life Journal
//       </h3>
//     </Link>
//   );
// };

// export default Logo;

import React from "react";
import { FaFeatherAlt } from "react-icons/fa";
import { Link } from "react-router";

const Logo = ({ className, compact }) => {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 flex-nowrap whitespace-nowrap ${className}`}
    >
      <FaFeatherAlt
        className={`${
          compact ? "text-2xl" : "lg:text-3xl text-xl"
        } text-primary`}
      />
      {!compact && (
        <h3
          className="lg:text-2xl text-sm font-extrabold"
          style={{ color: "var(--text-primary)", whiteSpace: "nowrap" }}
        >
          The Life Journal
        </h3>
      )}
    </Link>
  );
};

export default Logo;
