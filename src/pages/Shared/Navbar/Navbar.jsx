import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user, logOut } = useAuth();
  console.log("User object:", user);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
    setDropdown(false);
          toast.success("Logged Out Successfully.");
    
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const links = (
    <>
    <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/add-lesson">Add Lesson</NavLink>
      </li>

       {
        user && <> 
         <li>
        <NavLink to="/dashboard/my-lessons">My Lessons</NavLink>
      </li>
      </>
      }
    
    </>
  );
  return (
    <div className="navbar bg-main ">
      <div className="navbar-start ">
        <div className="dropdown">
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-main rounded-box z-1 mt-3 w-52 p-2"
          >
            {links}
          </ul>
        </div>
        <a className="text-xl">
          <Logo></Logo>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex rounded-full border font-semibold border-indigo-300 color-text-primary"
>
        <ul className="menu menu-horizontal px-1 color-text-primary"
>{links}</ul>
      </div>
      <div className="navbar-end relative" ref={dropdownRef}>
        {user ? (
          <>
            <button
              className=" rounded-full"
              onClick={() => setDropdown((prev) => !prev)}
            >
              <img
                src={user.photoURL || "/default-profile.png"}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full object-cover"
              />
            </button>

            {dropdown && (
              <ul className="absolute right-0 mt-42 w-48 bg-white rounded-lg z-10">
                <li className="px-4 py-2 border-b border-[#818CF8] font-semibold ">
                  Username: {user.displayName}
                  <br />
                </li>

                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-[#C5CAE9] text-text-primary"
                    onClick={() => setDropdown(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-[#C5CAE9] text-text-primary"
                    onClick={() => setDropdown(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 font-semibold"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            )}
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn rounded-full border border-[#818CF8] px-5"
            >
              Log In
            </Link>
            <Link to="/register" className="btn btn-primary mx-4">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
