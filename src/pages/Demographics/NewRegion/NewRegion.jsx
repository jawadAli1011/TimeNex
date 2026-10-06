import { useEffect, useState } from "react";
import ReusableForm from "../../../utills/ResuableForm";
import {
  createRegion,
  getRegions,
  updateRegion,
} from "../../../api/regions_api";
import { useParams } from "react-router-dom";

export default function CreateRegion() {
  const { id } = useParams();

  return (
    <ReusableForm
      formName="Region"
      inputLabel="Region Name"
      inputName="region_name"
      descLabel="Region Description"
      descName="region_desc"
      postApi={createRegion}
      getApi={getRegions}
      updateApi={updateRegion}
      route="/regions"
      itemId="region_id"
      editId={id}
    />
  );
}
