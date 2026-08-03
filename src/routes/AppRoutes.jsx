import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import EmployeeList from "../pages/Employees/EmployeeList/EmployeeList";
import AddEmployee from "../pages/Employees/AddEmployee/AddEmployee";
// import EmployeeDetails from "../pages/Employees/EmployeeDetails";
import Attendance from "../pages/Attendance/Attendance";
import AttendanceHistory from "../pages/Attendance/AttendanceHistory";
import Location from "../pages/Location/Location";
import Departments from "../pages/Departments/Departments";
import Reports from "../pages/Reports/Reports";
import Settings from "../pages/Settings/Settings";
import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* Authentication */}

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Dashboard */}

      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="/employees">
          <Route path="list" element={<EmployeeList />} />
          <Route path="add" element={<AddEmployee />} />
          {/* <Route path=":id" element={<EmployeeDetails />} /> */}
        </Route>

        <Route path="/attendance">
          <Route index element={<Attendance />} />
          <Route path="history" element={<AttendanceHistory />} />
        </Route>

        <Route path="/locations" element={<Location />} />

        <Route path="/departments" element={<Departments />} />

        <Route path="/reports" element={<Reports />} />

        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* 404 */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
