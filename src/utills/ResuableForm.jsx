// This form in used in the following form fields
// create Zone
// create branch
// create regions
import { useEffect, useState } from "react";
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
  updateApi,
  getApi,
  route,
  itemId,
  editId,
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
  const isEditMode = Boolean(editId);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await getApi();

      const item = response.data.data.find(
        (i) => i[itemId] === parseInt(editId),
      );

      if (item) {
        setFormData({ ...item });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editId) {
      fetchItems();
    }
  }, [editId]);

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
      newErrors[inputName] = `${formName} name is required`;
    }

    if (formName !== "Region") {
      if (!formData[dropdownId]) {
        newErrors[dropdownId] = `${dropdownLabel} is required`;
      }
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

      const payloadZoneBranch = {
        [inputName]: formData[inputName],
        [descName]: formData[descName],
        [dropdownName === "region_name" ? dropdownName : dropdownId]: Number(
          formData[dropdownId],
        ),
        address_line_1: formData.address_line_1,
        address_line_2: formData.address_line_2,
      };

      const payloadForRegion = {
        region_name: formData.region_name,
        region_desc: formData.region_desc,
        address_line_1: formData.address_line_1,
        address_line_2: formData.address_line_2,
        region_status: 1,
      };

      const payload =
        formName === "Region" ? payloadForRegion : payloadZoneBranch;

      if (isEditMode) {
        await updateApi(editId, payload);
      } else {
        await postApi(payload);
      }

      setFormData(initialFormData);

      if (action === "save") {
        navigate(route);
      }

      alert(
        ` ${formData[inputName]} ${formName} ${isEditMode ? "updated" : "created"} successfully`,
      );
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || `Failed to create ${formName}`);
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#92700a]" />
      </div>
    );

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
        {`Add ${formName}`}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        {inputName !== "region_name" && (
          <TextField
            select
            fullWidth
            size="small"
            label={`Please Select ${dropdownLabel}`}
            name={dropdownId}
            value={formData[dropdownId] || ""}
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
          value={formData[inputName] || ""}
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
          value={formData[descName] || ""}
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
          value={formData.address_line_1 || ""}
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
          value={formData.address_line_2 || ""}
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
