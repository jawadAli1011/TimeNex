import React from "react";

function DeptAndServiceInfo() {
  return (
    <div className="form-section">
      <div className="form-section-title">
        <span className="icon">🏢</span> Department & Service Information
      </div>
      <div className="grid-4">
        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="EMP-1001"
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <select className="form-control" required>
            <option value="">Select Dept...</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Sales</option>
            <option>Marketing</option>
            <option>Support</option>
          </select>
        </div>
        <div className="form-group">
          <label>Designation</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Senior Developer"
            required
          />
        </div>
        <div className="form-group">
          <label>Employment Type</label>
          <select className="form-control">
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>
        <div className="form-group">
          <label>Joining Date</label>
          <input type="date" className="form-control" required />
        </div>
        <div className="form-group">
          <label>Service Grade/Band</label>
          <select className="form-control">
            <option>Band A (Executive)</option>
            <option>Band B (Managerial)</option>
            <option>Band C (Professional)</option>
            <option>Band D (Operational)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Primary Manager</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search Manager..."
          />
        </div>
        <div className="form-group">
          <label>Base Salary</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter amount"
          />
        </div>
      </div>
    </div>
  );
}

export default DeptAndServiceInfo;
