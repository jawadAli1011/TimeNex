import React from "react";
import { useDashboard } from "../../context/DashboardContext";
import GetColor from "../../utills/GetColor";
function Reports() {
  const { dashboardData, loading } = useDashboard();

  const allRecords = Object.values(
    dashboardData?.data?.drilldown_data || {},
  ).flat();

  const uniqueEmployees = [
    ...new Map(allRecords.map((emp) => [emp.id, emp])).values(),
  ];

  if (loading) return <div>Loading...</div>;
  return (
    <>
      {" "}
      <div className="section-head">
        <h2>Employee Directory</h2>
        <p>Detailed view of workforce status and assignments</p>
      </div>
      <div className="card" style={{ padding: "0", overflowX: "auto" }}>
        <table className="tbl">
          <thead>
            <tr>
              <th>Employee Details</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {uniqueEmployees.map((emp) => {
              return (
                <tr key={emp.id}>
                  <td>
                    <div style={{ fontWeight: "600", color: "var(--text)" }}>
                      {emp.name}
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "var(--text-muted)",
                        marginTop: "2px",
                      }}
                    >
                      ID: {emp.id}
                    </div>
                  </td>
                  <td style={{ color: "var(--text-dim)" }}>
                    {emp.designation}
                  </td>
                  <td style={{ color: "var(--text-dim)" }}>{emp.department}</td>
                  <td>
                    <span
                      className={"badge b-green"}
                      style={{
                        color: GetColor(emp.status),
                      }}
                    >
                      <span
                        className="dot"
                        style={{
                          backgroundColor: GetColor(emp.status),
                        }}
                      ></span>{" "}
                      {emp.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Reports;

//       <td>
//         <div style="font-weight:600; color:var(--text);">${emp.name}</div>
//         <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">ID: ${emp.id}</div>
//       </td>
//       <td style="color:var(--text-dim);">${emp.desig}</td>
//       <td style="color:var(--text-dim);">${emp.dept}</td>
//       <td>
//         <span className="badge ${badgeClass}"><span className="dot"></span> ${emp.status}</span>
//       </td>
//      </tr>
//      </tbody>
//     </table>
//    </div>
//   </>
// }

// export default Reports;
