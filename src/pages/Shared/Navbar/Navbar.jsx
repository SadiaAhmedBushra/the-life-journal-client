import React, { useState, useRef, useEffect } from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCrown } from "react-icons/fa";
import useRole from "../../../Hooks/useRole";
import { FaMoon, FaSun } from "react-icons/fa";

import {
  MdAdminPanelSettings,
  MdOutlineWorkspacePremium,
} from "react-icons/md";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const { user, logOut } = useAuth();
  const [role, isRoleLoading] = useRole();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("You logged out.");
        setUserMenuOpen(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
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
        <NavLink
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className={({ isActive }) =>
            isActive ? "text-secondary font-extrabold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/public-lessons"
          onClick={() => setMobileMenuOpen(false)}
          className={({ isActive }) =>
            isActive ? "text-secondary font-extrabold" : ""
          }
        >
          Lessons
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blog"
          onClick={() => setMobileMenuOpen(false)}
          className={({ isActive }) =>
            isActive ? "text-secondary font-extrabold" : ""
          }
        >
          Blogs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/terms-and-conditions"
          onClick={() => setMobileMenuOpen(false)}
          className={({ isActive }) =>
            isActive ? "text-secondary font-extrabold" : ""
          }
        >
          Terms & Conditions
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard/add-lesson"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-secondary font-extrabold" : ""
              }
            >
              Add Lesson
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-lessons"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-secondary font-extrabold" : ""
              }
            >
              My Lessons
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    // <div className="navbar bg-main w-full max-w-full px-4">
    // <div className="navbar bg-main w-full max-w-full px-4 fixed top-0 left-0 right-0 z-50 shadow-lg">
    <div className="navbar fixed top-0 left-0 right-0 z-50 px-4 bg-transparent backdrop-blur-md shadow-md">


      <div className="navbar-start flex-nowrap items-center">
        <div className="dropdown" ref={mobileMenuRef}>
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {mobileMenuOpen && (
            <ul className="bg-white menu menu-sm dropdown-content text-muted rounded-box z-50 mt-3 w-52 p-2 shadow-lg absolute">
              {links}
            </ul>
          )}
        </div>

        <Link
          to="/"
          className="ml-2 flex items-center whitespace-nowrap min-w-max lg:hidden"
        >
          <Logo compact className="hidden sm:block" />
        </Link>

        <Link
          to="/"
          className="ml-2 flex items-center whitespace-nowrap min-w-max hidden lg:flex"
        >
          <Logo />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex rounded-full border font-semibold border-indigo-300 color-text-primary">
        <ul className="menu menu-horizontal px-1 color-text-primary">
          {links}
        </ul>
      </div>

      <div className="navbar-end relative gap-1 lg:gap-2" ref={userMenuRef}>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle Dark Mode"
          className="ml-4 btn btn-ghost p-2 rounded-full"
        >
          {isDarkMode ? (
            <FaSun size={20} color="var(--color-primary)" />
          ) : (
            <FaMoon size={20} />
          )}
        </button>

        {user ? (
          <>
            {role === "freeUser" && (
              <Link to="/payment">
                <button className="btn btn-secondary flex items-center gap-1">
                  <FaCrown size={17} />
                  Upgrade
                </button>
              </Link>
            )}

            {role === "Premium" && (
              <div className="flex items-center gap-1 btn-primary text-white px-2 py-1 text-xs lg:px-4 lg:py-2 lg:text-base">
                <MdOutlineWorkspacePremium size={16} className="lg:hidden" />
                <MdOutlineWorkspacePremium
                  size={22}
                  className="hidden lg:block"
                />
                Premium
              </div>
            )}

            {role === "admin" && (
              <div className="flex items-center gap-1 btn-primary text-white px-2 py-1 text-xs lg:px-4 lg:py-2 lg:text-base">
                <MdAdminPanelSettings size={16} className="lg:hidden" />
                <MdAdminPanelSettings size={22} className="hidden lg:block" />
                Admin
              </div>
            )}

            <button
              className="rounded-full flex flex-shrink-0"
              onClick={() => setUserMenuOpen((prev) => !prev)}
              aria-label="User menu"
            >
              <img
                src={user.photoURL || "/default-profile.png"}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full object-cover"
                // className="w-12 h-12 rounded-full object-cover sm:w-8 sm:h-8"
              />
            </button>

            {userMenuOpen && (
              <ul className="absolute right-0 mt-29 w-48 bg-white rounded-lg z-50 shadow-lg">
                <li className="px-4 py-2 border-b border-[#818CF8] font-semibold ">
                  Username: {user.displayName}
                  <br />
                </li>
                <li>
                  <Link
                    to="/dashboard/my-profile"
                    className="block px-4 py-2 hover:bg-[#C5CAE9] text-text-primary"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-[#C5CAE9] text-text-primary"
                    onClick={() => setUserMenuOpen(false)}
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
              to="/auth/login"
              className="btn rounded-full border border-[#818CF8] px-5"
            >
              Log In
            </Link>
            <Link to="/auth/register" className="btn btn-primary mx-4">
              Register
            </Link>
          </>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Navbar;
