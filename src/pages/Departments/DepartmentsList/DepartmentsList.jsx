import React, { useEffect, useState } from "react";
import ReusableList from "../../../utills/resuableList";
import { departments } from "../../../api/dropdowns_api";

function DepartmentsList() {
  const [dept, setDept] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDept = async () => {
      setLoading(true);
      try {
        const response = await departments();
        setDept(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDept();
    const handleRefresh = () => {
      fetchDept();
    };
    window.addEventListener("page-refresh", handleRefresh);
    return () => {
      window.removeEventListener("page-refresh", handleRefresh);
    };
  }, []);
  return (
    <ReusableList
      listName="Departments"
      data={dept}
      loading={loading}
      newBtn="Add Department"
      route="/departments/create"
    />
  );
}

export default DepartmentsList;
