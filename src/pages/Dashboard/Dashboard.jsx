import React from "react";
import DashboardHeader from "./DashboardHeader";
import AttendanceSummary from "./AttendanceSummary";
import LiveActivity from "./LiveActivity";
import AttendanceOverviewGraph from "./AttendanceOverviewGraph";
import DeptBreackdownChart from "./DeptBreackdownChart";

const DATA = {
  stats: {
    present: 8,
    absent: 16,
    late: 2,
    on_leave: 1,
    short_leave: 6,
    offday: 8,
    holidays: 4,
  },
  total_employees: 24,
  devices: { online: 2, offline: 1 },
  employees: [
    {
      id: "76668",
      name: "Syed Fasih Ul Abbas Rizvi",
      dept: "Area Pak Secretariat Deptt",
      desig: "Foreman",
      status: "present",
    },
    {
      id: "76669",
      name: "Syed Fasih Ul Abbas Rizvi",
      dept: "Area Pak Secretariat Deptt",
      desig: "Foreman",
      status: "present",
    },
    {
      id: "76670",
      name: "Syed Ali Raza Rizvi",
      dept: "Area Pak Secretariat Deptt",
      desig: "Maintenance Clerk",
      status: "absent",
    },
    {
      id: "76671",
      name: "Rashid Ali",
      dept: "Maintenance Deptt",
      desig: "Maintenance Clerk",
      status: "present",
    },
    {
      id: "76672",
      name: "Zakir Ali",
      dept: "Maintenance Deptt",
      desig: "Head Painter",
      status: "present",
    },
    {
      id: "76673",
      name: "M.Arshad Khan",
      dept: "Maintenance Deptt",
      desig: "Head Carpenter",
      status: "absent",
    },
    {
      id: "76674",
      name: "Waseem Ahmed",
      dept: "Area Pak Secretariat Deptt",
      desig: "Fitter",
      status: "late",
    },
    {
      id: "76675",
      name: "Abdul Ghafar",
      dept: "Area Pak Secretariat Deptt",
      desig: "Painter",
      status: "absent",
    },
    {
      id: "76676",
      name: "Shahrukh",
      dept: "Area Pak Secretariat Deptt",
      desig: "Painter",
      status: "absent",
    },
    {
      id: "76677",
      name: "Muhammad Zarar",
      dept: "Construction Deptt",
      desig: "Mason",
      status: "present",
    },
    {
      id: "76678",
      name: "Shahid",
      dept: "Construction Deptt",
      desig: "Helper",
      status: "absent",
    },
    {
      id: "76679",
      name: "Abdul Raees Khan",
      dept: "Construction Deptt",
      desig: "Helper (P.M Pkg)",
      status: "absent",
    },
    {
      id: "76680",
      name: "Muhammad Amir",
      dept: "Construction Deptt",
      desig: "Helper (P.M Pkg)",
      status: "leave",
    },
    {
      id: "76681",
      name: "Faisal Rehman",
      dept: "Area Pak Secretariat Deptt",
      desig: "Helper (P.M Pkg)",
      status: "absent",
    },
    {
      id: "76682",
      name: "Davis",
      dept: "Area Pak Secretariat Deptt",
      desig: "Helper",
      status: "absent",
    },
    {
      id: "76683",
      name: "Rehan Ahmed",
      dept: "Machinery Deptt",
      desig: "Assistant Machanic",
      status: "present",
    },
    {
      id: "76684",
      name: "Muhammad Arif Hussain",
      dept: "Machinery Deptt",
      desig: "Wire Man",
      status: "absent",
    },
    {
      id: "76685",
      name: "Shafat Hussain",
      dept: "Machinery Deptt",
      desig: "Pump Machanic",
      status: "late",
    },
    {
      id: "76686",
      name: "Khalil Ahmed",
      dept: "Area Pak Secretariat Deptt",
      desig: "Helper",
      status: "present",
    },
    {
      id: "76687",
      name: "Kashif",
      dept: "Area Pak Secretariat Deptt",
      desig: "Helper",
      status: "present",
    },
    {
      id: "76688",
      name: "Nasir Hussain",
      dept: "Area Pak Secretariat Deptt",
      desig: "Helper",
      status: "absent",
    },
    {
      id: "76689",
      name: "Muhammad Javed",
      dept: "Area Pak Secretariat Deptt",
      desig: "Helper",
      status: "absent",
    },
    {
      id: "76690",
      name: "Shahzaib Ahmed",
      dept: "Area Pak Secretariat Deptt",
      desig: "Helper",
      status: "absent",
    },
    {
      id: "76691",
      name: "Ashfaq Shah",
      dept: "Area Pak Secretariat Deptt",
      desig: "Helper (P.M Package)",
      status: "absent",
    },
    {
      id: "9991064",
      name: "Enquiry Office Staff",
      dept: "Enquiry Office",
      desig: "Enquiry Staff",
      status: "absent",
    },
  ],
};

function Dashboard() {
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
