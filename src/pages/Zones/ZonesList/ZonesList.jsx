import React, { useEffect, useState } from "react";
import { getZones } from "../../../api/zone_api";
import ReusableList from "../../../utills/resuableList";

function ZonesList() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchZones = async () => {
    try {
      setLoading(true);
      const response = await getZones();
      setZones(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchZones();
    const handleRefresh = () => {
      fetchZones();
    };
    window.addEventListener("page-refresh", handleRefresh);
    return () => {
      window.removeEventListener("page-refresh", handleRefresh);
    };
  }, []);
  return (
    <ReusableList
      listName="Zones"
      data={zones}
      loading={loading}
      newBtn="Add Zone"
      route="/zones/create"
    />
  );
}

export default ZonesList;
