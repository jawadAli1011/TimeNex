import { Typography } from "@mui/material";

function AttendanceStatus({ status, inTime, outTime }) {
  function formatTime(time) {
    if (time === "--") return "--";
    const [hours, minutes] = time.split(":");

    let hour = Number(hours);
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${String(hour).padStart(2, "0")}:${minutes} ${ampm}`;
  }

  const statusMap = {
    present: { text: "P", color: "green" },
    absent: { text: "A", color: "red" },
    offday: { text: "OFF", color: "#777" },
    leave: { text: "L", color: "#ed6c02" },
    holiday: { text: "H", color: "#1976d2" },
  };

  const { text, color } = statusMap[status] || {
    text: status,
    color: "#777",
  };

  return (
    <Typography sx={{ fontSize: 10, fontWeight: "bold", color }}>
      {status != "late" && status != "present" && text}
      {status === "present" ||
        (status === "late" && (
          <span>
            <span
              style={{
                display: "block",
                fontSize: 9,
                fontWeight: "normal",
                // border: "2px solid black",
                paddingBottom: "8px",
              }}
            >
              {formatTime(inTime)}{" "}
            </span>
            <span
              style={{
                display: "block",
                fontSize: 9,
                fontWeight: "normal",
                // border: "2px solid black",
              }}
            >
              {formatTime(outTime)}
            </span>
          </span>
        ))}
    </Typography>
  );
}

export default AttendanceStatus;
