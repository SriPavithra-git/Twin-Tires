// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/bikeman.png";
import { FaHeart } from "react-icons/fa6";
import { useAuth } from "./auth";

export default function Navbar({ onSearch = () => {}, user: propUser, isAuthenticated: propAuth }) {
  const { user: ctxUser, isAuthenticated: ctxAuth } = useAuth();
  const user = propUser || ctxUser;
  const isAuthenticated = propAuth ?? ctxAuth;

  const location = useLocation();
  const role = (user?.role || "").toLowerCase();
  const isSeller = role === "seller";
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // 🔍 Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) onSearch(query.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const submitSearch = (q) => {
    onSearch(q);
    navigate(`/buy?q=${encodeURIComponent(q)}`);
    setOpen(false);
  };

  const linkBase =
    "rounded-md border-2 border-[#ff6600] px-3 py-2 font-semibold text-[#ff6600] transition hover:-translate-y-0.5 hover:bg-[#ff6600] hover:text-black hover:shadow-[0_6px_12px_rgba(255,102,0,0.4)]";
  const linkActive =
    "bg-[#ff6600] text-black shadow-[0_6px_12px_rgba(255,102,0,0.4)]";

  const guardNav = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate("/login", { state: { redirectTo: path } });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-[120] border-b border-white/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.85),rgba(0,0,0,0.95))]">
        {/* Seller Navbar */}
        {isSeller ? (
          <div className="flex items-center justify-between px-4 sm:px-5 py-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Twin Tires" className="h-10 w-auto" />
              <Link
                to="/seller-dashboard"
                className="text-[18px] sm:text-[20px] font-extrabold tracking-[0.2px] text-[#ff6600]"
              >
                Twin Tires
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#ffb366] text-sm sm:text-base font-semibold">
                Hi, {user?.name || "Seller"}
              </span>
              <Link
                to="/logout"
                className="rounded-md border-2 border-[#ff6600] px-3 py-2 font-semibold text-[#ff6600] hover:bg-[#ff6600] hover:text-black transition"
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Buyer / Visitor Navbar */}
            <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-5">
              {/* Left: logo + brand */}
              <div className="flex items-center gap-3">
                <img src={logo} alt="Twin Tires" className="h-10 w-auto" />
                <NavLink
                  to="/home"
                  className="text-[18px] sm:text-[20px] font-extrabold tracking-[0.2px] text-[#ff6600]"
                  onClick={() => setOpen(false)}
                >
                  Twin Tires
                </NavLink>
              </div>

              {/* Center: search (md+) */}
              <div className="hidden md:flex flex-1 justify-center">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search model, brand or city"
                  onKeyDown={(e) => e.key === "Enter" && submitSearch(query)}
                  className="w-[60%] max-w-[560px] rounded-[10px] border-2 border-[#ff6600]/30 bg-[#1a1a1a] px-3 py-2 text-white placeholder-[#ffb366] outline-none focus:border-[#ff8533] focus:shadow-[0_4px_10px_rgba(255,102,0,0.25)]"
                />
              </div>

              {/* Right: desktop nav */}
              <nav className="hidden lg:flex items-center gap-2">
                <NavLink to="/home" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>Home</NavLink>
                <NavLink to="/buy" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>Buy Bikes</NavLink>
                <NavLink to="/sell" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>Sell Bikes</NavLink>
                <NavLink to="/services" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>Services</NavLink>

                {/* Cart */}
                <NavLink
                  to="/cart"
                  onClick={(e) => !isAuthenticated && guardNav(e, "/cart")}
                  className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
                >
                  Cart
                </NavLink>

                {/* Wishlist */}
                {isAuthenticated && (
                  <NavLink
                    to="/wishlist"
                    title="Wishlist"
                    className={({ isActive }) =>
                      `flex items-center justify-center rounded-md border-2 border-[#ff6600] p-2 transition hover:-translate-y-0.5 hover:bg-[#ff6600] hover:shadow-[0_6px_12px_rgba(255,102,0,0.4)] ${isActive ? "bg-[#ff6600]" : ""}`
                    }
                  >
                    <FaHeart className="text-[20px] text-orange-500" />
                  </NavLink>
                )}

                {/* Profile / Login */}
                {isAuthenticated ? (
                  <Link to="/account" className={linkBase}>
                    {`Hi, ${user?.name || "Rider"}`}
                  </Link>
                ) : (
                  <NavLink to="/login" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
                    Login
                  </NavLink>
                )}
              </nav>

              {/* Mobile controls */}
              <div className="lg:hidden flex items-center gap-2">
                {isAuthenticated && (
                  <NavLink
                    to="/wishlist"
                    title="Wishlist"
                    onClick={() => setOpen(false)}
                    className="rounded-md border-2 border-[#ff6600] p-2 transition hover:-translate-y-0.5 hover:bg-[#ff6600] hover:shadow-[0_6px_12px_rgba(255,102,0,0.4)]"
                  >
                    <FaHeart className="text-[18px] text-orange-500" />
                  </NavLink>
                )}
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="rounded-md border-2 border-[#ff6600] p-2 text-[#ff6600] transition hover:-translate-y-0.5 hover:bg-[#ff6600] hover:text-black hover:shadow-[0_6px_12px_rgba(255,102,0,0.4)]"
                >
                  {open ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" d="M6 6L18 18M6 18L18 6" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Spacer to prevent jump */}
            <div className="md:hidden h-[10px]" />

            {/* Mobile Drawer */}
            <div
              className={`md:hidden fixed left-0 right-0 top-[72px] z-[115]
                transition-[transform,opacity] duration-300
                ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
            >
              <div className="mx-auto mt-3 flex max-w-7xl flex-col gap-3 rounded-lg border border-[#222] bg-[#0d0d0d] p-4
                max-h-[calc(100vh-90px)] overflow-auto shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                
                {/* Search */}
                <div className="flex gap-2">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search model, brand or city"
                    onKeyDown={(e) => e.key === "Enter" && submitSearch(query)}
                    className="flex-1 rounded-[10px] border-2 border-[#ff6600]/30 bg-[#1a1a1a] px-3 py-2 text-white placeholder-[#ffb366] outline-none focus:border-[#ff8533] focus:shadow-[0_4px_10px_rgba(255,102,0,0.25)]"
                  />
                  <button
                    onClick={() => submitSearch(query)}
                    className="rounded-md bg-[#ff6600] px-4 py-2 font-semibold text-black hover:brightness-110"
                  >
                    Search
                  </button>
                </div>

                {/* Links grid */}
                <div className="grid grid-cols-2 gap-2">
                  <NavLink to="/home" onClick={() => setOpen(false)} className={({ isActive }) => `${linkBase} text-center ${isActive ? linkActive : ""}`}>Home</NavLink>
                  <NavLink to="/buy" onClick={() => setOpen(false)} className={({ isActive }) => `${linkBase} text-center ${isActive ? linkActive : ""}`}>Buy Bikes</NavLink>
                  <NavLink to="/sell" onClick={() => setOpen(false)} className={({ isActive }) => `${linkBase} text-center ${isActive ? linkActive : ""}`}>Sell Bikes</NavLink>
                  <NavLink to="/services" onClick={() => setOpen(false)} className={({ isActive }) => `${linkBase} text-center ${isActive ? linkActive : ""}`}>Services</NavLink>
                  <NavLink to="/cart" onClick={(e) => { if (!isAuthenticated) guardNav(e, "/cart"); setOpen(false); }} className={({ isActive }) => `${linkBase} text-center ${isActive ? linkActive : ""}`}>Cart</NavLink>
                  <NavLink to="/login" onClick={() => setOpen(false)} className={({ isActive }) => `${linkBase} text-center ${isActive ? linkActive : ""}`}>Login</NavLink>
                  {isAuthenticated && (
                    <NavLink to="/wishlist" onClick={() => setOpen(false)} className={({ isActive }) => `${linkBase} text-center ${isActive ? linkActive : ""}`}>Wishlist</NavLink>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
