import React from "react";
import { Link, NavLink } from "react-router";

import { SiHomepage } from "react-icons/si";
import UserDashboard from "../UserDashboard/UserDashboard";
import { MdManageAccounts } from "react-icons/md";

const AdminDashboard = () => {
  return (
    <div>
      <li>
        <Link
          to="/dashboard/admin"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="AdminHomepage"
        >
          <SiHomepage className="text-primary size-6" />
          <span className="is-drawer-close:hidden">Admin Dashboard Home</span>
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/admin/manage-users"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="ManageUsers"
        >
          <MdManageAccounts className="text-primary size-6" />
          <span className="is-drawer-close:hidden">Manage Users</span>
        </Link>
      </li>
      

      <UserDashboard></UserDashboard>
    </div>
  );
};

export default AdminDashboard;
