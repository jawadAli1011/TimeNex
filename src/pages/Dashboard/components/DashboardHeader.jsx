import React from "react";

function DashboardHeader({ DATA }) {
  return (
    <div className="flex  justify-between  flex-wrap gap-3">
      <div className="section-head m-0">
        <h2>TimeNex Executive Summary</h2>
        <p>Real-time workforce attendance and operational status</p>
      </div>
      <div className="flex gap-3 items-center">
        <span className="badge b-amber">
          <span className="dot"></span> {DATA.total_employees} Total Workforce
        </span>
        <span className="badge b-green">
          <span className="dot"></span> {DATA.devices.online} Devices Online
        </span>
      </div>
    </div>
  );
}

export default DashboardHeader;
