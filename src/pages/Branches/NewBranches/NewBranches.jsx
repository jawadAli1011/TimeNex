import React, { useEffect, useState } from "react";
import ReusableForm from "../../../utills/ResuableForm";
import { getZones } from "../../../api/zone_api";
import {
  createBranches,
  getBranches,
  updateBranch,
} from "../../../api/branches_api";
import { useParams } from "react-router-dom";
function NewBranches() {
  const [zone, setZone] = useState([]);
  const { id } = useParams();

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
      formName="Branch"
      dropdownName="zone_name"
      dropdownLabel="Zone"
      dropdownId="zone_id"
      options={zone}
      inputLabel="Branch Name"
      inputName="branch_name"
      descLabel="Branch Description"
      descName="branch_desc"
      postApi={createBranches}
      getApi={getBranches}
      updateApi={updateBranch}
      route="/branchs"
      itemId="branch_id"
      editId={id}
    />
  );
}

export default NewBranches;
