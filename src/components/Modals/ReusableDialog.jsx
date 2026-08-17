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

const ReusableDialog = ({
  dashboardData,
  handleClose,
  handleOpen,
  open,
  selectedType,
}) => {
  // Your API records
  const employees = Object.values(
    dashboardData?.data?.drilldown_data || {},
  ).flat();

  //   console.log(dashboardData.data.drilldown_data);
  //   console.log(selectedType);
  // Filter employees according to selected card
  const filteredEmployees = employees.filter((employee) => {
    if (selectedType === "present") {
      return employee.status?.toLowerCase() === "present";
    }

    if (selectedType === "absent") {
      return employee.status?.toLowerCase() === "absent";
    }

    if (selectedType === "leave") {
      return employee.status?.toLowerCase() === "leave";
    }

    if (selectedType === "late") {
      return employee.status?.toLowerCase() === "late";
    }

    if (selectedType === "earlyout") {
      return employee.status?.toLowerCase() === "earlyout";
    }

    if (selectedType === "shortleave") {
      return employee.status?.toLowerCase() === "shortleave";
    }

    if (selectedType === "attach") {
      return employee.status?.toLowerCase() === "attach";
    }

    if (selectedType === "offday") {
      return employee.status?.toLowerCase() === "offday";
    }

    if (selectedType === "holidays") {
      return employee.status?.toLowerCase() === "holidays";
    }

    if (selectedType === "night_shift") {
      return employee.status?.toLowerCase() === "night_shift";
    }

    if (selectedType === "no_time_category") {
      return employee.status?.toLowerCase() === "no_time_category";
    }

    return true;
  });

  return (
    <>
      {/* MUI Modal */}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <div className="flex  ">
          <DialogTitle>
            {selectedType === "present" && "Present Employees"}

            {selectedType === "absent" && "Absent Employees"}

            {selectedType === "leave" && "Employees on Leave"}
          </DialogTitle>
          <button
            className="cursor-pointer"
            onClick={() => exportListToPDF(filteredEmployees)}
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
                {filteredEmployees.map((employee) => (
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

          {filteredEmployees.length === 0 && (
            <Typography sx={{ mt: 2 }}>No employees found.</Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReusableDialog;
