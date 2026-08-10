import React from "react";
import GetColor from "../../../../utills/GetColor";
import getEmpLogo from "../../../../utills/GetEmpLogo";
import { useDashboard } from "../../../../context/DashboardContext";
import { useEffect } from "react";

const tabelHeader = [
  "Employee",
  "Id / Role",
  "Department",
  "Designation",
  "Status",
  "Actions",
];

function EmployeesTable({ filteredEmp }) {
  const { dashboardData, loading, error, fetchDashboard } = useDashboard();

  if (loading) return <div>Loading...</div>;

  if (filteredEmp.length === 0)
    return (
      <div style={{ marginBottom: "20px" }} className=" text-xl text-red-500">
        Employee Not Found
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="tbl">
        <thead>
          <tr>
            {tabelHeader.map((th) => (
              <th key={th}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredEmp.map((td) => (
            <tr key={td.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold text-[13px]">
                    {getEmpLogo(td.name)}
                  </div>
                  <div>
                    <div className="font-semibold text-[13px]"> {td.name} </div>
                    {/* <div className="text-[11px] text-gray-500 mt-0.5">
                      {td.gmail}
                    </div> */}
                  </div>
                </div>
              </td>
              <td className="font-medium text-[12px] color-[var(--text)]">
                <div> {td.id} </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  {td.designation}
                </div>
              </td>
              <td className="text-xs color-var(--text-dim)">{td.department}</td>
              <td> {td.designation} </td>
              <td>
                <span
                  className="badge b-green"
                  style={{ color: GetColor(td.status) }}
                >
                  <span
                    className="dot"
                    style={{ backgroundColor: GetColor(td.status) }}
                  ></span>
                  {td.status}
                </span>
              </td>
              <td className="text-right flex">
                <button className="btn-icon" title="View Profile">
                  👁️
                </button>
                <button className="btn-icon" title="Edit Employee">
                  ✏️
                </button>
                <button
                  className="btn-icon"
                  title="Delete"
                  className="text-(--red)"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeesTable;
