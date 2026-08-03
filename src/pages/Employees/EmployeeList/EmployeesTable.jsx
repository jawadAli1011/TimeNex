import React from "react";

const tabelHeader = [
  "Employee",
  "Id / Role",
  "Department",
  "Joined Date",
  "Status",
  "Actions",
];

const tableData = [
  {
    logo: "JD",
    name: "John Doe",
    gmail: "john.doe@example.com",
    id: "EMP-1001",
    role: "Senior Developer",
    department: "Engineering",
    joinDate: "Jan 12, 2024",
    status: "active",
  },
  {
    logo: "AS",
    name: "Alice Smith",
    gmail: "alice.smith@example.com",
    id: "EMP-1002",
    role: "HR Manager",
    department: "Human Resources",
    joinDate: "Feb 05, 2024",
    status: "Active",
  },
  {
    logo: "MJ",
    name: "Michael Johnson",
    gmail: "michael.j@example.com",
    id: "EMP-1003",
    role: "Sales Executive",
    department: "Sales",
    joinDate: "Mar 18, 2024",
    status: "On Leave",
  },
  {
    logo: "JD",
    name: "John Doe",
    gmail: "john.doe@example.com",
    id: "EMP-1004",
    role: "Senior Developer",
    department: "Engineering",
    joinDate: "Jan 12, 2024",
    status: "active",
  },
  {
    logo: "AS",
    name: "Alice Smith",
    gmail: "alice.smith@example.com",
    id: "EMP-1005",
    role: "HR Manager",
    department: "Human Resources",
    joinDate: "Feb 05, 2024",
    status: "Active",
  },
  {
    logo: "MJ",
    name: "Michael Johnson",
    gmail: "michael.j@example.com",
    id: "EMP-1006",
    role: "Sales Executive",
    department: "Sales",
    joinDate: "Mar 18, 2024",
    status: "On Leave",
  },
];

const gitColor = (status) => {};

function EmployeesTable() {
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
          {tableData.map((td) => (
            <tr key={td.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold text-[13px]">
                    {td.logo}
                  </div>
                  <div>
                    <div className="font-semibold text-[13px]"> {td.name} </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      {td.gmail}
                    </div>
                  </div>
                </div>
              </td>
              <td className="font-medium text-[12px] color-[var(--text)]">
                <div> {td.id} </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  {td.role}
                </div>
              </td>
              <td className="text-xs color-var(--text-dim)">Engineering</td>
              <td> {td.joinDate} </td>
              <td>
                <span className="badge b-green">
                  <span className="dot"></span> {td.status}
                </span>
              </td>
              <td className="text-right">
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
