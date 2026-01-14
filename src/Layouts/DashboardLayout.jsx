import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import LoadingSpinner from "../../src/Components/LoadingSpinner";
import useRole from "../Hooks/useRole";
import UserDashboard from "../Components/UserDashboard/UserDashboard";
import AdminDashboard from "../Components/AdminDashboard/AdminDashboard";
import { Link, NavLink } from "react-router";

const DashboardLayout = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner></LoadingSpinner>{" "}
      </div>
    );
  }

  return (
    <div className="max-w-11/12 mx-auto pt-16">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <nav className="navbar w-full">
{/*                       <nav className="navbar w-full bg-base-300">
 */}
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>

            <Navbar></Navbar>
          </nav>
          <Outlet />
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {/* <div
            className="
      bg-base-200 min-h-full
      transition-all duration-300 ease-in-out 
      w-64 mr-5
      is-drawer-close:w-14 is-drawer-open:w-64
    "
          > */}
           <div
            className="
     min-h-full
      transition-all duration-300 ease-in-out 
      w-64 mr-5
      is-drawer-close:w-14 is-drawer-open:w-64
    "
          >
            <ul className="menu p-4 w-full">
              {(role === "freeUser" || role === "Premium") && <UserDashboard />}

              {role === "admin" && <AdminDashboard />}
            </ul>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
