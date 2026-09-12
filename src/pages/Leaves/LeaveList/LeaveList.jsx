import React, { useEffect, useState } from "react";
import { getLeavesTypes } from "../../../api/timeCategory_api";
import ReusableList from "../../../utills/resuableList";

function LeaveList() {
  const [leaveType, setLeaveType] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const response = await getLeavesTypes();
      setLeaveType(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);
  return (
    <ReusableList
      listName="Leaves"
      data={leaveType}
      loading={loading}
      newBtn="Add  Leave Type"
      route="/leaves/create"
    />
  );
}

export default LeaveList;
