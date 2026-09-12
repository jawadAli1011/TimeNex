function AddEmpHeader({ handleSubmit, isEditMode }) {
  return (
    <div className="page-header">
      <div className="page-title">
        <h1 className="flex items-center  gap-2">
          <span>{isEditMode ? "Update Employee" : "Add New Employee"}</span>
        </h1>
        <p>
          {" "}
          {isEditMode
            ? "Update an existing employee's information"
            : "Register a new user profile and assign role & roster."}{" "}
        </p>
      </div>
      <div className="action-buttons">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          onClick={(e) => handleSubmit(e)}
          className="btn btn-primar"
          form="addEmployeeForm"
        >
          {isEditMode ? "Update Employee" : "Save Employee"}
        </button>
      </div>
    </div>
  );
}

export default AddEmpHeader;
