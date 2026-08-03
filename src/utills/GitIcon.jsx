import React from "react";

function GitIcon(key) {
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
}

export default GitIcon;
