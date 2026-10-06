import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createDepartment } from "../../../api/departments_api";

const BASE_COLOR = "#92700a";

export default function DepartmentForm() {
  const navigate = useNavigate();

  const initialForm = {
    department_type: "1",
    department_name: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.department_name.trim()) {
      newErrors.department_name = "Department name is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Save
  const handleSubmit = async (action) => {
    // e.preventDefault();
    // const action = e.nativeEvent.submitter?.value;
    if (!validate()) return;

    const payload = {
      // department_type: formData.department_type,
      name: formData.department_name,
      description: formData.description,
    };

    try {
      if (action === "save") {
        navigate("/departments");
        await createDepartment(payload);
      } else {
        await createDepartment(payload);
      }
    } catch (error) {
      console.log(error);
    }

    // API call here
    // await postApi("/departments", formData);
  };

  // Cancel
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        p: 3,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          maxWidth: 900,
          mx: "auto",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* Form Header */}
        <Box
          sx={{
            px: 3,
            py: 2,
            // backgroundColor: BASE_COLOR,
            color: BASE_COLOR,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Add Department
          </Typography>
        </Box>

        {/* Form */}
        <Box
          // component="form"
          // onSubmit={handleSubmit}
          // noValidate
          sx={{
            p: 3,
          }}
        >
          {/* Department Type */}
          <FormControl sx={{ mb: 3 }}>
            <FormLabel
              sx={{
                color: "#333",
                "&.Mui-focused": {
                  color: BASE_COLOR,
                },
              }}
            >
              Department Type
            </FormLabel>

            <RadioGroup
              row
              name="department_type"
              value={formData.department_type}
              onChange={handleChange}
            >
              <FormControlLabel
                value="1"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: BASE_COLOR,
                      },
                    }}
                  />
                }
                label="Unit"
              />

              <FormControlLabel
                value="2"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: BASE_COLOR,
                      },
                    }}
                  />
                }
                label="Sub Account"
              />
            </RadioGroup>
          </FormControl>

          {/* Department Name */}
          <TextField
            fullWidth
            size="small"
            label="Department Name"
            name="department_name"
            value={formData.department_name}
            onChange={handleChange}
            required
            error={Boolean(errors.department_name)}
            helperText={errors.department_name}
            sx={{
              mb: 3,
              "& .MuiInputLabel-root.Mui-focused": {
                color: BASE_COLOR,
              },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: BASE_COLOR,
              },
            }}
          />

          {/* Description */}
          <TextField
            fullWidth
            multiline
            rows={4}
            size="small"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            sx={{
              mb: 3,
              "& .MuiInputLabel-root.Mui-focused": {
                color: BASE_COLOR,
              },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: BASE_COLOR,
              },
            }}
          />

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1.5,
              mt: 2,
            }}
          >
            <Button
              type="button"
              variant="outlined"
              onClick={handleCancel}
              sx={{
                color: "#555",
                borderColor: "#aaa",
                textTransform: "none",
              }}
            >
              Cancel
            </Button>

            <Button
              type="button"
              // name="action"
              // value="saveAndAddNew"
              onClick={() => handleSubmit("saveAndAddNew")}
              variant="outlined"
              sx={{
                color: BASE_COLOR,
                borderColor: BASE_COLOR,
                textTransform: "none",
                "&:hover": {
                  borderColor: BASE_COLOR,
                  backgroundColor: "rgba(146, 112, 10, 0.08)",
                },
              }}
            >
              Save & Add New
            </Button>

            <Button
              type="button"
              // name="action"
              // value="save"
              onClick={() => handleSubmit("save")}
              variant="contained"
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
        </Box>
      </Paper>
    </Box>
  );
}
