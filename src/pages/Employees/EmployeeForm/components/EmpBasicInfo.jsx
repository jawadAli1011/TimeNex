import React from "react";

function EmpBasicInfo({ handleChange, formData }) {
  const bloodGroup = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const maritalStatus = ["Single", "Married", "Divorced"];
  return (
    <div className="form-section">
      <div className="form-section-title">
        <span className="icon">👤</span> Basic Information
      </div>
      <div className="grid-4">
        <div className="form-group">
          <label>
            Name <span className="text-red-500 ml-0.75">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            className="form-control"
            placeholder="John"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Father Name</label>
          <input
            type="text"
            name="father_name"
            value={formData.father_name || ""}
            className="form-control"
            placeholder="Doe"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            className="form-control"
            placeholder="john.doe@example.com"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password || ""}
            className="form-control"
            placeholder="Enter Your Password"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Primary Mobile Number</label>
          <input
            type="tel"
            name="mobile_number"
            value={formData.mobile_number || ""}
            className="form-control"
            placeholder="Mobile Number"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Secondary Mobile Number</label>
          <input
            type="tel"
            name="mob_number_2"
            value={formData.mob_number_2 || ""}
            className="form-control"
            placeholder="Mobile Number"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>LandLine Number</label>
          <input
            type="tel"
            name="land_line_number"
            value={formData.land_line_number || ""}
            className="form-control"
            placeholder="LandLine Number"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob || ""}
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            Gender <span className="text-red-500 ml-0.75">*</span>
          </label>
          <select
            className="form-control"
            name="gender"
            value={formData.gender || ""}
            required
            onChange={handleChange}
          >
            <option value="">Select Gender...</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Marital Status</label>
          <select
            className="form-control"
            name="marital_status"
            // value={formData.marital_status}
            onChange={handleChange}
          >
            <option value="">Select Status...</option>
            {maritalStatus.map((ms) => (
              <option key={ms}>{ms}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Blood Group</label>
          <select
            className="form-control"
            name="blood_group"
            onChange={handleChange}
          >
            <option value="">Select Type...</option>
            {bloodGroup.map((bg) => (
              <option key={bg}>{bg}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default EmpBasicInfo;
