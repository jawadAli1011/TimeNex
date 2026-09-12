import React, { useContext, useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  CircularProgress,
  Button,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { getTimeCategories } from "../../../api/timeCategory_api";
import TimeCategoryActions from "../UpdateAndDelete/DeleteTC";
import UpdateTimeCategory from "../UpdateAndDelete/UpdateTC";
import AddIcon from "@mui/icons-material/Add";

const PRIMARY_COLOR = "#92700a";

const TimeCategoryList = ({ onEdit, onDelete }) => {
  const [timeCategories, setTimeCategories] = useState([]);
  const companyName = localStorage.getItem("currentUser");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =====================================================
  // FETCH TIME CATEGORIES
  // =====================================================

  const fetchTimeCategory = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getTimeCategories();
      setTimeCategories(response?.data?.data || []);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);

      setError(
        error.response?.data?.message || "Failed to fetch time categories.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeCategory();
    const handleRefresh = () => {
      fetchTimeCategory();
    };
    window.addEventListener("page-refresh", handleRefresh);
    return () => {
      window.removeEventListener("page-refresh", handleRefresh);
    };
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

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
              color: PRIMARY_COLOR,
            }}
          />
        </Box>
      </Paper>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      </Paper>
    );
  }

  // =====================================================
  // TABLE
  // =====================================================

  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AccessTimeIcon
            sx={{
              color: PRIMARY_COLOR,
            }}
          />

          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              color: PRIMARY_COLOR,
            }}
          >
            Time Categories
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate(route)}
          sx={{
            backgroundColor: "#92700a",
            whiteSpace: "nowrap",
            "&:hover": {
              backgroundColor: "#755b08",
            },
          }}
        >
          Add TimeCategory
        </Button>
      </Box>

      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <TableContainer>
        <Table>
          {/* ================================================= */}
          {/* TABLE HEAD */}
          {/* ================================================= */}

          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "rgba(146, 112, 10, 0.08)",
              }}
            >
              {/* S.NO */}
              <TableCell
                sx={{
                  fontWeight: 700,
                  width: 70,
                }}
              >
                S.No
              </TableCell>

              {/* TITLE */}
              <TableCell
                sx={{
                  fontWeight: 700,
                }}
              >
                Title
              </TableCell>

              {/* DEPARTMENT */}
              <TableCell
                sx={{
                  fontWeight: 700,
                }}
              >
                Department
              </TableCell>

              {/* TIME IN */}
              <TableCell
                sx={{
                  fontWeight: 700,
                }}
              >
                Time In
              </TableCell>

              {/* TIME OUT */}
              <TableCell
                sx={{
                  fontWeight: 700,
                }}
              >
                Time Out
              </TableCell>

              {/* GRACE TIME */}
              <TableCell
                sx={{
                  fontWeight: 700,
                }}
              >
                Grace Time
              </TableCell>

              {/* ACTION */}
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          {/* ================================================= */}
          {/* TABLE BODY */}
          {/* ================================================= */}

          <TableBody>
            {timeCategories?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                  sx={{
                    py: 5,
                  }}
                >
                  <Typography color="text.secondary">
                    No time categories found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              timeCategories?.map((category, index) => {
                return (
                  <TableRow
                    key={category.id || index}
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(146, 112, 10, 0.04)",
                      },
                    }}
                  >
                    {/* ================================================= */}
                    {/* S.NO */}
                    {/* ================================================= */}

                    <TableCell>{index + 1}</TableCell>

                    {/* ================================================= */}
                    {/* TITLE */}
                    {/* ================================================= */}

                    <TableCell>
                      <Typography fontWeight={600}>
                        {category.title || "--"}
                      </Typography>
                    </TableCell>

                    {/* ================================================= */}
                    {/* DEPARTMENT */}
                    {/* ================================================= */}

                    <TableCell>{companyName}</TableCell>

                    {/* ================================================= */}
                    {/* TIME IN */}
                    {/* ================================================= */}

                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <AccessTimeIcon
                          sx={{
                            fontSize: 18,
                            color: "#92700a",
                          }}
                        />

                        <Typography variant="body2" fontWeight={500}>
                          {category.tc_monday_in}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* ================================================= */}
                    {/* TIME OUT */}
                    {/* ================================================= */}

                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <AccessTimeIcon
                          sx={{
                            fontSize: 18,
                            color: "#92700a",
                          }}
                        />

                        <Typography variant="body2" fontWeight={500}>
                          {category.tc_monday_out}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* ================================================= */}
                    {/* GRACE TIME */}
                    {/* ================================================= */}

                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        {category.grace_time ?? 0}

                        <HourglassEmptyIcon
                          sx={{
                            fontSize: 18,
                            color: "#92700a",
                          }}
                        />
                      </Box>
                    </TableCell>

                    {/* ================================================= */}
                    {/* ACTION */}
                    {/* ================================================= */}
                    <TableCell>
                      <UpdateTimeCategory
                        category={category}
                        fetchTimeCategory={fetchTimeCategory}
                      />
                      <TimeCategoryActions
                        category={category}
                        fetchTimeCategory={fetchTimeCategory}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TimeCategoryList;
