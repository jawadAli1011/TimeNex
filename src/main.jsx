import { createRoot } from "react-dom/client";
import "./assets/CSS/index.css";
// import "./CSS/forms.css";
// import "./CSS/login.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/timenex-new">
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
