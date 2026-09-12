import { createContext, useState } from "react";
import { login } from "../api/auth_api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState(
    localStorage.getItem("currentUser"),
  );
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [menu, setMenu] = useState(() => {
    const savedMenu = localStorage.getItem("menu");
    return savedMenu ? JSON.parse(savedMenu) : [];
  });

  const loginUser = (token, menus, companyName) => {
    localStorage.setItem("token", token);
    localStorage.setItem("menu", JSON.stringify(menus));
    setToken(token);
    localStorage.setItem("currentUser", companyName);
  };

  const fetchAuth = async (form) => {
    setLoading(true);
    try {
      const response = await login(form);
      const token = response.data.token;
      const currentUser = response.data.currentUser.name;
      const menus = response.data.assigned_menus;

      loginUser(token, menus, currentUser);
      setMenu(menus);
      setCompanyName(currentUser);

      navigate("/");
    } catch (error) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("menu");
    localStorage.removeItem("currentUser");
    setMenu([]);
    setCompanyName(null);
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        menu,
        token,
        loginUser,
        logoutUser,
        fetchAuth,
        loading,
        companyName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
