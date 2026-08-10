import React from "react";

function DashboardHeader({ totalEmployees, onlineDevicesCount }) {
  return (
    <div className="flex  justify-between  flex-wrap gap-3">
      <div className="section-head m-0">
        <h2>TimeNex Executive Summary</h2>
        <p>Real-time workforce attendance and operational status</p>
      </div>
      <div className="flex gap-3 items-center">
        <span className="badge b-amber">
          <span className="dot"></span> {totalEmployees} Total Workforce
        </span>
        <span className="badge b-green">
          <span className="dot"></span> {onlineDevicesCount} Devices Online
        </span>
      </div>
    </div>
  );
}

export default DashboardHeader;
