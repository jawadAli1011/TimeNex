import React, { useEffect, useState } from "react";
import {
  Paper,
  CircularProgress,
  MenuItem,
  ListItemText,
  Select,
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { getMonthlyDetailReports } from "../../../api/reports_api";
import { departments } from "../../../api/dropdowns_api";
import MonthlyReportTable from "./MonthlyReportTable";

const BASE_COLOR = "#92700a";

/* --------------------------------
   Reusable Radio Group
--------------------------------- */
const ReportRadioGroup = ({ title, name, value, options, onChange }) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 500,
          mb: 0.3,
        }}
      >
        {title}
      </Typography>

      <RadioGroup row name={name} value={value || ""} onChange={onChange}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                size="small"
                sx={{
                  color: BASE_COLOR,
                  "&.Mui-checked": {
                    color: BASE_COLOR,
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: 18,
                  },
                }}
              />
            }
            label={option.label}
            sx={{
              mr: 1,
              "& .MuiFormControlLabel-label": {
                fontSize: "12px",
                fontWeight: 500,
              },
            }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

function MonthlyDetails() {
  /* --------------------------------
     Dates
  --------------------------------- */
  const today = new Date();

  const firstDayOfMonth = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-01`;

  const currentDay = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  /* --------------------------------
     State
  --------------------------------- */
  const [fromDate, setFromDate] = useState(firstDayOfMonth);
  const [toDate, setToDate] = useState(currentDay);

  const [departmentsList, setDepartmentsList] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");

  const [selectedCols, setSelectedCols] = useState([]);

  const [reportType, setReportType] = useState("detailed");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [orderType, setOrderType] = useState("asc");

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  /* --------------------------------
     Report Columns
  --------------------------------- */
  const columnNames = [
    "PRESENT",
    "OFFDAY",
    "LATE",
    "EARLYOUT",
    "ABSENT",
    "LEAVE",
    "ATTACH",
    "HOLIDAY",
    "ADDLHOURS",
    "EXPHOURS",
    "HRSWORKED",
    "OVERTIME",
    "% ATTEND",
  ];

  /* --------------------------------
     Radio Options
  --------------------------------- */
  const reportTypeOptions = [
    {
      value: "detailed",
      label: "Detailed",
    },
    {
      value: "summary",
      label: "Summary",
    },
  ];

  const statusOptions = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "present",
      label: "Present",
    },
    {
      value: "absent",
      label: "Absent",
    },
    {
      value: "late",
      label: "Late",
    },
  ];

  const sortOptions = [
    {
      value: "id",
      label: "ID",
    },
    {
      value: "empName",
      label: "EmpName",
    },
    {
      value: "payScale",
      label: "PayScale",
    },
  ];

  const orderOptions = [
    {
      value: "asc",
      label: "ASC",
    },
    {
      value: "dec",
      label: "DEC",
    },
  ];

  /* --------------------------------
     Common Select Styles
  --------------------------------- */
  const selectStyle = {
    height: 38,
    fontSize: "12px",

    "& .MuiSelect-select": {
      height: "36px",
      boxSizing: "border-box",
      padding: "0 10px !important",
      display: "flex",
      alignItems: "center",
      fontSize: "12px",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ccc",
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000",
      borderWidth: "2px",
    },

    "& .MuiSelect-icon": {
      fontSize: "20px",
    },
  };

  /* --------------------------------
     Menu Styles
  --------------------------------- */
  const menuProps = {
    slotProps: {
      paper: {
        style: {
          maxHeight: 48 * 4.5 + 8,
          width: 190,
        },
      },
    },
  };

  /* --------------------------------
     Input Styles
  --------------------------------- */
  const inputStyle = {
    display: "block",
    width: "190px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
    fontSize: "12px",
    outline: "none",
  };

  /* --------------------------------
     Fetch Departments
  --------------------------------- */
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await departments();

        setDepartmentsList(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  /* --------------------------------
     Department Change
  --------------------------------- */
  const handleDeptChange = (event) => {
    setSelectedDept(event.target.value);
  };

  /* --------------------------------
     Column Change
  --------------------------------- */
  const handleColumnChange = (event) => {
    const { value } = event.target;

    setSelectedCols(typeof value === "string" ? value.split(",") : value);
  };

  /* --------------------------------
     Generate Report
  --------------------------------- */
  const handleGenerateReport = async () => {
    try {
      setLoading(true);

      const payload = {
        department_id: selectedDept || "all",
        from_date: fromDate,
        to_date: toDate,
        report_type: reportType,
        status,
        orderby: sortBy,
        ordertype: orderType,
      };

      const response = await getMonthlyDetailReports(payload);

      setReport(response.data.data);
    } catch (error) {
      console.error("Monthly report error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* ============================
          FILTER PANEL
      ============================= */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          border: "1px solid #ddd",
          borderRadius: 2,
        }}
      >
        {/* ============================
            TOP FILTERS
        ============================= */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 2,
            flexWrap: "wrap",
            py: 1,
          }}
        >
          {/* Department */}
          <Box sx={{ width: 190 }}>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              Select Department
            </Typography>

            <FormControl fullWidth>
              <Select
                value={selectedDept}
                displayEmpty
                onChange={handleDeptChange}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span style={{ color: "#999" }}>Select Department</span>
                    );
                  }

                  const department = departmentsList.find(
                    (item) => item.id === selected,
                  );

                  return department?.name || "";
                }}
                sx={selectStyle}
                MenuProps={menuProps}
              >
                {departmentsList.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* From Date */}
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              From Date
            </Typography>

            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={inputStyle}
            />
          </Box>

          {/* To Date */}
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              To Date
            </Typography>

            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={inputStyle}
            />
          </Box>

          {/* Service Scale */}
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              Service Scale
            </Typography>

            <input type="text" placeholder="Service Scale" style={inputStyle} />
          </Box>

          {/* Select Columns */}
          <FormControl sx={{ width: 190 }}>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              Select Columns
            </Typography>

            <Select
              multiple
              value={selectedCols}
              onChange={handleColumnChange}
              displayEmpty
              renderValue={(selected) => {
                if (!selected.length) {
                  return <span style={{ color: "#999" }}>Select Columns</span>;
                }

                return selected.join(", ");
              }}
              MenuProps={menuProps}
              sx={selectStyle}
            >
              {columnNames.map((name) => {
                const isSelected = selectedCols.includes(name);

                const SelectionIcon = isSelected
                  ? CheckBoxIcon
                  : CheckBoxOutlineBlankIcon;

                return (
                  <MenuItem key={name} value={name}>
                    <SelectionIcon
                      fontSize="small"
                      sx={{
                        mr: 0.5,
                        fontSize: 17,
                      }}
                    />

                    <ListItemText
                      primary={name}
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontSize: "11px",
                        },
                      }}
                    />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        {/* ============================
            RADIO FILTERS
        ============================= */}
        <Box sx={{ py: 2 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <ReportRadioGroup
              title="Order"
              name="ordertype"
              value={orderType}
              options={orderOptions}
              onChange={(e) => setOrderType(e.target.value)}
            />

            <ReportRadioGroup
              title="Report Type"
              name="report_type"
              value={reportType}
              options={reportTypeOptions}
              onChange={(e) => setReportType(e.target.value)}
            />

            <ReportRadioGroup
              title="Status"
              name="status"
              value={status}
              options={statusOptions}
              onChange={(e) => setStatus(e.target.value)}
            />

            <ReportRadioGroup
              title="Sort By"
              name="orderby"
              value={sortBy}
              options={sortOptions}
              onChange={(e) => setSortBy(e.target.value)}
            />
          </Box>
        </Box>

        {/* ============================
            GENERATE BUTTON
        ============================= */}
        <Box sx={{ mt: 1 }}>
          <button
            onClick={handleGenerateReport}
            style={{
              padding: "8px 16px",
              background: BASE_COLOR,
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            Generate Report
          </button>
        </Box>
      </Paper>

      {/* ============================
          LOADING
      ============================= */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 4,
          }}
        >
          <CircularProgress size={28} />
        </Box>
      )}

      {/* ============================
          REPORT TABLE
      ============================= */}
      {!loading && report && (
        <MonthlyReportTable
          BASE_COLOR={BASE_COLOR}
          report={report}
          selectedCols={selectedCols}
        />
      )}
    </Box>
  );
}

export default MonthlyDetails;
