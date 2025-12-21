import React from "react";
import { Link, NavLink } from "react-router";

import { SiHomepage } from "react-icons/si";
import UserDashboard from "../UserDashboard/UserDashboard";
import { MdAdminPanelSettings, MdManageAccounts } from "react-icons/md";
import { TbFileSettings } from "react-icons/tb";
import { FaFlag } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div>
      <li>
        <NavLink
          to="/dashboard/admin"
          className={({ isActive }) =>
            `is-drawer-close:tooltip is-drawer-close:tooltip-right
       ${isActive ? "text-secondary font-semibold" : ""}`
          }
          data-tip="Admin Homepage"
        >
          <SiHomepage className="text-primary size-5" />
          <span className="is-drawer-close:hidden">Admin Dashboard Home</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/admin/manage-users"
          className={({ isActive }) =>
            `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
              isActive ? "bg-primary/20 font-semibold" : ""
            }`
          }
          data-tip="Manage Users"
        >
          <MdManageAccounts className="text-primary size-7" />
          <span className="is-drawer-close:hidden">Manage Users</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/admin/manage-lessons"
          className={({ isActive }) =>
            `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
              isActive ? "bg-primary/20 font-semibold" : ""
            }`
          }
          data-tip="Manage Lessons"
        >
          <TbFileSettings className="text-primary size-7" />
          <span className="is-drawer-close:hidden">Manage Lessons</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/admin/reported-lessons"
          className={({ isActive }) =>
            `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
              isActive ? "bg-primary/20 font-semibold" : ""
            }`
          }
          data-tip="Reported Lessons"
        >
          <FaFlag className="text-primary size-6" />
          <span className="is-drawer-close:hidden">Reported Lessons</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/admin/admin-profile"
          className={({ isActive }) =>
            `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
              isActive ? "bg-primary/20 font-semibold" : ""
            }`
          }
          data-tip="Admin Profile"
        >
          <MdAdminPanelSettings className="text-primary size-7" />
          <span className="is-drawer-close:hidden">Admin Profile</span>
        </NavLink>
      </li>

      <UserDashboard></UserDashboard>
    </div>
  );
};

export default AdminDashboard;
