import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/CSS/index.css";
// import "./CSS/forms.css";
// import "./CSS/login.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvuder from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvuder>
        <App />
      </AuthProvuder>
    </BrowserRouter>
  </StrictMode>,
);
