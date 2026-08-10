import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/CSS/index.css";
// import "./CSS/forms.css";
// import "./CSS/login.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import { DashboardProvider } from "./context/DashboardContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DashboardProvider>
          <App />
        </DashboardProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
