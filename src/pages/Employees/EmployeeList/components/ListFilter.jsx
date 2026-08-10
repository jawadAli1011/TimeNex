import React, { useState } from "react";
import { useDashboard } from "../../../../context/DashboardContext";

function ListFilter({
  setSearchTerm,
  setDeptFilter,
  setDesigFilter,
  setStatusFilter,
}) {
  const { dashboardData, error, loading } = useDashboard();

  const allDept = [
    "All Department",
    ...Object.keys(dashboardData?.data?.deptStats || {}),
  ];

  const allDesig = [
    "All Designation",
    ...Object.keys(dashboardData?.data?.desigStats || {}),
  ];

  const allStatus = [
    "All Status",
    ...Object.keys(dashboardData?.data?.stats || {}),
  ];

  const [dept, setDept] = useState("All Department");
  // const [empId, setEmpId] = useState("");
  const [term, setTerm] = useState("");
  const [role, setRole] = useState("All Designation");
  const [stats, setStats] = useState("All Status");

  const filterHandler = () => {
    setSearchTerm(term);
    setDeptFilter(dept);
    setDesigFilter(role);
    setStatusFilter(stats);
  };

  if (loading) return <div> Loading... {loading}</div>;
  if (error) return <div> Error {error}</div>;

  return (
    <div className="flex gap-3 mb-5 flex-wrap" style={{ marginBottom: "20px" }}>
      <div className="flex-1 min-w-50">
        <input
          onChange={(e) => setTerm(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Search by name, email or ID..."
        />
      </div>
      <div className="w-40 ">
        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="form-control"
        >
          {allDept.map((dept) => (
            <option value={dept} key={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <div className="w-40">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-control"
        >
          {allDesig.map((role) => (
            <option key={role}> {role} </option>
          ))}
        </select>
      </div>
      <div className="w-35  p-2">
        <select
          value={stats}
          onChange={(e) => setStats(e.target.value)}
          className="form-control"
        >
          {allStatus.map((stats) => (
            <option key={stats}>{stats}</option>
          ))}
        </select>
      </div>
      <button onClick={() => filterHandler()} className="btn btn-secondary">
        Filter
      </button>
    </div>
  );
}

export default ListFilter;
