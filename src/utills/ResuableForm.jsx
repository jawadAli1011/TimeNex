import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const BASE_COLOR = "#92700a";

const ReusableForm = ({
  dropdownLabel = "Select Type",
  dropdownName = "type",
  dropdownOptions = [],
  formName = "Registration Form",

  initialData = {
    type: "",
    name: "",
    description: "",
    address1: "",
    address2: "",
  },

  onSave,
  onSaveAndAddNew,
  onCancel,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error when user changes the field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate required fields
  const validate = () => {
    const newErrors = {};

    if (!formData[dropdownName]) {
      newErrors[dropdownName] = `${dropdownLabel} is required`;
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.address1.trim()) {
      newErrors.address1 = "Address 1 is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Save
  const handleSave = () => {
    if (!validate()) return;

    if (onSave) {
      onSave(formData);
    }
  };

  // Save & Add New
  const handleSaveAndAddNew = () => {
    if (!validate()) return;

    if (onSaveAndAddNew) {
      onSaveAndAddNew(formData);
    }

    // Reset form
    setFormData({
      type: "",
      name: "",
      description: "",
      address1: "",
      address2: "",
    });

    setErrors({});
  };

  // Cancel
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        mx: "auto",
        p: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      {/* Form Title */}
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: BASE_COLOR,
        }}
      >
        {formName}
      </Typography>

      <Stack spacing={2.5}>
        {/* ================= DROPDOWN ================= */}
        <FormControl
          fullWidth
          size="small"
          error={Boolean(errors[dropdownName])}
        >
          <InputLabel
            sx={{
              "&.Mui-focused": {
                color: BASE_COLOR,
              },
            }}
          >
            {dropdownLabel} <span style={{ color: "red" }}> *</span>
          </InputLabel>

          <Select
            name={dropdownName}
            value={formData[dropdownName] || ""}
            label={dropdownLabel}
            onChange={handleChange}
            sx={{
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: BASE_COLOR,
              },
            }}
          >
            <MenuItem value="">
              <em> {dropdownLabel}</em>
            </MenuItem>

            {dropdownOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          {errors[dropdownName] && (
            <FormHelperText>{errors[dropdownName]}</FormHelperText>
          )}
        </FormControl>

        {/* ================= NAME ================= */}
        <TextField
          fullWidth
          size="small"
          label={
            <>
              Name <span style={{ color: "red" }}> *</span>
            </>
          }
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: BASE_COLOR,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: BASE_COLOR,
            },
          }}
        />

        {/* ================= DESCRIPTION ================= */}
        <TextField
          fullWidth
          size="small"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: BASE_COLOR,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: BASE_COLOR,
            },
          }}
        />

        {/* ================= ADDRESS 1 ================= */}
        <TextField
          fullWidth
          size="small"
          label={
            <>
              Address 1 <span style={{ color: "red" }}> *</span>
            </>
          }
          name="address1"
          value={formData.address1}
          onChange={handleChange}
          error={Boolean(errors.address1)}
          helperText={errors.address1}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: BASE_COLOR,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: BASE_COLOR,
            },
          }}
        />

        {/* ================= ADDRESS 2 ================= */}
        <TextField
          fullWidth
          size="small"
          label="Address 2"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: BASE_COLOR,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: BASE_COLOR,
            },
          }}
        />

        {/* ================= BUTTONS ================= */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
            mt: 2,
          }}
        >
          {/* Cancel */}
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              color: BASE_COLOR,
              borderColor: BASE_COLOR,
              textTransform: "none",

              "&:hover": {
                borderColor: BASE_COLOR,
                backgroundColor: "rgba(146,112,10,0.05)",
              },
            }}
          >
            Cancel
          </Button>

          {/* Save & Add New */}
          <Button
            variant="outlined"
            onClick={handleSaveAndAddNew}
            sx={{
              color: BASE_COLOR,
              borderColor: BASE_COLOR,
              textTransform: "none",

              "&:hover": {
                borderColor: BASE_COLOR,
                backgroundColor: "rgba(146,112,10,0.05)",
              },
            }}
          >
            Save & Add New
          </Button>

          {/* Save */}
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: BASE_COLOR,
              textTransform: "none",

              "&:hover": {
                backgroundColor: "#765b08",
              },
            }}
          >
            Save
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default ReusableForm;
