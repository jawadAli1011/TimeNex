import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  IconButton,
  TableCell,
} from "@mui/material";
import { deleteTimeCategory as deleteApi } from "../../../api/timeCategory_api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateTimeCategory from "./UpdateTC";

function TimeCategoryActions({ category, fetchTimeCategory }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteApi(category.id);

      setOpen(false);

      // List refresh
      fetchTimeCategory();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Delete Button */}
      {/* <TableCell> */}
      {/* EDIT */}

      {/* DELETE */}

      <Tooltip title="Delete">
        <IconButton
          onClick={() => handleOpen()}
          size="small"
          sx={{
            color: "#d32f2f",

            "&:hover": {
              backgroundColor: "rgba(211, 47, 47, 0.10)",
            },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      {/* </TableCell> */}

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Time Category</DialogTitle>

        <DialogContent>
          Are you sure you want to delete <strong>{category.title}</strong>?
        </DialogContent>

        <DialogActions>
          {/* No */}
          <Button onClick={handleClose} disabled={loading}>
            No
          </Button>

          {/* OK */}
          <Button
            onClick={handleDelete}
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

export default TimeCategoryActions;
