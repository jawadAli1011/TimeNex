import React from "react";

function TimeAndRoster() {
  return (
    <div className="form-section">
      <div className="form-section-title">
        <span className="icon">⏱️</span> Time & Roster Information
      </div>
      <div className="grid-4">
        <div className="form-group">
          <label>Roster Profile</label>
          <select className="form-control">
            <option>Standard 9-5 (Mon-Fri)</option>
            <option>Morning Shift (6AM-2PM)</option>
            <option>Evening Shift (2PM-10PM)</option>
            <option>Night Shift (10PM-6AM)</option>
            <option>Flexible / Remote</option>
          </select>
        </div>
        <div className="form-group">
          <label>Timezone</label>
          <select className="form-control">
            <option>UTC-08:00 (Pacific Time)</option>
            <option>UTC-05:00 (Eastern Time)</option>
            <option>UTC+00:00 (London)</option>
            <option>UTC+05:00 (Karachi)</option>
            <option>UTC+10:00 (Sydney)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Weekly Work Hours</label>
          <input type="number" className="form-control" placeholder="40" />
        </div>
        <div className="form-group">
          <label>Overtime Eligible</label>
          <select className="form-control">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="form-group">
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
        </div>
      </div>
    </div>
  );
}

export default TimeAndRoster;
