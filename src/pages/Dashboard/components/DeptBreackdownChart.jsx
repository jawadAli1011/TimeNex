function DeptBreackdownChart({ deptStatsDetail, totalEmployees }) {
  // let yDeptAxisMax = Math.ceil(totalEmployees / 5) * 5;

  // if (yDeptAxisMax < 5) {
  //   yDeptAxisMax = 5;
  // }
  let yDeptAxisMax = 100;
  // -----------------------
  return (
    <div className="card ">
      <div className="section-head">
        <h2>Department Breakdown</h2>
        <p>Attendance distribution across departments</p>
      </div>
      <div className="bar-chart-wrapper  " style={{ margin: "10px" }}>
        <div className="y-axis">
          <span>{yDeptAxisMax}</span>
          <span>{Math.round(yDeptAxisMax * 0.8)}</span>
          <span>{Math.round(yDeptAxisMax * 0.4)}</span>
          <span>{Math.round(yDeptAxisMax * 0.2)}</span>
          <span>{Math.round(yDeptAxisMax * 0.1)}</span>
          <span>{Math.round(yDeptAxisMax * 0.5)}</span>
          <span>0</span>
        </div>
        {Object.keys(deptStatsDetail).map((dept, index) => (
          <div key={index} className="bar-group " style={{ margin: "0 auto" }}>
            <div
              className="bar present"
              style={{
                height: `${Math.max(
                  (deptStatsDetail[dept].present / yDeptAxisMax) * 100,
                  1,
                )}%`,
              }}
              data-val={deptStatsDetail[dept].present}
            ></div>
            <div
              className="bar absent"
              style={{
                height: `${Math.max(
                  (deptStatsDetail[dept].absent / yDeptAxisMax) * 100,
                  1,
                )}%`,
              }}
              data-val={deptStatsDetail[dept].absent}
            ></div>
            <div className="bar-label" title={dept}>
              {dept}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "16px",
          marginTop: "30px",
          fontSize: "10px",
          fontWeight: "600",
          color: "var(--text-dim)",
        }}
      >
        <div className="flex gap-4">
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--green)",
              }}
            ></span>{" "}
            Present
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--red)",
              }}
            ></span>{" "}
            Absent
          </span>
        </div>
        <div className="flex gap-4">
          <button>prev</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
}

export default DeptBreackdownChart;
