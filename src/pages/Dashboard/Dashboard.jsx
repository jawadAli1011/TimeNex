import React from "react";
import { useState } from "react";
import DashboardHeader from "./components/DashboardHeader";
import AttendanceSummary from "./components/AttendanceSummary";
import LiveActivity from "./components/LiveActivity";
import AttendanceOverviewGraph from "./components/AttendanceOverviewGraph";
import DeptBreackdownChart from "./components/DeptBreackdownChart";

import { useEffect } from "react";
import { useDashboard } from "../../context/DashboardContext";
import PageLoader from "../../components/Loading";
import ReusableDialog from "../../components/Modals/ReusableDialog";

function Dashboard() {
  const { dashboardData, loading, error } = useDashboard();

  const present = dashboardData?.data?.drilldown_data.present || [];
  const late = dashboardData?.data?.drilldown_data.late || [];
  const totalEmployees = dashboardData?.data?.total_departmental_employees || 0;
  const onlineDevicesCount = dashboardData?.data?.online_devices_count || 0;
  const deptStats = dashboardData?.data?.deptStats || {};
  const deptStatsDetail = dashboardData?.data?.deptStatsDetail || {};
  const stats = dashboardData?.data?.stats || {};
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  // Open modal
  const handleOpen = (type) => {
    setSelectedType(type);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedType("");
  };

  if (loading) return <PageLoader />;

  return (
    // <!-- Header -->
    <div>
      <>
        <DashboardHeader
          totalEmployees={totalEmployees}
          onlineDevicesCount={onlineDevicesCount}
        />

        <AttendanceSummary
          stats={stats}
          totalEmployees={totalEmployees}
          handleOpen={handleOpen}
        />
        <ReusableDialog
          dashboardData={dashboardData}
          handleClose={handleClose}
          handleOpen={handleOpen}
          open={open}
          selectedType={selectedType}
        />
        <LiveActivity late={late} present={present} />

        <div className="charts-grid grid grid-cols-[3fr_7fr] gap-4 mb-4 ">
          <AttendanceOverviewGraph
            present={present}
            late={late}
            totalEmployees={totalEmployees}
          />
          <DeptBreackdownChart
            deptStatsDetail={deptStatsDetail}
            totalEmployees={totalEmployees}
          />
        </div>
      </>
    </div>
  );
}

export default Dashboard;
