import React from "react";
import { IoHome } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import { MdDashboard } from "react-icons/md";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { LuFileHeart } from "react-icons/lu";

const UserDashboard = () => {
  return (
    <div>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `is-drawer-close:tooltip is-drawer-close:tooltip-right
       ${isActive ? "text-secondary font-semibold" : ""}`
          }
          data-tip="Dashboard"
        >
          <IoHome className="text-primary size-6" />
          <span className="is-drawer-close:hidden">Dashboard Overview</span>
        </NavLink>
      </li>

      {/* Our dashboard links */}
      <li>
        <NavLink
          to="/dashboard/add-lesson"
          className={({ isActive }) =>
            `is-drawer-close:tooltip is-drawer-close:tooltip-right
     ${isActive ? " bg-primary/20 font-semibold" : ""}`
          }
          data-tip="Add Lesson"
        >
          <RiStickyNoteAddFill className="text-primary size-6" />

          <span className="is-drawer-close:hidden">Add Lesson </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my-lessons"
          className={({ isActive }) =>
            `is-drawer-close:tooltip is-drawer-close:tooltip-right
     ${isActive ? "bg-primary/20 font-semibold" : ""}`
          }
          data-tip="My Lessons"
        >
          <MdDashboard className="text-primary size-6" />
          <span className="is-drawer-close:hidden">My Lessons </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my-favorites"
          className={({ isActive }) =>
            `is-drawer-close:tooltip is-drawer-close:tooltip-right
     ${isActive ? "bg-primary/20 font-semibold" : ""}`
          }
          data-tip="My Favorites"
        >
          <LuFileHeart className="text-primary size-6" />
          <span className="is-drawer-close:hidden">My Favorites </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my-profile"
          className={({ isActive }) =>
            `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
              isActive ? "bg-primary/20 font-semibold" : ""
            }`
          }
          data-tip="My Profile"
        >
          <CgProfile className="text-primary size-6" />
          <span className="is-drawer-close:hidden">My Profile</span>
        </NavLink>
      </li>
    </div>
  );
};

export default UserDashboard;
