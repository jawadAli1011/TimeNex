import React from "react";
import GetColor from "../../utills/GetColor";
import GitIcon from "../../utills/GitIcon";

function AttendanceSummary({ DATA }) {
  const total_emp = DATA.total_employees;

  const formatTitle = (key) => {
    return key.replace(/_/g, " ");
  };

  function pct(val, total) {
    return total > 0 ? ((val / total) * 100).toFixed(1) : "0";
  }

  return (
    // <!-- Stat Grid -->
    <div className="stat-grid">
      {Object.entries(DATA.stats).map(([key, value]) => (
        <div key={key} className="stat-card">
          <div className="stat-title"> {formatTitle(key)} </div>
          <div className="stat-val" style={{ color: GetColor(key) }}>
            {" "}
            {value}{" "}
          </div>
          <div className="stat-sub">
            <span style={{ color: GetColor(key) }}>{GitIcon(key)}</span>
            {pct(value, total_emp)} % of total
          </div>
        </div>
      ))}
    </div>
  );
}

export default AttendanceSummary;
