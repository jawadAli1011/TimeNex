import React from "react";
import DashboardHeader from "./components/DashboardHeader";
import AttendanceSummary from "./components/AttendanceSummary";
import LiveActivity from "./components/LiveActivity";
import AttendanceOverviewGraph from "./components/AttendanceOverviewGraph";
import DeptBreackdownChart from "./components/DeptBreackdownChart";
import Data from "../../Data";

function Dashboard() {
  const DATA = Data();
  return (
    // <!-- Header -->
    <div>
      <DashboardHeader DATA={DATA} />

      <AttendanceSummary DATA={DATA} />

      <LiveActivity DATA={DATA} />

      <div className="charts-grid grid grid-cols-[3fr_7fr] gap-4 mb-4">
        <AttendanceOverviewGraph DATA={DATA} />

        <DeptBreackdownChart DATA={DATA} />
      </div>
    </div>
  );
}

export default Dashboard;
