import { useEffect, useState } from "react";
import { createZones } from "../../../api/zone_api";
import { getRegions } from "../../../api/dropdowns_api";
import ReusableForm from "../../../utills/ResuableForm";

export default function CreateZone() {
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
      formName="Add Zone"
      dropdownName="region_name"
      dropdownLabel="Please Select Region"
      dropdownId="region_id"
      options={region}
      inputLabel="Zone Name"
      inputName="Zone_name"
      descLabel="Zone Description"
      descName="Zone_desc"
      postApi={createZones}
      route="/zones"
    />
  );
}
