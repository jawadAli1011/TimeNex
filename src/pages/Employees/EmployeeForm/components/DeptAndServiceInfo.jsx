import React, { useEffect, useState } from "react";
import { getUnusedId } from "../../../../api/emp_api";
import CustomDropdown from "../../../../utills/ResuableDropdown";
import {
  // departments,
  designations,
  getRoles,
} from "../../../../api/dropdowns_api";
import { departments } from "../../../../api/departments_api";

function DeptAndServiceInfo({ formData, setFormData }) {
  const [newId, setNewId] = useState([]);
  const [dept, setDept] = useState([]);
  const [desig, setDesig] = useState([]);
  const [role, setRole] = useState([]);

  const handleChange = (name, value) => {
    // console.log(name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchUnUsedId = async () => {
    try {
      const response = await getUnusedId();
      setNewId(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDept = async () => {
    try {
      const response = await departments();
      setDept(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDesig = async () => {
    try {
      const response = await designations();
      setDesig(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRole = async () => {
    try {
      const response = await getRoles();
      setRole(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRole();
    fetchDept();
    fetchDesig();
    fetchUnUsedId();
    const handleRefresh = () => {
      fetchUnUsedId();
      fetchRole();
      fetchDept();
      fetchDesig();
    };
    window.addEventListener("page-refresh", handleRefresh);
    return () => {
      window.removeEventListener("page-refresh", handleRefresh);
    };
  }, []);

  return (
    <div className="form-section">
      <div className="form-section-title">
        <span className="icon">🏢</span> Department & Service Information
      </div>
      <div className="grid-4">
        <div className="form-group">
          <label>
            Employee ID <span className="text-red-500 ml-0.75">*</span>
          </label>
          <CustomDropdown
            options={newId}
            value={formData.id || ""}
            required
            onChange={(item) => {
              handleChange("id", item.MissingID);
            }}
            placeholder="Suggested IDs"
            optionbtn="Use"
            itemName="MissingID"
          />
        </div>
        <div className="form-group">
          <label>
            Department <span className="text-red-500 ml-0.75">*</span>
          </label>
          <CustomDropdown
            options={dept}
            value={formData?.departments?.name || ""}
            required
            onChange={(item) => {
              handleChange("department_id", item.id);
            }}
            placeholder="Select Dept..."
            itemName="name"
          />
        </div>
        <div className="form-group">
          <label>
            Designation <span className="text-red-500 ml-0.75">*</span>
          </label>
          <CustomDropdown
            options={desig}
            value={formData?.designations?.title || ""}
            required
            onChange={(item) => {
              handleChange("designation_id", item.id);
            }}
            placeholder="Select Designation"
            itemName="title"
          />
        </div>
        <div className="form-group">
          <label>
            Role <span className="text-red-500 ml-0.75">*</span>
          </label>
          <CustomDropdown
            options={role}
            value={formData.role?.title || ""}
            required
            onChange={(item) => {
              handleChange("role_id", item.id);
            }}
            placeholder="Select Designation"
            itemName="title"
          />
        </div>
        <div className="form-group">
          <label>Personal File #</label>
          <input
            type="text"
            name="file_number"
            value={formData.file_number || ""}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className="form-control"
            placeholder="Personal File Number"
          />
        </div>
        <div className="form-group">
          <label>Employment Type</label>
          <select
            className="form-control"
            onClick={(e) => handleChange(e.target.name, e.target.value)}
            name="employment_type"
          >
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>
        <div className="form-group">
          <label>
            Joining Date <span className="text-red-500 ml-0.75">*</span>
          </label>
          <input
            type="date"
            required
            value={formData.reg_date || ""}
            name="reg_date"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Service Scale</label>
          <input
            type="text"
            name="bps"
            value={formData.bps || ""}
            className="form-control"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="Service/Pay Scale"
          />
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
            type="number"
            name="fixed_salary"
            value={formData.fixed_salary || ""}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className="form-control"
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label>Per Hour Rate</label>
          <input
            type="number"
            name="salary_hour_rate"
            value={formData.salary_hour_rate || ""}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className="form-control"
            placeholder="Enter amount"
          />
        </div>
      </div>
    </div>
  );
}

export default DeptAndServiceInfo;
