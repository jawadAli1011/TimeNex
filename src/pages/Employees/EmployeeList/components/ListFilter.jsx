import React, { useContext, useEffect, useState } from "react";
import { departments } from "../../../../api/dept_api";
import { designations } from "../../../../api/desig_api";

function ListFilter({
  setSearchTerm,
  setDeptFilter,
  setDesigFilter,
  setStatusFilter,
}) {
  const [fetchedDept, setFetchedDept] = useState([]);
  const [fetchedDesig, setFetchedDesig] = useState([]);
  const [dept, setDept] = useState("All Department");
  const [term, setTerm] = useState("");
  const [role, setRole] = useState("All Designation");
  const [stats, setStats] = useState("All Status");
  const allDept = ["All Department", ...fetchedDept];
  const allDesig = ["All Designation", ...fetchedDesig];
  // const allStatus = [
  //   "All Status",
  //   ...Object.keys(dashboardData?.data?.stats || {}),
  // ];

  useEffect(() => {
    const fetchDept = async () => {
      try {
        const response = await departments();
        setFetchedDept(response?.data?.data?.map((dept) => dept.name));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDesig = async () => {
      try {
        const response = await designations();
        setFetchedDesig(response?.data?.data?.map((desig) => desig.title));
      } catch (error) {
        console.log(error);
      }
    };

    fetchDept();
    fetchDesig();

    const handleRefresh = () => {
      fetchDept();
      fetchDesig();
    };
    window.addEventListener("page-refresh", handleRefresh);
    return () => {
      window.removeEventListener("page-refresh", handleRefresh);
    };
  }, []);

  const filterHandler = () => {
    setSearchTerm(term);
    setDeptFilter(dept);
    setDesigFilter(role);
    setStatusFilter(stats);
  };

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
      {/* <div className="w-35  p-2">
        <select
          value={stats}
          onChange={(e) => setStats(e.target.value)}
          className="form-control"
        >
          {allStatus.map((stats) => (
            <option key={stats}>{stats}</option>
          ))}
        </select>
      </div> */}
      <button onClick={() => filterHandler()} className="btn btn-secondary">
        Filter
      </button>
    </div>
  );
}

export default ListFilter;
