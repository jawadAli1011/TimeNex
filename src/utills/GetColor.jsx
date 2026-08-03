import React from "react";

function GetColor(key) {
  const colors = {
    present: "#16a34a",
    active: "#16a34a",
    inactive: "#dc2626",
    absent: "#dc2626",
    late: "#d97706",
    on_leave: "#2563eb",
    short_leave: "#1e293b",
    offday: "#2563eb",
    holidays: "#94a3b8",
  };
  return colors[key] || "gray";
}

export default GetColor;
