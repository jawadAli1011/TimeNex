import React from "react";
import { Link } from "react-router-dom";

function EmployeeListHeader() {
  return (
    <div className="page-header">
      <div className="page-title">
        <h1>Employee Directory</h1>
        <p>Manage all staff members, their roles, and status.</p>
      </div>
      <div className="action-buttons">
        <button className="btn btn-secondary">
          <span>📥</span> Export CSV
        </button>
        <Link className="btn btn-primar " to="/employees/add">
          + Add Employee
        </Link>
      </div>
    </div>
  );
}

export default EmployeeListHeader;
