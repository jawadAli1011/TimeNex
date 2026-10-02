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

import DeleteIcon from "@mui/icons-material/Delete";

function DeleteAlert({ itemId, itemName, dialogTitle, deleteApi, refreshApi }) {
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

      await deleteApi(itemId);
      setLoading(false);

      setOpen(false);

      // List refresh
      refreshApi();
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
        <DialogTitle> {dialogTitle} </DialogTitle>

        <DialogContent>
          Are you sure you want to delete {itemName} ?
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

export default DeleteAlert;
