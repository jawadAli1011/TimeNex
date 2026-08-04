import React from "react";
import AddEmpHeader from "./components/AddEmpHeader";
import EmpBasicInfo from "./components/EmpBasicInfo";
import DeptAndServiceInfo from "./components/DeptAndServiceInfo";
import RegionAndDemographics from "./components/RegionAndDemographics";
import TimeAndRoster from "./components/TimeAndRoster";

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
