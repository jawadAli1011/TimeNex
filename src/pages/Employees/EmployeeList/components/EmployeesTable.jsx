import React, { useState } from "react";
import GetColor from "../../../../utills/GetColor";
import getEmpLogo from "../../../../utills/GetEmpLogo";
import { useEffect } from "react";
import { deleteEmp } from "../../../../api/emp_api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const tabelHeader = [
  "Employee",
  "Id / Role",
  "Department",
  "Designation",
  // "Status",
  "Actions",
];

function EmployeesTable({ filteredEmp, loading, fetchEmployee, start, end }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const handleOpen = (id, name) => {
    setSelectedId(id);
    setSelectedEmp(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DeleteEmp = async () => {
    try {
      await deleteEmp(selectedId);
      setOpen(false);
      fetchEmployee();
    } catch (error) {
      console.log(error);
    }
  };

  if (filteredEmp.length === 0)
    return (
      <div style={{ marginBottom: "20px" }} className=" text-xl text-red-500">
        Employee Not Found
      </div>
    );

  return (
    <>
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
            {filteredEmp.slice(start, end).map((td) => (
              <tr key={td.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-8.5 h-8.5 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold text-[13px]">
                      {getEmpLogo(td.name)}
                    </div>
                    <div>
                      <div className="font-semibold text-[13px]">
                        {" "}
                        {td.name}{" "}
                      </div>
                      {/* <div className="text-[11px] text-gray-500 mt-0.5">
                      {td.gmail}
                    </div> */}
                    </div>
                  </div>
                </td>
                <td className="font-medium text-[12px] color-[var(--text)]">
                  <div> {td.id} </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    {td.role?.title}
                  </div>
                </td>
                <td className="text-xs color-var(--text-dim)">
                  {td.departments?.name}
                </td>
                <td> {td.designations?.title} </td>
                <td className="text-right">
                  <div className="flex">
                    <button className="btn-icon" title="View Profile">
                      👁️
                    </button>
                    <button
                      className="btn-icon"
                      title="Edit Employee"
                      onClick={() => navigate(`/employees/edit/${td.id}`)}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleOpen(td.id, td.name)}
                      title="Delete"
                      className="btn-icon text-(--red)"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Employee</DialogTitle>

        <DialogContent>
          Are you sure you want to delete <strong>{selectedEmp}</strong>?
        </DialogContent>

        <DialogActions>
          {/* No */}
          <Button onClick={handleClose} disabled={loading}>
            No
          </Button>

          {/* OK */}
          <Button
            onClick={() => DeleteEmp()}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Deleting..." : "OK"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EmployeesTable;
