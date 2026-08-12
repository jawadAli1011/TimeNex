import { createContext, useState } from "react";
import { login } from "../api/auth_api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [menu, setMenu] = useState(() => {
    const savedMenu = localStorage.getItem("menu");
    return savedMenu ? JSON.parse(savedMenu) : [];
  });

  const loginUser = (token, menus) => {
    localStorage.setItem("token", token);
    localStorage.setItem("menu", JSON.stringify(menus));
    setToken(token);
  };

  const fetchAuth = async (form) => {
    try {
      const response = await login(form);
      const token = response.data.token;
      const menus = response.data.assigned_menus;
      loginUser(token, menus);
      setMenu(menus);

      navigate("/");
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("menu");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        menu,
        token,
        loginUser,
        logoutUser,
        fetchAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
