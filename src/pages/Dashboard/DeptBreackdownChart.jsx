import { useMemo } from "react";

function DeptBreackdownChart({ DATA }) {
  const { deptStats, desigStats } = useMemo(() => {
    const deptStats = {};
    const desigStats = {};

    DATA.employees.forEach((emp) => {
      const isPresent =
        emp.status === "present" ||
        emp.status === "late" ||
        emp.status === "earlyout";

      const keyStat = isPresent ? "present" : "absent";

      //   Department Statistics
      if (!deptStats[emp.dept]) {
        deptStats[emp.dept] = {
          present: 0,
          absent: 0,
          total: 0,
        };
      }
      deptStats[emp.dept][keyStat]++;
      deptStats[emp.dept].total++;

      // Designation Statistics
      const designation = emp.desig || "Unknown";
      if (!desigStats[designation]) {
        desigStats[designation] = {
          present: 0,
          absent: 0,
          total: 0,
        };
      }
      desigStats[designation][keyStat]++;
      desigStats[designation].total++;
    });

    return { deptStats, desigStats };
  }, [DATA.employees]);

  let maxDeptTotal = 0;
  for (let d in deptStats) {
    if (deptStats[d].total > maxDeptTotal) maxDeptTotal = deptStats[d].total;
  }
  let yDeptAxisMax = Math.ceil(maxDeptTotal / 5) * 5;
  if (yDeptAxisMax < 5) yDeptAxisMax = 5;

  return (
    <div className="card ">
      <div className="section-head">
        <h2>Department Breakdown</h2>
        <p>Attendance distribution across departments</p>
      </div>
      <div className="bar-chart-wrapper">
        <div className="y-axis">
          <span>{yDeptAxisMax}</span>
          <span>{Math.round(yDeptAxisMax * 0.66)}</span>
          <span>{Math.round(yDeptAxisMax * 0.33)}</span>
          <span>0</span>
        </div>

        {Object.keys(deptStats).map((dept, index) => (
          <div
            key={dept + index}
            className="bar-group "
            style={{ margin: "0 auto" }}
          >
            <div
              className="bar present"
              style={{
                height: `${Math.max(
                  (deptStats[dept].present / yDeptAxisMax) * 100,
                  1,
                )}%`,
              }}
              data-val={deptStats[dept].present}
            ></div>
            <div
              className="bar absent"
              style={{
                height: `${Math.max(
                  (deptStats[dept].absent / yDeptAxisMax) * 100,
                  1,
                )}%`,
              }}
              data-val={deptStats[dept].absent}
            ></div>
            <div className="bar-label" title={dept}>
              {dept.split(" ")[0]}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginTop: "30px",
          fontSize: "10px",
          fontWeight: "600",
          color: "var(--text-dim)",
        }}
      >
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
    </div>
  );
}

export default DeptBreackdownChart;
