import { useEffect, useState } from "react";
import { createZones } from "../../../api/zone_api";
import { getRegions } from "../../../api/dropdowns_api";
import ReusableForm from "../../../utills/ResuableForm";
import { createBranches } from "../../../api/branches_api";

export default function CreateRegion() {
  return (
    <h1>create Region</h1>
    // <ReusableForm
    //   formName="Add Region"
    //   inputLabel="Region Name"
    //   inputName="region_name"
    //   descLabel="Region Description"
    //   descName="region_desc"
    //   postApi={createBranches}
    //   route="/branchs"
    // />
  );
}
