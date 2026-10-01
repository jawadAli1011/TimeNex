import React, { useEffect, useState } from "react";
import ReusableForm from "../../../utills/ResuableForm";
import { getZones } from "../../../api/zone_api";
import { createBranches } from "../../../api/branches_api";
function NewBranches() {
  const [zone, setZone] = useState([]);

  const fetchZones = async () => {
    try {
      const response = await getZones();
      setZone(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchZones();
  }, []);

  return (
    <ReusableForm
      formName="Add Branch"
      dropdownName="zone_name"
      dropdownLabel="Please Select Zone"
      dropdownId="zone_id"
      options={zone}
      inputLabel="Branch Name"
      inputName="branch_name"
      descLabel="Branch Description"
      descName="branch_desc"
      postApi={createBranches}
      route="/branchs"
    />
  );
}

export default NewBranches;

// branch api
// zone api
// route
// formData
