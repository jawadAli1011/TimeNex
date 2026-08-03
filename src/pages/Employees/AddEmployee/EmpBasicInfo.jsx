import React from "react";

function EmpBasicInfo() {
  return (
    <div className="form-section">
      <div className="form-section-title">
        <span className="icon">👤</span> Basic Information
      </div>
      <div className="grid-4">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="John"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Doe"
            required
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="john.doe@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            className="form-control"
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" className="form-control" />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select className="form-control">
            <option value="">Select Gender...</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Marital Status</label>
          <select className="form-control">
            <option value="">Select Status...</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
          </select>
        </div>
        <div className="form-group">
          <label>Blood Group</label>
          <select className="form-control">
            <option value="">Select Type...</option>
            <option>O+</option>
            <option>O-</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default EmpBasicInfo;
