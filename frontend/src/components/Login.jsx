import React, { useState } from "react";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggingInAs, setLoggingInAs] = useState(""); // New state to show the page

  const handleLogin = (role) => {
    setLoggingInAs(role); // Show the logging in page
    setDropdownOpen(false);
  };

  const handleGoogleSignIn = () => {
    setLoggingInAs("Google User");
  };

  if (loggingInAs) {
    // Full-screen logging in page
    return (
      <div className="logging-in-screen">
        <div className="logging-in-message">
          Logging in as {loggingInAs}...
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Login to Twin Tires Marketplace</p>

        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>

        {/* Login Dropdown Button */}
        <div className="login-dropdown">
          <button
            className="login-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="text">Login</span>
            <span className="arrow">&#9662;</span>
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <div onClick={() => handleLogin("Buyer")}>Login as Buyer</div>
              <div onClick={() => handleLogin("Seller")}>Login as Seller</div>
            </div>
          )}
        </div>

        {/* OR Separator */}
        <div className="or-separator">
          <span>OR</span>
        </div>

        <button className="google-signin" onClick={handleGoogleSignIn}>
          <img
            src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
            alt="Google Logo"
          />
          Sign in with Google
        </button>

        <div className="extra-links">
          <a href="#">Forgot Password?</a>
          <a href="register">Register Now</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
