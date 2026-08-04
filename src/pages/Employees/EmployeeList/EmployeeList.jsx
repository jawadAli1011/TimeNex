import React from "react";
import "../../../assets/CSS/forms.css";
import EmployeeListHeader from "./components/EmployeeListHeader";
import ListFilter from "./components/ListFilter";
import EmployeesTable from "./components/EmployeesTable";
import Pagination from "./components/Pagination";

function EmployeeList() {
  return (
    <>
      <EmployeeListHeader />

      <div className="card">
        {/* <!-- Filter Bar --> */}

        <ListFilter />

        {/* <!-- Table --> */}

        <EmployeesTable />

        {/* <!-- Pagination --> */}

        <Pagination />
      </div>
    </>
  );
}

export default EmployeeList;
