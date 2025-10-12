// src/components/Layout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "./auth";

export default function Layout() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  // ✅ Hide navbar/footer on IntroAnimationPage
  const hideLayout =
    location.pathname === "/" || location.pathname === "/intro";

  return (
    <div className="flex flex-col min-h-screen bg-[#0d0d0d] text-white">
      {/* Header */}
      {!hideLayout && <Navbar user={user} isAuthenticated={isAuthenticated} />}

      {/* Page content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      {!hideLayout && <Footer />}
    </div>
  );
}
