import React from "react";
import "../../assets/CSS/login.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [showP, setShowP] = useState(false);
  const navigate = useNavigate();

  const { fetchAuth, loading } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchAuth(form);
  };

  return (
    <div className="login-container text-[#1e293b] ">
      {/* <!-- Background handled by CSS --> */}
      <div className="login-card">
        <div className="logo">
          <div className="login-logo-icon">TN</div>
          <div className="login-logo-text">TimeNex</div>
        </div>

        <div className="header">
          <h2>Welcome back</h2>
          <p>Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={handleChange}
              style={{
                padding: "14px 16px",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div
              style={{
                padding: "14px 16px",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
              }}
              className="flex items-center justify-between  "
            >
              <input
                type={showP ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                onChange={handleChange}
              />
              <span
                className="hover:text-[#b8941a]"
                onClick={() => setShowP(!showP)}
              >
                {" "}
                {showP ? <EyeOff size={18} /> : <Eye size={18} />}{" "}
              </span>
            </div>
          </div>

          <div className="form-actions">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="btn-primary flex items-center justify-center"
          >
            {loading && (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-[#92700a]" />
            )}
            <span>Sign In</span>
          </button>
        </form>

        <div className="footer">
          <p>
            Don't have an account? <a href="#">Contact admin</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
