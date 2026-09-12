import React, { useEffect, useState } from "react";
import { getTimeCategories } from "../../../../api/timeCategory_api";
import { getRegions } from "../../../../api/dropdowns_api";
import { getZones } from "../../../../api/zone_api";
import { getBranches } from "../../../../api/branches_api";

function TimeAndRoster({ formData, handleChange, setFormData }) {
  const [timeCategory, setTimeCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [zone, setZone] = useState([]);
  const [branch, setBranch] = useState([]);

  const fetchTimeCategories = async () => {
    try {
      const response = await getTimeCategories();
      setTimeCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRegion = async () => {
    try {
      const response = await getRegions();
      setRegion(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchZone = async () => {
    try {
      const response = await getZones();
      setZone(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBranch = async () => {
    try {
      const response = await getBranches();
      setBranch(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeaveChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      leaves: prev.leaves.map((leave, i) =>
        i === index
          ? {
              ...leave,
              [field]: value,
            }
          : leave,
      ),
    }));
  };

  useEffect(() => {
    fetchBranch();
    fetchZone();
    fetchRegion();
    fetchTimeCategories();
  }, []);
  return (
    <div className="form-section">
      <div className="form-section-title">
        <span className="icon">⏱️</span> Time & Roster Information
      </div>
      <div className="grid-4">
        <div className="form-group">
          <label>
            Region <span className="text-red-500 ml-0.75">*</span>
          </label>
          <select
            className="form-control"
            name="region_id"
            required
            value={formData.region_id || ""}
            onChange={handleChange}
          >
            <option value="">Select Region</option>
            {region.map((item) => (
              <option key={item.region_id} value={item.region_id}>
                {item.region_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>
            Zone <span className="text-red-500 ml-0.75">*</span>
          </label>
          <select
            className="form-control"
            name="zone_id"
            required
            value={formData.zone_id || ""}
            onChange={handleChange}
          >
            <option>Select Zone</option>
            {formData.region_id &&
              zone.map((item) => (
                <option key={item.zone_id} value={item.zone_id || ""}>
                  {" "}
                  {item.zone_name}{" "}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label>
            Branch <span className="text-red-500 ml-0.75">*</span>
          </label>
          <select
            className="form-control"
            name="branch_id"
            required
            value={formData.branch_id || ""}
            onChange={handleChange}
          >
            <option value="">Select Branch</option>
            {formData.zone_id &&
              branch.map((item) => (
                <option key={item.branch_id} value={item.branch_id || ""}>
                  {" "}
                  {item.branch_name}{" "}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label>
            Time Category <span className="text-red-500 ml-0.75">*</span>
          </label>
          <select
            className="form-control"
            name="tcat_id"
            required
            value={formData.tcat_id || ""}
            onChange={handleChange}
          >
            <option value="">Select Time Category</option>
            {timeCategory.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>
            Leave Type <span className="text-red-500 ml-0.75">*</span>
          </label>
          <select
            className="form-control"
            name="leave_type"
            required
            value={"Casual Leave" || ""}
            // onChange={handleChange}
          >
            <option value="Casual Leave">Casual Leave</option>
          </select>
        </div>
        <div className="form-group">
          <label>
            Number Of Leaves <span className="text-red-500 ml-0.75">*</span>
          </label>
          {formData.leaves.map((leave, index) => (
            <input
              type="number"
              value={leave.total_leaves || ""}
              className="form-control"
              required
              onChange={(e) =>
                handleLeaveChange(index, "total_leaves", e.target.value)
              }
              placeholder="Enter Number of Leaves"
            />
          ))}
        </div>
        <div className="form-group">
          <label>Weekly Work Hours</label>
          <input type="number" className="form-control" placeholder="40" />
        </div>
        <div className="form-group">
          <label>
            Overtime Allowed? <span className="text-red-500 ml-0.75">*</span>
          </label>
          <select
            className="form-control"
            name="overtime_allowed"
            value={formData.overtime_allowed || ""}
            onChange={handleChange}
            required
          >
            <option>Not Allowed</option>
            <option>Allowed</option>
          </select>
        </div>
        {/* <div className="form-group">
          <label>Primary Work Location</label>
          <select className="form-control">
            <option>Headquarters (NY)</option>
            <option>Branch Office (London)</option>
            <option>Remote Working</option>
          </select>
        </div>
        <div className="form-group">
          <label>Grace Period (Mins)</label>
          <input type="number" className="form-control" placeholder="15" />
        </div> */}
      </div>
    </div>
  );
}

export default TimeAndRoster;
