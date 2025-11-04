import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // You can add authentication logic here if needed
    navigate("/upload");

  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <i className="fas fa-lock"></i>
          <h2>Secure KYC</h2>
        </div>

        <p className="enterprise-text">Enterprise Identity Verification</p>

        <p className="welcome-text">
          👋 Welcome Back
          <br />
          Sign in to your secure account
        </p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email Address" required />
          </div>

          <div className="input-group">
            <i className="fas fa-key"></i>
            <input type="password" placeholder="Password" required />
          </div>

          <div className="input-group">
            <i className="fas fa-user-shield"></i>
            <select required defaultValue="">
              <option value="" disabled>
                Login as User
              </option>
              <option>User</option>
              <option>Admin</option>
              <option>Manager</option>
              <option>Auditor</option>
            </select>
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="footer-text">
          <p>
            Don’t have an account? <a href="#">Create Account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
