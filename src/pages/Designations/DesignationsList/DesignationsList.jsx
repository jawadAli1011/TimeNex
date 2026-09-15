import React, { useEffect, useState } from "react";
import ReusableList from "../../../utills/resuableList";
import { designations } from "../../../api/dropdowns_api";

function DesignationsList() {
  const [desig, setDesig] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(desig);
  const fetchDesig = async () => {
    setLoading(true);
    try {
      const response = await designations();
      setDesig(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesig();
    const handleRefresh = () => {
      fetchDesig();
    };

    window.addEventListener("page-refresh", handleRefresh);

    return () => {
      window.removeEventListener("page-refresh", handleRefresh);
    };
  }, []);
  return (
    <ReusableList
      listName="Designations"
      data={desig}
      loading={loading}
      newBtn="Add Designation"
      route="/designations/create"
    />
  );
}

export default DesignationsList;
