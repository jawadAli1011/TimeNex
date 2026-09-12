import React, { useEffect, useState } from "react";
import ReusableList from "../../../utills/resuableList";
import { getRegions } from "../../../api/dropdowns_api";

function RegionList() {
  const [region, setRegion] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchRegions = async () => {
    setLoading(true);
    try {
      const response = await getRegions();
      setRegion(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRegions();
  }, []);
  return (
    <ReusableList
      listName="Roles"
      data={region}
      loading={loading}
      newBtn="Add Region"
      route="/regions/create"
    />
  );
}

export default RegionList;
