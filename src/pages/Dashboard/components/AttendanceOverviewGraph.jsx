import React from "react";

function AttendanceOverviewGraph({ DATA }) {
  const { stats, total_employees } = DATA;
  function pct(val, total) {
    return total > 0 ? ((val / total) * 100).toFixed(1) : "0";
  }

  let presentCount = stats.present + stats.late;
  let absentCount = total_employees - presentCount;
  let presentPct = (presentCount / total_employees) * 100;
  let absentPct = (absentCount / total_employees) * 100;

  return (
    <div className="card flex flex-col items-center">
      {/* <!-- Donut Chart Card --> */}
      <div className="section-head self-start w-full">
        <h2>Attendance Overview</h2>
      </div>
      <div className="relative w-40 h-40 mt-5 ">
        <svg
          viewBox="0 0 36 36"
          className="w-full h-full transform-[rotate(-90deg)]"
        >
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="var(--border)"
            strokeWidth="4"
          ></circle>
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="var(--green)"
            strokeWidth="4"
            strokeDasharray={`${presentPct} ${100 - presentPct}`}
            strokeDashoffset="0"
          ></circle>
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="transparent"
            stroke="var(--red)"
            strokeWidth="4"
            strokeDasharray={`${absentPct} ${100 - absentPct}`}
            strokeDashoffset={`-${presentPct}`}
          ></circle>
        </svg>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  text-center">
          <div className=" font-[800px] text-[24px] text-(--text) leading-none ">
            {pct(presentCount, total_employees)}%
          </div>
          <div className="text-[10px] text-(--text-dim) font-[600px]">
            Present
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-6 w-full">
        <div
          style={{ padding: "6px 12px" }}
          className="flex justify-between items-center text-[11px] px-1.5 py-3 bg-(--green-bg) rounded-md   text-(--text-dim)"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-[50%] bg-(--green)"></span>{" "}
            Present (inc. Late)
          </span>
          <strong className="text-(--green)">{presentCount}</strong>
        </div>
        <div
          className="flex justify-between items-center text-[11px] p-[6px_12px] bg-(--red-bg) rounded-md text-(--text-dim)"
          style={{ padding: "6px 12px" }}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-[50%] bg-(--red)"></span>{" "}
            Absent (inc. Leave)
          </span>
          <strong className="text-(--red)">{absentCount}</strong>
        </div>
      </div>
    </div>
  );
}

export default AttendanceOverviewGraph;
