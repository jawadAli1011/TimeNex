import React from "react";
import { getEmpData } from "../../api/emp_api";

function FetchEmployee() {
  const fetchEmployee = async () => {
    try {
      const response = await getEmpData();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  fetchEmployee();
  return <div>FetchEmployee</div>;
}

export default FetchEmployee;
