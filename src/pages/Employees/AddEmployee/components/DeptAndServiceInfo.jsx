import React, { useEffect, useState } from "react";
import { getUnusedId } from "../../../../api/emp_api";
import CustomDropdown from "../../../../utills/ResuableDropdown";
import { departments } from "../../../../api/dept_api";
import { designations } from "../../../../api/desig_api";

function DeptAndServiceInfo() {
  const [newId, setNewId] = useState([]);
  const [dept, setDept] = useState([]);
  const [desig, setDesig] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedDesig, setSelectedDesig] = useState(null);

  const fetchUnUsedId = async () => {
    try {
      const response = await getUnusedId();
      setDept(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDept = async () => {
    try {
      const response = await departments();
      setNewId(response?.data?.data);
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

  useEffect(() => {
    fetchDept();
    fetchDesig();
    fetchUnUsedId();
    const handleRefresh = () => {
      fetchUnUsedId();
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
          <label>Employee ID</label>
          <CustomDropdown
            options={newId}
            value={selectedId}
            onChange={setSelectedId}
            placeholder="Suggested IDs"
            optionbtn="Use"
            itemName="MissingID"
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <CustomDropdown
            options={dept}
            value={selectedDept}
            onChange={setSelectedDept}
            placeholder="Select Dept..."
            itemName="name"
          />
        </div>
        <div className="form-group">
          <label>Designation</label>
          <CustomDropdown
            options={desig}
            value={selectedDesig}
            onChange={setSelectedDesig}
            placeholder="Select Designation"
            itemName="title"
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
