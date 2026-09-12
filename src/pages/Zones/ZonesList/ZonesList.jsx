import React, { useEffect, useState } from "react";
import { getZones } from "../../../api/zone_api";
import ReusableList from "../../../utills/resuableList";

function ZonesList() {
  const [zones, setZones] = useState([]);
  const fetchZones = async () => {
    try {
      const response = await getZones();
      setZones(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchZones();
  }, []);
  return (
    <ReusableList
      listName="Zones"
      data={zones}
      newBtn="Add Zone"
      route="/zones/create"
    />
  );
}

export default ZonesList;
