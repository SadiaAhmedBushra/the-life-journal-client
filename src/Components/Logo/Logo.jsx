import React from 'react';
import { FaFeatherAlt } from "react-icons/fa";
import { Link } from 'react-router'; 

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 ">
      <FaFeatherAlt className="lg:text-3xl text-xl text-primary" />
      <h3 className="lg:text-2xl text-xs font-extrabold" style={{ color: "var(--text-primary)" }}
>The Life Journal</h3>
    </Link>
  );
};

export default Logo;
