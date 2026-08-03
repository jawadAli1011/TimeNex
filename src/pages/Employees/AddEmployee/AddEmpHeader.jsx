import React from "react";

function AddEmpHeader() {
  return (
    <div className="page-header">
      <div className="page-title">
        <h1>Add New Employee</h1>
        <p>Register a new user profile and assign role & roster.</p>
      </div>
      <div className="action-buttons">
        <button
          type="button"
          className="btn btn-secondary"
          // onclick="window.history.back()"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primar" form="addEmployeeForm">
          Save Employee
        </button>
      </div>
    </div>
  );
}

export default AddEmpHeader;
