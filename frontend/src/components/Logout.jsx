import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // clear localStorage + context
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1200);
    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0b0b0b] via-[#1a1a1a] to-[#0b0b0b] text-white">
      <div className="text-center p-8 rounded-2xl bg-black/50 backdrop-blur-md border border-[#ff6600]/30 shadow-[0_0_25px_rgba(255,102,0,0.5)]">
        <h2 className="text-3xl font-bold text-[#ff6600] mb-3">Logging out...</h2>
        <p className="text-gray-300 text-sm">Please wait, you’ll be redirected shortly.</p>
      </div>
    </div>
  );
}
