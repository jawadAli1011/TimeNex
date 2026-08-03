import React from "react";
import "../../CSS/login.css";

function Login() {
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

        <form className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
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
