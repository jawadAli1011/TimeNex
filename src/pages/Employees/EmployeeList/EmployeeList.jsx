import React from "react";
import "../../../CSS/forms.css";
import EmployeeListHeader from "./EmployeeListHeader";
import ListFilter from "./ListFilter";
import EmployeesTable from "./EmployeesTable";
import Pagination from "./Pagination";

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
