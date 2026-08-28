import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Tooltip,
  Box,
  Typography,
  Divider,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { updateTimeCategory } from "../../../api/timeCategory_api";

function UpdateTimeCategory({ category, fetchTimeCategory }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    graceTime: "",
    nightShift: false,

    schedule: {
      Monday: {
        enabled: false,
        startTime: "",
        endTime: "",
      },
      Tuesday: {
        enabled: false,
        startTime: "",
        endTime: "",
      },
      Wednesday: {
        enabled: false,
        startTime: "",
        endTime: "",
      },
      Thursday: {
        enabled: false,
        startTime: "",
        endTime: "",
      },
      Friday: {
        enabled: false,
        startTime: "",
        endTime: "",
      },
      Satureday: {
        enabled: false,
        startTime: "",
        endTime: "",
      },
      Sunday: {
        enabled: false,
        startTime: "",
        endTime: "",
      },
    },
  });

  // --------------------------------
  // Open dialog
  // --------------------------------

  const handleOpen = () => {
    setFormData({
      title: category?.title || "",
      graceTime: category?.grace_time || "",
      nightShift: category?.is_night_shift === 1,

      schedule: {
        Monday: {
          enabled: !!category?.tc_monday_in || !!category?.tc_monday_out,
          startTime: category?.tc_monday_in || "",
          endTime: category?.tc_monday_out || "",
        },

        Tuesday: {
          enabled: !!category?.tc_tuesday_in || !!category?.tc_tuesday_out,
          startTime: category?.tc_tuesday_in || "",
          endTime: category?.tc_tuesday_out || "",
        },

        Wednesday: {
          enabled: !!category?.tc_wednesday_in || !!category?.tc_wednesday_out,
          startTime: category?.tc_wednesday_in || "",
          endTime: category?.tc_wednesday_out || "",
        },

        Thursday: {
          enabled: !!category?.tc_thursday_in || !!category?.tc_thursday_out,
          startTime: category?.tc_thursday_in || "",
          endTime: category?.tc_thursday_out || "",
        },

        Friday: {
          enabled: !!category?.tc_friday_in || !!category?.tc_friday_out,
          startTime: category?.tc_friday_in || "",
          endTime: category?.tc_friday_out || "",
        },

        Satureday: {
          enabled: !!category?.tc_satureday_in || !!category?.tc_satureday_out,
          startTime: category?.tc_satureday_in || "",
          endTime: category?.tc_satureday_out || "",
        },

        Sunday: {
          enabled: !!category?.tc_sunday_in || !!category?.tc_sunday_out,
          startTime: category?.tc_sunday_in || "",
          endTime: category?.tc_sunday_out || "",
        },
      },
    });

    setOpen(true);
  };

  // --------------------------------
  // Close dialog
  // --------------------------------

  const handleClose = () => {
    if (!loading) {
      setOpen(false);
    }
  };

  // --------------------------------
  // Normal input
  // --------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------
  // Change schedule
  // --------------------------------

  const handleScheduleChange = (day, field, value) => {
    setFormData((prev) => ({
      ...prev,

      schedule: {
        ...prev.schedule,

        [day]: {
          ...prev.schedule[day],
          [field]: value,
        },
      },
    }));
  };

  // --------------------------------
  // Update API
  // --------------------------------

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const payload = {
        title: formData.title,

        grace_time: formData.graceTime,

        is_night_shift: formData.nightShift ? 1 : 0,

        tc_monday_in: formData.schedule.Monday.enabled
          ? formData.schedule.Monday.startTime
          : null,

        tc_monday_out: formData.schedule.Monday.enabled
          ? formData.schedule.Monday.endTime
          : null,

        tc_tuesday_in: formData.schedule.Tuesday.enabled
          ? formData.schedule.Tuesday.startTime
          : null,

        tc_tuesday_out: formData.schedule.Tuesday.enabled
          ? formData.schedule.Tuesday.endTime
          : null,

        tc_wednesday_in: formData.schedule.Wednesday.enabled
          ? formData.schedule.Wednesday.startTime
          : null,

        tc_wednesday_out: formData.schedule.Wednesday.enabled
          ? formData.schedule.Wednesday.endTime
          : null,

        tc_thursday_in: formData.schedule.Thursday.enabled
          ? formData.schedule.Thursday.startTime
          : null,

        tc_thursday_out: formData.schedule.Thursday.enabled
          ? formData.schedule.Thursday.endTime
          : null,

        tc_friday_in: formData.schedule.Friday.enabled
          ? formData.schedule.Friday.startTime
          : null,

        tc_friday_out: formData.schedule.Friday.enabled
          ? formData.schedule.Friday.endTime
          : null,

        tc_satureday_in: formData.schedule.Satureday.enabled
          ? formData.schedule.Satureday.startTime
          : null,

        tc_satureday_out: formData.schedule.Satureday.enabled
          ? formData.schedule.Satureday.endTime
          : null,

        tc_sunday_in: formData.schedule.Sunday.enabled
          ? formData.schedule.Sunday.startTime
          : null,

        tc_sunday_out: formData.schedule.Sunday.enabled
          ? formData.schedule.Sunday.endTime
          : null,
      };

      const response = await updateTimeCategory(category.id, payload);
      setOpen(false);
      fetchTimeCategory();
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* =========================
          EDIT BUTTON
      ========================= */}

      <Tooltip title="Edit">
        <IconButton
          size="small"
          onClick={handleOpen}
          sx={{
            color: "#92700a",

            "&:hover": {
              backgroundColor: "rgba(146, 112, 10, 0.12)",
            },
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {/* =========================
          UPDATE DIALOG
      ========================= */}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Update Time Category</DialogTitle>

        <DialogContent>
          {/* =========================
              BASIC INFORMATION
          ========================= */}

          <Typography
            variant="subtitle1"
            sx={{
              mt: 1,
              mb: 1,
              fontWeight: 600,
            }}
          >
            Basic Information
          </Typography>
          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },

              gap: 2,

              mb: 3,
            }}
          >
            {/* TITLE */}

            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              size="small"
              margin="normal"
            />

            {/* GRACE TIME */}

            <TimePicker
              label="Grace Time"
              value={
                formData.graceTime
                  ? dayjs(`2000-01-01T${formData.graceTime}`)
                  : null
              }
              onChange={(newValue) => {
                const value = newValue ? newValue.format("HH:mm") : "";

                setFormData((prev) => ({
                  ...prev,
                  graceTime: value,
                }));
              }}
              ampm={false}
              format="HH:mm"
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  margin: "normal",
                },
              }}
            />

            {/* NIGHT SHIFT */}

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.nightShift}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nightShift: e.target.checked,
                    }))
                  }
                />
              }
              label="Night Shift"
            />
          </Box>
          <Divider sx={{ my: 2 }} />

          {/* =========================
              WEEKLY SCHEDULE
          ========================= */}

          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              fontWeight: 600,
            }}
          >
            Weekly Schedule
          </Typography>

          {Object.entries(formData.schedule).map(([day, dayData]) => (
            <Box
              key={day}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "120px 1fr 1fr",
                },
                gap: 2,
                alignItems: "center",
                mb: 2,
              }}
            >
              {/* DAY + ENABLE */}

              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dayData.enabled}
                      onChange={(e) =>
                        handleScheduleChange(day, "enabled", e.target.checked)
                      }
                    />
                  }
                  label={day}
                />
              </Box>

              {/* START TIME */}

              <TimePicker
                label="Start Time"
                value={
                  dayData.startTime
                    ? dayjs(`2000-01-01T${dayData.startTime}`)
                    : null
                }
                onChange={(newValue) => {
                  const value = newValue ? newValue.format("HH:mm") : "";

                  handleScheduleChange(day, "startTime", value);
                }}
                ampm={false}
                format="HH:mm"
                disabled={!dayData.enabled}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,

                    sx: {
                      "& .MuiInputLabel-root": {
                        color: "#666",
                      },

                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#92700a !important",
                      },

                      "& fieldset": {
                        borderColor: "#ccc !important",
                      },

                      "&:hover fieldset": {
                        borderColor: "#92700a !important",
                      },

                      "& .Mui-focused fieldset": {
                        borderColor: "#92700a !important",
                        borderWidth: "2px !important",
                      },

                      "& input": {
                        color: "#333",
                      },

                      "& .MuiIconButton-root": {
                        color: "#92700a !important",
                      },

                      "& .MuiIconButton-root:hover": {
                        backgroundColor: "rgba(146, 112, 10, 0.12)",
                      },
                    },
                  },
                }}
              />

              {/* END TIME */}

              <TimePicker
                label="End Time"
                value={
                  dayData.endTime
                    ? dayjs(`2000-01-01T${dayData.endTime}`)
                    : null
                }
                onChange={(newValue) => {
                  const value = newValue ? newValue.format("HH:mm") : "";

                  handleScheduleChange(day, "endTime", value);
                }}
                ampm={false}
                format="HH:mm"
                disabled={!dayData.enabled}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,

                    sx: {
                      "& .MuiInputLabel-root": {
                        color: "#666",
                      },

                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#92700a !important",
                      },

                      "& fieldset": {
                        borderColor: "#ccc !important",
                      },

                      "&:hover fieldset": {
                        borderColor: "#92700a !important",
                      },

                      "& .Mui-focused fieldset": {
                        borderColor: "#92700a !important",
                        borderWidth: "2px !important",
                      },

                      "& input": {
                        color: "#333",
                      },

                      "& .MuiIconButton-root": {
                        color: "#92700a !important",
                      },

                      "& .MuiIconButton-root:hover": {
                        backgroundColor: "rgba(146, 112, 10, 0.12)",
                      },
                    },
                  },
                }}
              />
            </Box>
          ))}
        </DialogContent>

        {/* =========================
            ACTIONS
        ========================= */}

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>

          <Button
            onClick={handleUpdate}
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "#92700a",

              "&:hover": {
                backgroundColor: "rgba(146, 112, 10, 0.87)",
              },
            }}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

export default UpdateTimeCategory;
