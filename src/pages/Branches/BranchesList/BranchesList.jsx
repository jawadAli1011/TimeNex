import React, { useEffect, useState } from "react";
import { getBranches } from "../../../api/branches_api";
import ReusableList from "../../../utills/resuableList";

function BranchesList() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(branches);
  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await getBranches();
      setBranches(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <ReusableList
      listName="Branches"
      data={branches}
      loading={loading}
      newBtn="Add Branch"
      route="/branchs/create"
    />
  );
}

export default BranchesList;
