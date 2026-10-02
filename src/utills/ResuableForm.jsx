// This form in used in the following form fields
// create Zone
// create branch
// create regions
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const BASE_COLOR = "#92700a";

export default function ReusableForm({
  formName,
  dropdownName,
  dropdownLabel,
  dropdownId,
  options = [],
  inputLabel,
  inputName,
  descLabel,
  descName,
  postApi,
  route,
}) {
  const navigate = useNavigate();
  const initialFormData = {
    [dropdownId]: "",
    [inputName]: "",
    [descName]: "",
    address_line_1: "",
    address_line_2: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData[inputName]?.trim()) {
      newErrors[inputName] = "Zone name is required";
    }

    if (!formData[dropdownId]) {
      newErrors[dropdownId] = "Region is required";
    }

    if (!formData.address_line_1?.trim()) {
      newErrors.address_line_1 = "Address 1 is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter?.value;

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      // region_name

      const payload = {
        [inputName]: formData[inputName],
        [descName]: formData[descName],
        // [dropdownName]: Number(formData[dropdownId]),
        [dropdownName === "region_name" ? dropdownName : dropdownId]: Number(
          formData[dropdownId],
        ),
        address1: formData.address_line_1,
        address2: formData.address_line_2,
      };
      console.log(payload);
      await postApi(payload);

      setFormData(initialFormData);

      if (action === "save") {
        navigate(route);
      }

      alert(` ${formData[inputName]} created successfully`);
    } catch (error) {
      console.error("Create zone error:", error);

      alert(error.response?.data?.message || "Failed to create zone");
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        maxWidth: 800,
        mx: "auto",
        mt: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 600,
        }}
      >
        {formName}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        {inputName !== "region_name" && (
          <TextField
            select
            fullWidth
            size="small"
            label={dropdownLabel}
            name={dropdownId}
            value={formData[dropdownId]}
            onChange={handleChange}
            error={Boolean(errors[dropdownId])}
            helperText={errors[dropdownId]}
            required
            sx={{
              mb: 2,
              "& .MuiInputLabel-root.Mui-focused": {
                color: BASE_COLOR,
              },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: BASE_COLOR,
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option[dropdownId]} value={option[dropdownId]}>
                {option[dropdownName]}
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          fullWidth
          size="small"
          label={inputLabel}
          name={inputName}
          value={formData[inputName]}
          onChange={handleChange}
          error={Boolean(errors[inputName])}
          helperText={errors[inputName]}
          required
          sx={{
            mb: 2,
            "& .MuiInputLabel-root.Mui-focused": {
              color: BASE_COLOR,
            },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: BASE_COLOR,
            },
          }}
        />

        {/* Zone Description */}
        <TextField
          fullWidth
          size="small"
          label={descLabel}
          name={descName}
          value={formData[descName]}
          onChange={handleChange}
          multiline
          rows={3}
          sx={{
            mb: 2,
            "& .MuiInputLabel-root.Mui-focused": {
              color: BASE_COLOR,
            },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: BASE_COLOR,
            },
          }}
        />

        {/* Address 1 */}
        <TextField
          fullWidth
          size="small"
          label="Address 1"
          name="address_line_1"
          value={formData.address_line_1}
          onChange={handleChange}
          error={Boolean(errors.address_line_1)}
          helperText={errors.address_line_1}
          required
          sx={{
            mb: 2,
            "& .MuiInputLabel-root.Mui-focused": {
              color: BASE_COLOR,
            },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: BASE_COLOR,
            },
          }}
        />

        {/* Address 2 */}
        <TextField
          fullWidth
          size="small"
          label="Address 2"
          name="address_line_2"
          value={formData.address_line_2}
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
            gap: 1,
          }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={() => handleCancel()}
            sx={{
              color: BASE_COLOR,
              borderColor: BASE_COLOR,
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            name="action"
            value="save"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: BASE_COLOR,
              "&:hover": {
                backgroundColor: "#735a08",
              },
            }}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button
            type="submit"
            name="action"
            value="saveandaddnew"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: BASE_COLOR,
              "&:hover": {
                backgroundColor: "#735a08",
              },
            }}
          >
            {loading ? "Saving..." : "Save And Add New"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
