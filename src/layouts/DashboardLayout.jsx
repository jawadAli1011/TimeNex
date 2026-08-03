import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
// import Navbar from "../pages/Navbar/Navbar";

function DashboardLayout() {
  const location = useLocation();
  return (
    <div className="flex">
      <Sidebar />

      {/* <Navbar /> */}
      <main id="main" className="flex-1 overflow-y-auto">
        {/* <h1>
            DashboardLayout <span> {location.pathname} </span>
          </h1> */}
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
