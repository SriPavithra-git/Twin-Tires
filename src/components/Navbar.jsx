// src/components/Navbar.jsx
import React, { useState } from "react";
import logo from "../Assets/bikeman.png"; // ensure this file exists
import "../TwinTiresLanding.css";

export default function Navbar({ onSearch = () => {} }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <header className="tt-nav">
      <div className="nav-left">
        <img src={logo} alt="Twin Tires" className="nav-logo" />
        <div className="brand">Twin Tires</div>
      </div>

      <div className={`nav-center`}>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search model, brand or city"
          className="nav-search"
        />
      </div>

      <div className="nav-right">
  <button className="nav-btn">Home</button>
  <button className="nav-btn">Buy Bikes</button>
  <button className="nav-btn">Sell Bikes</button>
  <button className="nav-btn">Services</button>

  <div className="login-dd">
    <button className="nav-btn">Login</button>
  </div>

  <button className="nav-btn">List your Bike</button>
</div>

    </header>
  );
}
