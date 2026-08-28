import React, { useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Checkbox,
  Divider,
  CircularProgress,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { postTimeCategory } from "../../../api/timeCategory_api";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satureday",
  "Sunday",
];

const defaultSchedule = {
  Monday: {
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
  },

  Tuesday: {
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
  },

  Wednesday: {
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
  },

  Thursday: {
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
  },

  Friday: {
    enabled: true,
    startTime: "09:00",
    endTime: "17:00",
  },

  Satureday: {
    enabled: false,
    startTime: "09:00",
    endTime: "17:00",
  },

  Sunday: {
    enabled: false,
    startTime: "09:00",
    endTime: "17:00",
  },
};

function TimeCategoryForm({ onSubmit }) {
  const navigate = useNavigate();
  const initialFormData = {
    title: "",
    graceTime: "",
    nightShift: false,
    hours: "9",
    timeCatType: 1,
    abbr: "",
    schedule: defaultSchedule,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  // ===================================================
  // TEXT FIELD STYLES
  // ===================================================

  const textFieldStyles = {
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#92700a",
    },

    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#92700a",
    },

    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#92700a",
    },
  };

  // -----------------------------------
  // General input
  // -----------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------------
  // Night Shift
  // -----------------------------------

  const handleNightShift = (e) => {
    setFormData((prev) => ({
      ...prev,
      nightShift: e.target.checked,
    }));
  };

  // -----------------------------------
  // Enable / Disable Day
  // -----------------------------------

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,

      schedule: {
        ...prev.schedule,

        [day]: {
          ...prev.schedule[day],
          enabled: !prev.schedule[day].enabled,
        },
      },
    }));
  };

  // -----------------------------------
  // Time Change
  // -----------------------------------

  const handleTimeChange = (day, field, value) => {
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

  // -----------------------------------
  // Submit
  // -----------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    const calculateHours = () => {
      const enabledDay = Object.values(formData.schedule).find(
        (day) => day.enabled && day.startTime && day.endTime,
      );

      if (!enabledDay) {
        return "0";
      }

      const [startHour, startMinute] = enabledDay.startTime
        .split(":")
        .map(Number);

      const [endHour, endMinute] = enabledDay.endTime.split(":").map(Number);

      const startTotalMinutes = startHour * 60 + startMinute;

      const endTotalMinutes = endHour * 60 + endMinute;

      let difference = endTotalMinutes - startTotalMinutes;

      // Handle night shift
      if (difference < 0) {
        difference += 24 * 60;
      }

      const hours = difference / 60;

      return hours.toString();
    };

    const payload = {
      title: formData.title,

      grace_time: formData.graceTime,

      is_night_shift: formData.nightShift ? 1 : 0,

      time_cat_type: formData.timeCatType,

      // Monday's first time
      time_in: formData.schedule.Monday.enabled
        ? formData.schedule.Monday.startTime
        : null,

      // Monday's last time
      time_out: formData.schedule.Monday.enabled
        ? formData.schedule.Monday.endTime
        : null,

      hours: calculateHours(),

      abbr: formData.title
        ? formData.title
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
        : "",
    };

    // Add weekly schedule fields
    Object.entries(formData.schedule).forEach(([day, dayData]) => {
      const dayName = day.toLowerCase();

      payload[`tc_${dayName}_in`] = dayData.enabled ? dayData.startTime : null;

      payload[`tc_${dayName}_out`] = dayData.enabled ? dayData.endTime : null;
    });

    try {
      const action = e.nativeEvent.submitter?.value;
      setLoading(true);
      const response = await postTimeCategory(payload);
      setFormData(initialFormData);
      if (action === "save") {
        navigate("/timecategories");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------
  // Clear Form
  // -----------------------------------

  const onCancel = () => {
    setFormData({
      title: "",
      graceTime: "",
      nightShift: false,
      schedule: defaultSchedule,
    });
  };

  if (loading) {
    return (
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            size={30}
            sx={{
              color: "#92700a",
            }}
          />
        </Box>
      </Paper>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          maxWidth: 950,
          mx: "auto",
          p: {
            xs: 2,
            sm: 3,
          },
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={3}>
          Create Time Category
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {/* ================================= */}
          {/* GENERAL INFORMATION */}
          {/* ================================= */}

          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            General Information
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
              required
              fullWidth
              placeholder="e.g. Regular Shift"
              sx={textFieldStyles}
              size="small"
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
                  required: true,
                  size: "small",

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

                    "& .Mui-focused": {
                      color: "#92700a",
                    },
                  },
                },
              }}
            />

            {/* NIGHT SHIFT */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.nightShift}
                    onChange={handleNightShift}
                    sx={{
                      // Checked color
                      "&.Mui-checked": {
                        color: "#92700a",
                      },

                      // Hover background
                      "&:hover": {
                        backgroundColor: "rgba(146, 112, 10, 0.12)",
                      },

                      // Checked + hover background
                      "&.Mui-checked:hover": {
                        backgroundColor: "rgba(146, 112, 10, 0.16)",
                      },
                    }}
                  />
                }
                label="Night Shift"
              />
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* ================================= */}
          {/* WEEKLY SCHEDULE */}
          {/* ================================= */}

          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Weekly Schedule
          </Typography>

          {days.map((day) => {
            const dayData = formData.schedule[day];

            return (
              <Box
                key={day}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "150px 1fr 1fr",
                  },
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  mb: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1.5,
                }}
              >
                {/* DAY */}

                <FormControlLabel
                  control={
                    <Switch
                      checked={dayData?.enabled}
                      onChange={() => handleDayToggle(day)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#92700a",
                        },

                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#92700a",
                          },
                        // Hover background
                        "& .MuiSwitch-switchBase:hover": {
                          backgroundColor: "rgba(146, 112, 10, 0.12)",
                        },

                        // Hover background when ON
                        "& .MuiSwitch-switchBase.Mui-checked:hover": {
                          backgroundColor: "rgba(146, 112, 10, 0.16)",
                        },
                      }}
                    />
                  }
                  label={<Typography fontWeight={500}>{day}</Typography>}
                />

                {/* ================================= */}
                {/* START TIME */}
                {/* ================================= */}

                <TimePicker
                  label="Start Time"
                  value={
                    dayData?.startTime
                      ? dayjs(`2000-01-01T${dayData.startTime}`)
                      : null
                  }
                  onChange={(newValue) => {
                    const value = newValue ? newValue.format("HH:mm") : "";

                    handleTimeChange(day, "startTime", value);
                  }}
                  ampm={false}
                  format="HH:mm"
                  disabled={!dayData?.enabled}
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
                        "& .Mui-focused": {
                          color: "#92700a",
                        },
                      },
                    },
                    field: {
                      readOnly: false,
                    },
                  }}
                />

                {/* ================================= */}
                {/* END TIME */}
                {/* ================================= */}

                <TimePicker
                  label="End Time"
                  value={
                    dayData?.endTime
                      ? dayjs(`2000-01-01T${dayData.endTime}`)
                      : null
                  }
                  onChange={(newValue) => {
                    const value = newValue ? newValue.format("HH:mm") : "";

                    handleTimeChange(day, "endTime", value);
                  }}
                  ampm={false}
                  format="HH:mm"
                  disabled={!dayData?.enabled}
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
                        "& .Mui-focused": {
                          color: "#92700a",
                        },
                      },
                    },
                  }}
                />
              </Box>
            );
          })}

          {/* ================================= */}
          {/* BUTTONS */}
          {/* ================================= */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1.5,
              mt: 3,
            }}
          >
            <Button
              type="button"
              variant="outlined"
              color="inherit"
              startIcon={<CancelIcon />}
              onClick={onCancel}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(146, 112, 10, 0.4)",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              name="action"
              value="save"
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => navigate("/timecategories")}
              sx={{
                backgroundColor: "#92700a",

                "&:hover": {
                  backgroundColor: "rgba(146, 112, 10, 0.87)",
                },
              }}
            >
              Save
            </Button>
            <Button
              type="submit"
              name="action"
              value="saveAndNew"
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                backgroundColor: "#92700a",

                "&:hover": {
                  backgroundColor: "rgba(146, 112, 10, 0.87)",
                },
              }}
            >
              Save And Add New
            </Button>
          </Box>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
}

export default TimeCategoryForm;
