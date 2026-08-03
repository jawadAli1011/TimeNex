import React from "react";
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddEmpHeader() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="page-header">
      <div className="page-title">
        <h1 onClick={handleBack} className="flex items-center  gap-2">
          <span>
            <FaBackward />
          </span>
          <span>Add New Employee</span>
        </h1>
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
