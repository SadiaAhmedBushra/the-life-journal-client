import React from "react";
import { Link, NavLink } from "react-router";

import { SiHomepage } from "react-icons/si";
import UserDashboard from "../UserDashboard/UserDashboard";

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

      <UserDashboard></UserDashboard>
    </div>
  );
};

export default AdminDashboard;
