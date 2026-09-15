import React from "react";
import ReusableForm from "../../../utills/ResuableForm";

function NewRegion() {
  return (
    <ReusableForm
      formName="Add Region"
      initialData={{
        name: "",
        description: "",
        address1: "",
        address2: "",
      }}
    />
  );
}

export default NewRegion;
