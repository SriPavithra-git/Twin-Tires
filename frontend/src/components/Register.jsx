import React, { useState } from "react";
import "../App.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    number: "",
    password: "",
    rePassword: "",
  });

  const [registeringAs, setRegisteringAs] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (role) => {
    setRegisteringAs(role);
    setDropdownOpen(false);
  };

  const handleGoogleRegister = () => {
    setRegisteringAs("Google User");
  };

  if (registeringAs) {
    return (
      <div className="logging-in-screen">
        <div className="logging-in-message">
          Registering as {registeringAs}...
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <p>Join Twin Tires Marketplace</p>

        {/* Inputs */}
        <div className="input-group">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label>First Name</label>
        </div>

        <div className="input-group">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label>Last Name</label>
        </div>

        <div className="input-group">
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          <label>Date of Birth</label>
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input
            type="tel"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
          <label>Phone Number</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="rePassword"
            value={formData.rePassword}
            onChange={handleChange}
            required
          />
          <label>Re-type Password</label>
        </div>

        {/* Dropdown before Register button */}
        <div className="role-dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Select Role &#9662;
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div onClick={() => handleRegister("Buyer")}>
                Register as Buyer
              </div>
              <div onClick={() => handleRegister("Seller")}>
                Register as Seller
              </div>
            </div>
          )}
        </div>

        {/* Register Button */}
        <button className="login-btn">
          Register
        </button>

        {/* OR separator */}
        <div className="or-separator">
          <span>OR</span>
        </div>

        <button className="google-signin" onClick={handleGoogleRegister}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
          />
          Sign up with Google
        </button>

        <div className="extra-links">
          <a href="login">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
