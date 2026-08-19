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
  // const { dashboardData, error, fetchDashboard, loading } = useDashboard();
  const [empData, setEmpData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All Department");
  const [desigFilter, setDesigFilter] = useState("All Designation");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // const [filters, setFilters] = useState({
  //   department_id: "",
  //   designation_id: "",
  //   name: "",
  //   id: "",
  //   cnic: "",
  //   father_name: "",
  //   file_number: "",
  //   gender: "",
  // });

  // console.log(filters);

  useEffect(() => {
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

  // const uniqueEmployees = [
  //   ...new Map(allRecords.map((emp) => [emp.id, emp])).values(),
  // ];
  // console.log(uniqueEmployees);

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
      result = result.filter((emp) => emp.departments.name === dept);
    }
    if (desig !== "All Designation") {
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

        <EmployeesTable filteredEmp={filteredEmp} loading={loading} />

        {/* <!-- Pagination --> */}

        <Pagination />
      </div>
    </>
  );
}

export default EmployeeList;
