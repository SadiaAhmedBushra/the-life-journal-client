import React from "react";
import { IoHome } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import { MdDashboard } from "react-icons/md";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";


const UserDashboard = () => {
  return (
    <div>
      <li>
        <Link
          to="/dashboard"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Dashboard"
        >
          <IoHome className="text-primary size-6" />
          <span className="is-drawer-close:hidden">Dashboard Overview</span>
        </Link>
      </li>
      {/* Our dashboard links */}
      <li>
        <NavLink
          to="/dashboard/add-lesson"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="AddLesson"
        >
          <RiStickyNoteAddFill className="text-primary size-6" />

          <span className="is-drawer-close:hidden">Add Lesson </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my-lessons"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="MyLessons"
        >
          <MdDashboard className="text-primary size-6" />
          <span className="is-drawer-close:hidden">My Lessons </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my-profile"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="MyProfile"
        >
          <CgProfile className="text-primary size-6" />
          <span className="is-drawer-close:hidden">My Profile</span>
        </NavLink>
      </li>
    </div>
  );
};

export default UserDashboard;
