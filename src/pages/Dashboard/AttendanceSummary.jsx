import React from "react";

function AttendanceSummary({ DATA }) {
  const total_emp = DATA.total_employees;

  const formatTitle = (key) => {
    return key.replace(/_/g, " ");
  };

  const getColor = (key) => {
    const colors = {
      present: "#16a34a",
      absent: "#dc2626",
      late: "#d97706",
      on_leave: "#2563eb",
      short_leave: "#1e293b",
      offday: "#2563eb",
      holidays: "#94a3b8",
    };
    return colors[key] || "gray";
  };

  const getIcon = (key) => {
    const colors = {
      present: "▲",
      absent: "▼",
      late: "●",
      on_leave: "✈",
      short_leave: "⏳",
      offday: "🛌",
      holidays: "📅",
    };
    return colors[key] || "gray";
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
          <div className="stat-val" style={{ color: getColor(key) }}>
            {" "}
            {value}{" "}
          </div>
          <div className="stat-sub">
            <span style={{ color: getColor(key) }}>{getIcon(key)}</span>
            {pct(value, total_emp)} % of total
          </div>
        </div>
      ))}
    </div>
  );
}

export default AttendanceSummary;
