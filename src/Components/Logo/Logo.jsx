import React from 'react';
import { FaFeatherAlt } from "react-icons/fa";
import { Link } from 'react-router'; 

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 ">
      <FaFeatherAlt className="text-3xl text-primary" />
      <h3 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)" }}
>The Life Journal</h3>
    </Link>
  );
};

export default Logo;
