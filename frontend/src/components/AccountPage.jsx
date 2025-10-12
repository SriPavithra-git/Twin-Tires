// src/components/AccountPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const sections = [
    {
      id: "orders",
      title: "Your Orders",
      description: "View your bike purchase history",
      path: "/account/orders", // ✅ goes to AccountOrders.jsx
    },
    {
      id: "addresses",
      title: "Your Addresses",
      description: "Manage shipping and billing addresses",
      path: "/account/addresses",
    },
    {
      id: "details",
      title: "Your Details",
      description: "View or edit your profile info",
      path: "/account/details",
    },
    {
      id: "mybikes",
      title: "My Listed Bikes",
      description: "View and manage the bikes you’ve listed for sale",
      path: "/buyer-dashboard",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
    
      <header className="px-5 md:px-12 py-10 text-center">
        <h1 className="text-3xl font-extrabold text-[#ff6600]">
          Hi, {user?.name || "Rider"}
        </h1>
        <p className="text-gray-400 mt-2">
          Welcome to your Twin Tires account dashboard
        </p>
      </header>

      <main className="px-5 md:px-12 pb-16 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((s) => (
            <div
              key={s.id}
              onClick={() => navigate(s.path)}
              className="cursor-pointer rounded-xl border border-[#ff6600]/20 bg-gradient-to-b from-[#111] to-[#1a1a1a] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.5)] transition hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:border-[#ff6600]"
            >
              <h2 className="text-xl font-bold text-[#ff8533] mb-2">{s.title}</h2>
              <p className="text-sm text-gray-400 mb-4">{s.description}</p>
              <span className="inline-block text-sm font-semibold text-[#ff6600]">
                View →
              </span>
            </div>
          ))}

          {/* Logout card */}
          <div
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="cursor-pointer rounded-xl border border-[#ff3300]/20 bg-gradient-to-b from-[#1a0000] to-[#0d0000] p-6 transition hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:border-[#ff3300]"
          >
            <h2 className="text-xl font-bold text-[#ff3333] mb-2">Logout</h2>
            <p className="text-sm text-gray-400 mb-4">
              Sign out from your account
            </p>
            <span className="inline-block text-sm font-semibold text-[#ff3333]">
              Logout →
            </span>
          </div>
        </div>
      </main>
    
    </div>
  );
}
