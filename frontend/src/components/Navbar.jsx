// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// If the image lives in src/Assets/, keep the import. Otherwise use "/bikeman.png" for public/.
// If the file is in src/assets
import logo from "../assets/bikeman.png";
import { FaHeart } from "react-icons/fa6";

export default function Navbar({ onSearch = () => {} }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = (q) => {
    onSearch(q);
    navigate("/buy");
  };

  const linkBase =
    "rounded-md border-2 border-[#ff6600] px-3 py-2 font-semibold text-[#ff6600] transition hover:-translate-y-0.5 hover:bg-[#ff6600] hover:text-black hover:shadow-[0_6px_12px_rgba(255,102,0,0.4)]";
  const linkActive =
    "bg-[#ff6600] text-black shadow-[0_6px_12px_rgba(255,102,0,0.4)]";

  return (
<header className="sticky top-0 z-[120] flex items-center justify-between gap-3 
border-b border-white/10 
bg-[linear-gradient(180deg,rgba(0,0,0,0.85),rgba(0,0,0,0.95))] 
px-5 py-5">
      {/* Left: logo + brand */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Twin Tires" className="h-11 w-auto" />
        <NavLink
          to="/"
          className="text-[20px] font-extrabold tracking-[0.2px] text-[#ff6600] no-underline"
        >
          Twin Tires
        </NavLink>
      </div>

      {/* Center: search (hidden on small screens) */}
      <div className="hidden flex-1 justify-center md:flex">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search model, brand or city"
          onKeyDown={(e) => e.key === "Enter" && submitSearch(query)}
          className="w-[60%] max-w-[560px] rounded-[10px] border-2 border-[#ff6600]/30 bg-[#1a1a1a] px-3 py-2 text-white placeholder-[#ffb366] outline-none focus:border-[#ff8533] focus:shadow-[0_4px_10px_rgba(255,102,0,0.25)]"
        />
      </div>

      {/* Right: nav links */}
      <div className="flex items-center gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/buy"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : ""}`
          }
        >
          Buy Bikes
        </NavLink>
        <NavLink
          to="/sell"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : ""}`
          }
        >
          Sell Bikes
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : ""}`
          }
        >
          Services
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : ""}`
          }
        >
          Login
        </NavLink>

        {/* Wishlist icon button */}
        <NavLink
          to="/wishlist"
          title="Wishlist"
          className={({ isActive }) =>
            `flex items-center justify-center rounded-md border-2 border-[#ff6600] p-2 transition hover:-translate-y-0.5 hover:bg-[#ff6600] hover:shadow-[0_6px_12px_rgba(255,102,0,0.4)] ${
              isActive ? "bg-[#ff6600]" : "bg-transparent"
            }`
          }
        >
          <FaHeart
            className={`text-[20px] ${
              /* ensure visible on both states */ "text-orange-500"
            } ${/* invert on hover via parent bg change */ ""}`}
          />
        </NavLink>
      </div>
    </header>
  );
}
