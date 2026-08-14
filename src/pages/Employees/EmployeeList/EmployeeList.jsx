import React, { useState } from "react";
import "../../../assets/CSS/forms.css";
import EmployeeListHeader from "./components/EmployeeListHeader";
import ListFilter from "./components/ListFilter";
import EmployeesTable from "./components/EmployeesTable";
import Pagination from "./components/Pagination";
import { useDashboard } from "../../../context/DashboardContext";
import { useEffect } from "react";
import PageLoader from "../../../components/PageLoader";

function EmployeeList() {
  const { dashboardData, error, fetchDashboard, loading } = useDashboard();

  useEffect(() => {
    if (!dashboardData) {
      fetchDashboard();
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All Department");
  const [desigFilter, setDesigFilter] = useState("All Designation");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const allRecords = Object.values(
    dashboardData?.data?.drilldown_data || {},
  ).flat();

  const uniqueEmployees = [
    ...new Map(allRecords.map((emp) => [emp.id, emp])).values(),
  ];

  const searchEmployee = (arr, term, dept, desig, stats) => {
    let result = arr;

    if (term !== "") {
      const lowerTerm = term.toLowerCase();
      result = result.filter(
        (emp) =>
          String(emp.id) === term || emp.name.toLowerCase().includes(lowerTerm),
      );
    }
    if (dept !== "All Department") {
      result = result.filter((emp) => emp.department === dept);
    }
    if (desig !== "All Designation") {
      result = result.filter((emp) => emp.designation === desig);
    }
    if (stats !== "All Status") {
      result = result.filter((emp) => emp.status === stats);
    }
    return result.length > 0 ? result : [];
  };

  const filteredEmp = searchEmployee(
    uniqueEmployees,
    searchTerm,
    deptFilter,
    desigFilter,
    statusFilter,
  );

  if (loading) return <PageLoader />;
  return (
    <>
      <EmployeeListHeader />

      <div className="card">
        {/* <!-- Filter Bar --> */}

        <ListFilter
          setSearchTerm={setSearchTerm}
          setDeptFilter={setDeptFilter}
          setDesigFilter={setDesigFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* <!-- Table --> */}

        <EmployeesTable filteredEmp={filteredEmp} />

        {/* <!-- Pagination --> */}

        <Pagination />
      </div>
    </>
  );
}

export default EmployeeList;
