// src/components/AccountDetails.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "./auth";

export default function AccountDetails() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
  
      <main className="flex-1 px-6 py-10 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-[#ff6600]">Your Details</h1>

        <div className="border border-[#222] bg-[#121212] p-6 rounded-lg">
          <p className="mb-3">
            <span className="text-gray-400">Name: </span>
            {user?.name || "—"}
          </p>
          <p className="mb-3">
            <span className="text-gray-400">Email: </span>
            {user?.email || "—"}
          </p>
          <p>
            <span className="text-gray-400">User ID: </span>
            {user?.id}
          </p>
        </div>
      </main>
      
    </div>
  );
}
