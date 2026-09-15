import React from "react";
import ReusableForm from "../../../utills/ResuableForm";

function NewZone() {
  return (
    <ReusableForm
      formName="Add Zone"
      dropdownLabel="Please Select Region"
      initialData={{
        name: "",
        description: "",
        address1: "",
        address2: "",
      }}
    />
  );
}

export default NewZone;
