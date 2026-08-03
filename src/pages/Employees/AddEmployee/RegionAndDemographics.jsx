import React from "react";

function RegionAndDemographics() {
  return (
    <div className="form-section">
      <div className="form-section-title">
        <span className="icon">📍</span> Region & Demographics
      </div>
      <div className="grid-4">
        <div className="form-group">
          <label>Country</label>
          <select className="form-control">
            <option value="">Select Country...</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Australia</option>
            <option>Pakistan</option>
          </select>
        </div>
        <div className="form-group">
          <label>State / Province</label>
          <input
            type="text"
            className="form-control"
            placeholder="State name"
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" className="form-control" placeholder="City name" />
        </div>
        <div className="form-group">
          <label>Zip / Postal Code</label>
          <input type="text" className="form-control" placeholder="Zip code" />
        </div>
        <div className="form-group col-span-2">
          <label>Residential Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Full street address"
          />
        </div>
        <div className="form-group">
          <label>Nationality</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nationality"
          />
        </div>
        <div className="form-group">
          <label>National ID / SSN</label>
          <input type="text" className="form-control" placeholder="ID Number" />
        </div>
      </div>
    </div>
  );
}

export default RegionAndDemographics;
