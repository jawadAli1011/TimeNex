import {
  Badge,
  Banknote,
  Building2,
  Calendar,
  CalendarDays,
  Clock,
  FileText,
  Gift,
  GitBranch,
  GraduationCap,
  LayoutDashboard,
  MapPin,
  Minus,
  PieChart,
  Plus,
  Smartphone,
  Target,
  User,
  UserPlus,
  Wallet,
} from "lucide-react";
import React from "react";

function GitIcon(key) {
  function toSlug(text) {
    return text.toLowerCase().replace(/[\s_\/]+/g, "");
  }
  // console.log(key);
  const icon = {
    present: "▲",
    absent: "▼",
    late: "●",
    leave: "✈",
    shortleave: "⏳",
    offday: "🛌",
    holidays: "📅",
    dashboard: <LayoutDashboard size={15} />,
    designations: <Badge size={15} />,
    timecategory: <Clock size={15} />,
    rosters: <Calendar size={15} />,
    leaverequests: <FileText size={15} />,
    attachemployee: <UserPlus size={15} />,
    department: <Building2 size={15} />,
    demographics: <PieChart size={15} />,
    zones: <MapPin size={15} />,
    branches: <GitBranch size={15} />,
    devices: <Smartphone size={15} />,
    leaves: <CalendarDays size={15} />,
    reports: <FileText size={15} />,
    employeeform: <User size={15} />,
    holidayscalendar: <CalendarDays size={15} />,
    empbonusded: <Gift size={15} />,
    empdedicatedoff: <Target size={15} />,
    allowances: <Plus size={15} />,
    deductions: <Minus size={15} />,
    // loan: <Banknote size={15} />,
    loanadvances: <Wallet size={15} />,
    academicmodules: <GraduationCap size={15} />,
  };
  return icon[toSlug(key)] || "";
}

export default GitIcon;
