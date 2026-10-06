import { useEffect, useState } from "react";
import { createZones, getZones, updateZone } from "../../../api/zone_api";

import ReusableForm from "../../../utills/ResuableForm";
import { getRegions } from "../../../api/regions_api";
import { useParams } from "react-router-dom";

export default function CreateZone() {
  const { id } = useParams();
  const [region, setRegion] = useState([]);

  const fetchRegions = async () => {
    try {
      const response = await getRegions();
      setRegion(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRegions();
  }, []);

  return (
    <ReusableForm
      formName="Zone"
      dropdownName="region_name"
      dropdownLabel="Region"
      dropdownId="region_id"
      options={region}
      inputLabel="Zone Name"
      inputName="zone_name"
      descLabel="Zone Description"
      descName="zone_desc"
      postApi={createZones}
      getApi={getZones}
      updateApi={updateZone}
      route="/zones"
      itemId="zone_id"
      editId={id}
    />
  );
}
