import React, { useEffect, useState } from "react";
import ReusableList from "../../../utills/resuableList";
import { deleteRegion, getRegions } from "../../../api/regions_api";

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
      listName="Regions"
      data={region}
      loading={loading}
      newBtn="Add Region"
      route="/regions/create"
      itemId="region_id"
      itemName="region_name"
      dialogTitle="Delete Region"
      deleteApi={deleteRegion}
      refreshApi={fetchRegions}
      editRoute="/regions/"
    />
  );
}

export default RegionList;
