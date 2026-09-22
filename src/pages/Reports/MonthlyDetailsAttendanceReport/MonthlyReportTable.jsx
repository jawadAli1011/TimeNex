import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import AttendanceStatus from "./AttendanceStatus";

function MonthlyReportTable({ BASE_COLOR, report, selectedCols }) {
  const { columns, users, filters } = report;

  function formatDate(date) {
    const day = date.split("-")[2];
    return day;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <TableContainer
        sx={{
          maxHeight: "70vh",
          overflowX: "auto",
        }}
      >
        <Table
          stickyHeader
          size="small"
          sx={
            {
              // minWidth: 1300,
            }
          }
        >
          {/* HEADER */}
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  minWidth: 95,
                  backgroundColor: BASE_COLOR,
                  color: "#fff",
                }}
              >
                USER ID
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: "bold",
                  minWidth: 140,
                  backgroundColor: BASE_COLOR,
                  color: "#fff",
                }}
              >
                NAME
              </TableCell>
              {filters.report_type === "detailed" && (
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    //   minWidth: 140,
                    backgroundColor: BASE_COLOR,
                    color: "#fff",
                  }}
                >
                  IN/OUT
                </TableCell>
              )}
              {/* Dynamic Date Columns */}
              {filters.report_type === "detailed" &&
                columns.map((date) => (
                  <TableCell
                    key={date}
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: BASE_COLOR,
                      color: "#fff",
                    }}
                  >
                    {formatDate(date)}
                  </TableCell>
                ))}
              {selectedCols.map((col) => (
                <TableCell
                  align="center"
                  key={col}
                  sx={{
                    // minWidth: 120,
                    fontWeight: "bold",
                    backgroundColor: BASE_COLOR,
                    color: "#fff",
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* BODY */}
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.user_id} hover>
                {/* USER ID */}
                <TableCell>{user.user_id}</TableCell>

                {/* NAME */}
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {user.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 11,
                      color: "text.secondary",
                    }}
                  >
                    {user.designation}
                  </Typography>
                </TableCell>
                {filters.report_type === "detailed" && (
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "text.secondary",
                        //   borderBottom: "1px solid #ccc",
                        paddingBottom: "8px",
                      }}
                    >
                      IN
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "text.secondary",
                      }}
                    >
                      OUT
                    </Typography>
                  </TableCell>
                )}

                {/* DYNAMIC DAYS */}
                {filters.report_type === "detailed" &&
                  columns.map((date) => {
                    const record = user.records.find(
                      (item) => item.date === date,
                    );

                    return (
                      <TableCell
                        key={date}
                        align="center"
                        sx={{
                          px: 0,
                        }}
                      >
                        {record ? (
                          <AttendanceStatus
                            status={record.status}
                            inTime={record.in}
                            outTime={record.out}
                          />
                        ) : (
                          "--"
                        )}
                      </TableCell>
                    );
                  })}

                {/* SUMMARY */}
                {selectedCols.map((col) => (
                  <TableCell key={col} align="center">
                    {col === "PRESENT" &&
                      (user.summary?.present + user.summary?.late ?? 0)}
                    {col === "ABSENT" && (user.summary?.absent ?? 0)}
                    {col === "LATE" && (user.summary?.late ?? 0)}
                    {col === "LEAVE" && (user.summary?.leave ?? 0)}
                    {col === "ATTACH" && (user.summary?.attach ?? 0)}
                    {col === "HOLIDAY" && (user.summary?.holiday ?? 0)}
                    {col === "OFFDAY" && (user.summary?.off_day ?? 0)}
                    {col === "EARLYOUT" && (user.summary?.early_out ?? 0)}
                    {col === "% ATTEND" && (user.summary?.att_perc ?? 0)}
                    {col === "OVERTIME" && (user.summary?.overtime ?? 0)}
                    {col === "HRSWORKED" && (user.summary?.hrs_worked ?? 0)}
                    {col === "EXPHOURS" && (user.summary?.exp_hours ?? 0)}
                    {col === "ADDLHOURS" && (user.summary?.addl_hours ?? 0)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default MonthlyReportTable;
