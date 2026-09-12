import React, { useMemo, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const PRIMARY_COLOR = "#92700a";

const ReusableList = ({
  listName = "List",
  data = [],
  newBtn,
  route,
  loading = false,
  onAdd,
  onEdit,
  onDelete,
}) => {
  // const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // =====================================================
  // SEARCH DATA
  // =====================================================

  // const filteredData = useMemo(() => {
  //   if (!search.trim()) {
  //     return data;
  //   }

  //   const searchValue = search.toLowerCase();

  //   return data.filter((item) => {
  //     const title = item.title?.toString().toLowerCase() || "";

  //     const description = item.description?.toString().toLowerCase() || "";

  //     return title.includes(searchValue) || description.includes(searchValue);
  //   });
  // }, [data, search]);

  // =====================================================
  // SEARCH CHANGE
  // =====================================================

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

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

          justifyContent: "space-between",

          alignItems: "center",

          gap: 2,

          borderBottom: "1px solid #ddd",

          flexWrap: "wrap",
        }}
      >
        {/* TITLE */}

        <Typography
          variant="h6"
          fontWeight={600}
          sx={{
            color: PRIMARY_COLOR,
          }}
        >
          {listName}
        </Typography>

        {/* SEARCH + ADD */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,

            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          {/* SEARCH */}

          <TextField
            size="small"
            placeholder="Search..."
            // value={search}
            onChange={handleSearch}
            sx={{
              width: {
                xs: "100%",
                sm: 250,
              },

              "& .MuiOutlinedInput-root": {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: PRIMARY_COLOR,
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: PRIMARY_COLOR,
                },
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: PRIMARY_COLOR,
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color: PRIMARY_COLOR,
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* ADD BUTTON */}

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate(route)}
            sx={{
              backgroundColor: PRIMARY_COLOR,

              whiteSpace: "nowrap",

              "&:hover": {
                backgroundColor: "#755b08",
              },
            }}
          >
            {newBtn}
          </Button>
        </Box>
      </Box>

      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <TableContainer
        sx={{
          overflowX: "auto",
        }}
      >
        <Table
          sx={{
            minWidth: 650,
          }}
        >
          {/* ================================================= */}
          {/* TABLE HEAD */}
          {/* ================================================= */}

          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "rgba(146, 112, 10, 0.08)",
              }}
            >
              <TableCell
                sx={{
                  fontWeight: 700,
                  width: 80,
                }}
              >
                S.No
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 700,
                }}
              >
                Title
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 700,
                }}
              >
                {listName === "Leaves" ? "Leave Type" : "Description"}
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  width: 150,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          {/* ================================================= */}
          {/* TABLE BODY */}
          {/* ================================================= */}

          <TableBody>
            {/* LOADING */}

            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{
                    py: 5,
                  }}
                >
                  <CircularProgress
                    size={30}
                    sx={{
                      color: PRIMARY_COLOR,
                    }}
                  />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              /* EMPTY */
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{
                    py: 5,
                  }}
                >
                  <Typography color="text.secondary">
                    {/* {search */}
                    {/* ? "No matching records found." */}: "No records found."
                    {/* } */}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              /* DATA */
              data.map((item, index) => (
                <TableRow
                  key={item.id ?? index}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(146, 112, 10, 0.04)",
                    },
                  }}
                >
                  {/* S.NO */}

                  <TableCell>{index + 1}</TableCell>

                  {/* TITLE */}

                  <TableCell>
                    <Typography fontWeight={600}>
                      {item.name ||
                        item.title ||
                        item.region_name ||
                        item.zone_name ||
                        item.branch_name ||
                        "--"}
                    </Typography>
                  </TableCell>

                  {/* DESCRIPTION */}

                  <TableCell>
                    <Typography
                      color="text.secondary"
                      sx={{
                        maxWidth: 500,

                        overflow: "hidden",

                        textOverflow: "ellipsis",

                        whiteSpace: "nowrap",
                      }}
                    >
                      {listName === "Leaves"
                        ? item.leave_type === 1
                          ? "Fixed"
                          : "Variable"
                        : item.description || item.region_desc || "--"}
                    </Typography>
                  </TableCell>

                  {/* ACTIONS */}

                  <TableCell align="center">
                    {/* UPDATE */}

                    <Tooltip title="Update">
                      <IconButton
                        size="small"
                        onClick={() => onEdit?.(item)}
                        sx={{
                          color: PRIMARY_COLOR,

                          mr: 0.5,

                          "&:hover": {
                            backgroundColor: "rgba(146, 112, 10, 0.12)",
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    {/* DELETE */}

                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => onDelete?.(item)}
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ReusableList;
