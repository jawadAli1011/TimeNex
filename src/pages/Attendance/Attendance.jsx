// import React from "react";
// import { useState } from "react";
// import { getAttendance } from "../../api/attendance_api";
// import { useEffect } from "react";

function Attendance() {
  // const [attendance, setAttendance] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchAttendance();
  // }, []);

  // const fetchAttendance = async () => {
  //   setLoading(true);
  //   try {
  //     const payload = {
  //       att_date: "2026-04-18",
  //       token: "20260418ATT000",
  //       devices: JSON.stringify(["DWE12332H01", "CEXJ224860117"]),
  //     };

  //     const response = await getAttendance(payload);
  //     setAttendance(response.data);
  //   } catch (error) {
  //     console.error("Error fetching attendance:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return <div>Attendance</div>;
}

export default Attendance;
