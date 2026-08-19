import { createContext, useContext, useEffect, useState } from "react";
// import { getDashboard } from "../api/dashboard.api";
import { getDashboardData } from "../api/dashboard_api";
import { AuthContext } from "./AuthContext";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getDashboardData();
      setDashboardData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (token) {
  //     fetchDashboard();
  //   } else {
  //     setDashboardData(null);
  //   }
  // }, [token]);

  return (
    <DashboardContext.Provider value={{}}>{children}</DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
