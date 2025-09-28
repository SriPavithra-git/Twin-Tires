// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// If the image lives in src/Assets/, keep the import. Otherwise use "/bikeman.png" for public/.
import logo from "../Assets/bikeman.png";
import "../TwinTiresLanding.css";
import { FaHeart } from "react-icons/fa"; 


export default function Navbar({ onSearch = () => {} }) {
  const [openRole, setOpenRole] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = (q) => {
    onSearch(q);
    // go to buy page to show results
    navigate("/buy");
  };

  return (
    <header className="tt-nav">
      <div className="nav-left">
        <img src={logo} alt="Twin Tires" className="nav-logo" />
        <NavLink to="/" className="brand" style={{ textDecoration: "none" }}>
          Twin Tires
        </NavLink>
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
          onKeyDown={(e) => {
            if (e.key === "Enter") submitSearch(query);
          }}
        />
      </div>

      <div className="nav-right">
        <NavLink to="/" className="nav-btn">Home</NavLink>
        <NavLink to="/buy" className="nav-btn">Buy Bikes</NavLink>
        <NavLink to="/sell" className="nav-btn">Sell Bikes</NavLink>
        <NavLink to="/services" className="nav-btn">Services</NavLink>
       <NavLink to="/login" className="nav-btn">Login</NavLink>

         <NavLink to="/wishlist" className="nav-btn" title="Wishlist">
          <FaHeart style={{ color: "orange", fontSize: "20px" }} />
        </NavLink>


       
      </div>
    </header>
  );
}
