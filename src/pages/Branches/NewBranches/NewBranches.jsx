import React from "react";
import ReusableForm from "../../../utills/ResuableForm";

function NewBranches() {
  return (
    <ReusableForm
      dropdownLabel="Please Select Zone"
      formName="Add Branch"
      initialData={{
        name: "",
        description: "",
        address1: "",
        address2: "",
      }}
    />
  );
}

export default NewBranches;
