import React from "react";

function ListFilter() {
  return (
    <div className="flex gap-3 mb-5 flex-wrap">
      <div className="flex-1 min-w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email or ID..."
        />
      </div>
      <div className="w-40 ">
        <select className="form-control">
          <option>All Departments</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Sales</option>
          <option>Marketing</option>
          <option>Support</option>
        </select>
      </div>
      <div className="w-40">
        <select className="form-control">
          <option>All Roles</option>
          <option>Executive</option>
          <option>Managerial</option>
          <option>Professional</option>
          <option>Operational</option>
        </select>
      </div>
      <div className="w-35  p-2">
        <select className="form-control">
          <option>All Status</option>
          <option>Active</option>
          <option>On Leave</option>
          <option>Inactive</option>
        </select>
      </div>
      <button className="btn btn-secondary">Filter</button>
    </div>
  );
}

export default ListFilter;
