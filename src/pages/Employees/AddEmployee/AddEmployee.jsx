import React from "react";
import AddEmpHeader from "./AddEmpHeader";
import EmpBasicInfo from "./EmpBasicInfo";
import DeptAndServiceInfo from "./DeptAndServiceInfo";
import RegionAndDemographics from "./RegionAndDemographics";
import TimeAndRoster from "./TimeAndRoster";

function AddEmployee() {
  return (
    <>
      <AddEmpHeader />

      <form id="addEmployeeForm" className="form-layout">
        {/* <!-- Section 1: Basic Information --> */}

        <EmpBasicInfo />

        {/* <!-- Section 2: Department & Service Information --> */}

        <DeptAndServiceInfo />

        {/* <!-- Section 3: Region & Demographics --> */}

        <RegionAndDemographics />

        {/* <!-- Section 4: Time & Roster Information --> */}
        <TimeAndRoster />
      </form>
    </>
  );
}

export default AddEmployee;
