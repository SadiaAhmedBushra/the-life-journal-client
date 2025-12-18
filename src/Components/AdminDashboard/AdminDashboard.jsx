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
        <Link
          to="/dashboard/admin"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="AdminHomepage"
        >
          <SiHomepage className="text-primary size-5" />
          <span className="is-drawer-close:hidden">Admin Dashboard Home</span>
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/admin/manage-users"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="ManageUsers"
        >
          <MdManageAccounts className="text-primary size-7" />
          <span className="is-drawer-close:hidden">Manage Users</span>
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/admin/manage-lessons"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="ManageLessons"
        >
          <TbFileSettings className="text-primary size-7" />
          <span className="is-drawer-close:hidden">Manage Lessons</span>
        </Link>
      </li>
        <li>
        <Link
          to="/dashboard/admin/reported-lessons"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="ReportedLessons"
        >
          <FaFlag className="text-primary size-6" />
          <span className="is-drawer-close:hidden">Reported Lessons</span>
        </Link>
      </li>
       <li>
        <Link
          to="/dashboard/admin/admin-profile"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="AdminProfile"
        >
          <MdAdminPanelSettings className="text-primary size-7" />
          <span className="is-drawer-close:hidden">Admin Profile</span>
        </Link>
      </li>
      

      <UserDashboard></UserDashboard>
    </div>
  );
};

export default AdminDashboard;
