import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import EmployeeList from "../pages/Employees/EmployeeList/EmployeeList";
import AddEmployee from "../pages/Employees/AddEmployee/AddEmployee";
// import EmployeeDetails from "../pages/Employees/EmployeeDetails";
// import Attendance from "../pages/Attendance/Attendance";
// import AttendanceHistory from "../pages/Attendance/components/AttendanceHistory";
import Location from "../pages/Location/Location";
import Departments from "../pages/Departments/DepartmentsList/DepartmentsList";
import Reports from "../pages/Reports/Reports";
import Settings from "../pages/Settings/Settings";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import DesignationsList from "../pages/designations/designationsList/DesignationsList";
import NewDesignations from "../pages/designations/newDesignation/NewDesignations";
import TimeCategoriesList from "../pages/TimeCategories/TimeCategoriesList/TimeCategoriesList";
import NewTimeCategories from "../pages/TimeCategories/NewTimeCategory/NewTimeCategories";
import RostersList from "../pages/Rosters/RostersList/RostersList";
import NewRoster from "../pages/Rosters/NewRoster/NewRoster";
import LeaveRequestsList from "../pages/LeaveRequests/LeaveRequestsList/LeaveRequestsList";
import NewLeaveRequests from "../pages/LeaveRequests/NewLeaveRequests/NewLeaveRequests";
import AttachEmpList from "../pages/AttachEmployee/AttachEmpList/AttachEmpList";
import NewAttachEmp from "../pages/AttachEmployee/NewAttachEmp/NewAttachEmp";
import DepartmentsList from "../pages/Departments/DepartmentsList/DepartmentsList";
import NewDepartment from "../pages/Departments/NewDepartment/NewDepartment";
import RegionList from "../pages/Demographics/RegionsList/RegionList";
import NewRegion from "../pages/Demographics/NewRegion/NewRegion";
import ZonesList from "../pages/Zones/ZonesList/ZonesList";
import NewZone from "../pages/Zones/NewZone/NewZone";
import BranchesList from "../pages/Branches/BranchesList/BranchesList";
import NewBranches from "../pages/Branches/NewBranches/NewBranches";
import DevicesList from "../pages/Devices/DevicesList/DevicesList";
import NewDevice from "../pages/Devices/NewDevice/NewDevice";
import LeaveList from "../pages/Leaves/LeaveList/LeaveList";
import NewLeave from "../pages/Leaves/NewLeave/NewLeave";
// import AttendanceStatusReports from "../pages/Reports/AttendanceStatusReports";
import IndividualReports from "../pages/Reports/IndividualReports";
import MonthlyDetailedAttendance from "../pages/Reports/MonthlyDetailedAttendance";
import LeavesReport from "../pages/Reports/LeavesReport";
import IndividualsPayroll from "../pages/Reports/IndividualsPayroll";
import MonthlyPayroll from "../pages/Reports/MonthlyPayroll";
import MonthlyClassicalReport from "../pages/Reports/MonthlyClassicalReport";
import InactiveEmployee from "../pages/Employees/InactiveEmployee/InactiveEmployee";
import MarkAttendance from "../pages/Employees/MarkAttendance/MarkAttendance";
import HolidayCalendar from "../pages/Holidays/HolidayCalendar/HolidayCalendar";
import HolidaysList from "../pages/Holidays/HolidaysList/HolidaysList";
import NewHoliday from "../pages/Holidays/NewHoliday/NewHoliday";
import NewBonusDed from "../pages/EmpBounsDed/NewBonusDed/NewBonusDed";
import BonusDedList from "../pages/EmpBounsDed/BonusDedList/BonusDedList";
import NewDayOff from "../pages/EmpDedicatedOff/NewDayOff/NewDayOff";
import DayOffList from "../pages/EmpDedicatedOff/DayOffList/DayOffList";
import AllowancesList from "../pages/Allowances/AllowancesList/AllowancesList";
import NewAllowance from "../pages/Allowances/NewAllowance/NewAllowance";
import DeductionsList from "../pages/Deductions/DeductionsList/DeductionsList";
import NewDeduction from "../pages/Deductions/NewDeduction/NewDeduction";
import LoansList from "../pages/Loans/Loans/LoansList";
import Advances from "../pages/Advances/AdvancesList/AdvancesList";
import ModulesList from "../pages/AcademicModules/ModulesList/ModulesList";

function AppRoutes() {
  return (
    <Routes>
      {/* Authentication */}

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Route>

      {/* Dashboard protected routes */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />

        <Route path="/designations">
          <Route index element={<DesignationsList />} />
          <Route path="create" element={<NewDesignations />} />
        </Route>

        <Route path="/timecategories">
          <Route index element={<TimeCategoriesList />} />
          <Route path="create" element={<NewTimeCategories />} />
        </Route>

        <Route path="/roasters">
          <Route index element={<RostersList />} />
          <Route path="create" element={<NewRoster />} />
        </Route>

        <Route path="/leaverequests">
          <Route index element={<LeaveRequestsList />} />
          <Route path="create" element={<NewLeaveRequests />} />
        </Route>

        <Route path="/attachemployees">
          <Route index element={<AttachEmpList />} />
          <Route path="create" element={<NewAttachEmp />} />
        </Route>

        <Route path="/departments">
          <Route index element={<DepartmentsList />} />
          <Route path="create" element={<NewDepartment />} />
        </Route>

        <Route path="/regions">
          <Route index element={<RegionList />} />
          <Route path="create" element={<NewRegion />} />
        </Route>

        <Route path="/zones">
          <Route index element={<ZonesList />} />
          <Route path="create" element={<NewZone />} />
        </Route>

        <Route path="/branchs">
          <Route index element={<BranchesList />} />
          <Route path="create" element={<NewBranches />} />
        </Route>

        <Route path="/devices">
          <Route index element={<DevicesList />} />
          <Route path="create" element={<NewDevice />} />
        </Route>

        <Route path="/leaves">
          <Route index element={<LeaveList />} />
          <Route path="create" element={<NewLeave />} />
        </Route>

        <Route>
          <Route path="/report" element={<Reports />} />
          <Route path="/individual_report" element={<IndividualReports />} />
          <Route
            path="/monthly_details_attendance"
            element={<MonthlyDetailedAttendance />}
          />
          <Route path="/employee_leave_reports" element={<LeavesReport />} />
          <Route path="/individual_payroll" element={<IndividualsPayroll />} />
          <Route path="/monthly_payroll_report" element={<MonthlyPayroll />} />
          <Route
            path="/datewise_attendance_compliance"
            element={<MonthlyClassicalReport />}
          />
        </Route>

        <Route>
          <Route path="/users" element={<EmployeeList />} />
          <Route path="/empreg/step1" element={<AddEmployee />} />
          <Route path="/inactives" element={<InactiveEmployee />} />
          <Route path="/marks_attendance" element={<MarkAttendance />} />
        </Route>

        <Route>
          <Route path="/holiday_calendar" element={<HolidayCalendar />} />
          <Route path="/holidays/create" element={<NewHoliday />} />
          <Route path="/holidays" element={<HolidaysList />} />
        </Route>

        <Route>
          <Route path="/employees_bonuses" element={<BonusDedList />} />
          {/* <Route path="" element={<NewBonusDed />} /> */}
        </Route>

        <Route path="/day_off">
          <Route index element={<DayOffList />} />
          <Route path="create" element={<NewDayOff />} />
        </Route>

        <Route path="/allowances">
          <Route index element={<AllowancesList />} />
          <Route path="create" element={<NewAllowance />} />
        </Route>

        <Route path="/deductions">
          <Route index element={<DeductionsList />} />
          <Route path="create" element={<NewDeduction />} />
        </Route>

        <Route path="/loan">
          <Route index element={<LoansList />} />
        </Route>

        <Route path="/advances">
          <Route index element={<Advances />} />
        </Route>

        <Route path="/academic_modules">
          <Route index element={<ModulesList />} />
        </Route>

        <Route path="/locations" element={<Location />} />

        <Route path="/departments" element={<Departments />} />

        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* 404 */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
