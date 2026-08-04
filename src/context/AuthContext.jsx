import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const loginUser = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
