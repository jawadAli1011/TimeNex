import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { exportListToPDF } from "../../utills/exportPdf";
import { PictureAsPdf } from "@mui/icons-material";
const ReusableDialog = ({ dashboardData, handleClose, open, selectedType }) => {
  
  const STATUS_CONFIG = {
    present: { title: "Present", status: "present" },
    absent: { title: "Absent", status: "absent" },
    leave: { title: "On Leave", status: "leave" },
    late: { title: "Late", status: "late" },
    earlyout: { title: "Early Out", status: "earlyout" },
    shortleave: { title: "Short Leave", status: "shortleave" },
    attach: { title: "Attached", status: "attach" },
    offday: { title: "Off Day", status: "offday" },
    holidays: { title: "Holidays", status: "holidays" },
    night_shift: { title: "Night Shift", status: "night_shift" },
    no_time_category: { title: "No Time Category", status: "no_time_category" },
  };
  const selectedStatus = STATUS_CONFIG[selectedType];
  const employees =
    selectedType === "present"
      ? dashboardData?.[selectedStatus["present"]] +
          dashboardData?.[selectedStatus["late"]] || []
      : dashboardData?.[selectedStatus.status] || [];

  const title = selectedStatus?.title || "";

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <div className="flex  ">
        <DialogTitle>{`${title} Employees`}</DialogTitle>
        <button
          className="cursor-pointer"
          onClick={() => exportListToPDF(employees)}
        >
          <PictureAsPdf />
          <span>Export PDF</span>
        </button>
      </div>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {employees.length === 0 && (
          <Typography sx={{ mt: 2 }}>No employees found.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
export default ReusableDialog;
