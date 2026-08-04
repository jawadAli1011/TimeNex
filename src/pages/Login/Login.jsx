import React from "react";
import "../../assets/CSS/login.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../api/auth_api";

function Login() {
  const navigate = useNavigate();

  const { loginUser } = useContext(AuthContext);

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
    try {
      const response = await login(form);
      loginUser(response.data.token);
      navigate("/");
    } catch (error) {
      alert("Invalid email or password");
    }
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
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              onChange={handleChange}
            />
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

          <button type="submit" className="btn-primary">
            Sign In
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
