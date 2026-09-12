import React, { useState } from "react";
import "../../../assets/CSS/forms.css";
import EmployeeListHeader from "./components/EmployeeListHeader";
import ListFilter from "./components/ListFilter";
import EmployeesTable from "./components/EmployeesTable";
import Pagination from "./components/Pagination";
import { useDashboard } from "../../../context/DashboardContext";
import { useEffect } from "react";
import PageLoader from "../../../components/Loading";
import { getEmpData } from "../../../api/emp_api";

function EmployeeList() {
  const [empData, setEmpData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [desigFilter, setDesigFilter] = useState("All Designations");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const response = await getEmpData();
      setEmpData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployee();
    const handleRefresh = () => {
      fetchEmployee();
    };
    window.addEventListener("page-refresh", handleRefresh);
    return () => {
      window.removeEventListener("page-refresh", handleRefresh);
    };
  }, []);

  const allRecords = Object.values(empData?.data || {}).flat();

  const searchEmployee = (arr, term, dept, desig, stats) => {
    let result = arr;

    if (term !== "") {
      const lowerTerm = term.toLowerCase();
      result = result.filter(
        (emp) =>
          String(emp.id) === term || emp.name.toLowerCase().includes(lowerTerm),
      );
    }
    if (dept !== "All Departments") {
      result = result.filter((emp) => emp.departments.name === dept);
    }
    if (desig !== "All Designations") {
      result = result.filter((emp) => emp.designations?.title === desig);
    }
    if (stats !== "All Status") {
      result = result.filter((emp) => emp.status === stats);
    }
    return result.length > 0 ? result : [];
  };

  const filteredEmp = searchEmployee(
    // uniqueEmployees,
    allRecords,
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

        <EmployeesTable
          filteredEmp={filteredEmp}
          loading={loading}
          fetchEmployee={fetchEmployee}
        />

        {/* <!-- Pagination --> */}

        <Pagination />
      </div>
    </>
  );
}

export default EmployeeList;
