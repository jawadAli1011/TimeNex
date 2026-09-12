import React, { useEffect, useState } from "react";
import AddEmpHeader from "./components/EmpFormHeader";
import EmpBasicInfo from "./components/EmpBasicInfo";
import DeptAndServiceInfo from "./components/DeptAndServiceInfo";
import RegionAndDemographics from "./components/RegionAndDemographics";
import TimeAndRoster from "./components/TimeAndRoster";
import { createEmp, getEmpData, updateEmp } from "../../../api/emp_api";
import { useParams } from "react-router-dom";
import PageLoader from "../../../components/Loading";

function EmployeeForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    father_name: "",
    cnic: "",
    marital_status: "",
    blood_group: "",
    reg_date: "",
    cnic_issue_date: "",
    cnic_expiry_date: "",
    dob: "",

    gender: "",

    email: "",
    password: "",

    role_id: "",
    term_id: 0,
    academic_module_id: null,

    department_id: "",
    file_number: "",
    bps: "",
    employment_type: "",
    designation_id: "",

    fixed_salary: "",
    salary_hour_rate: "",

    region_id: "",
    zone_id: "",
    branch_id: "",

    tcat_id: "",

    mobile_number: "",
    mob_number_2: "",
    land_line_number: "",

    address: "",
    overtime_allowed: "Not Allowed",

    reporting_to: "",
    leaves: [
      {
        leave_type_id: "1",
        total_leaves: "",
      },
    ],
  });
  console.log(formData);

  // reporting_to
  // term_id

  const fetchEmployeeData = async () => {
    try {
      setLoading(true);
      const response = await getEmpData();
      const employee = response.data.data.find(
        (emp) => emp.id === parseInt(id),
      );

      if (employee) {
        setFormData({ ...employee });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      fetchEmployeeData();
    }
  }, [isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateEmp(id, formData);
      } else {
        await createEmp(formData);
      }
    } catch (error) {
      console.log(error);
      console.log("Status:", error.response?.status);
      console.log("Backend error:", error.response?.data);
    }
  };
  if (loading) return <PageLoader />;

  return (
    <>
      <AddEmpHeader handleSubmit={handleSubmit} isEditMode={isEditMode} />

      <form id="addEmployeeForm" className="form-layout">
        {/* <!-- Section 1: Basic Information --> */}

        <EmpBasicInfo handleChange={handleChange} formData={formData} />

        {/* <!-- Section 2: Department & Service Information --> */}

        <DeptAndServiceInfo setFormData={setFormData} formData={formData} />

        {/* <!-- Section 3: Region & Demographics --> */}

        <RegionAndDemographics
          handleChange={handleChange}
          formData={formData}
        />

        {/* <!-- Section 4: Time & Roster Information --> */}
        <TimeAndRoster
          formData={formData}
          handleChange={handleChange}
          setFormData={setFormData}
        />
      </form>
    </>
  );
}

export default EmployeeForm;
