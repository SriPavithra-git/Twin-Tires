import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SellerDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-white">
      <Navbar />

      <main className="flex-grow px-6 py-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#ff6600] mb-4">
          Seller Dashboard
        </h1>
        <p className="text-gray-300 mb-10">
          Manage your active listings, add new bikes, and track inquiries.
        </p>

        {/* Placeholder Cards — can be replaced with real data */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg bg-[#111] border border-[#222] p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-[#ff9a1a] mb-2">
              Active Listings
            </h2>
            <p className="text-gray-400">
              You currently have <span className="font-semibold">0</span> active listings.
            </p>
            <button className="mt-4 px-5 py-2 bg-gradient-to-b from-[#ff9a1a] to-[#ff6600] text-black font-semibold rounded-md shadow-[0_6px_12px_rgba(255,102,0,0.3)] hover:brightness-110 transition">
              Add New Listing
            </button>
          </div>

          <div className="rounded-lg bg-[#111] border border-[#222] p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-[#ff9a1a] mb-2">
              Performance Overview
            </h2>
            <p className="text-gray-400">
              Track your sales, inquiries, and overall reach.
            </p>
            <div className="mt-4 text-sm text-gray-300">
              <div className="flex justify-between border-b border-[#222] py-2">
                <span>Total Views</span>
                <span className="text-[#ff6600]">0</span>
              </div>
              <div className="flex justify-between border-b border-[#222] py-2">
                <span>Inquiries</span>
                <span className="text-[#ff6600]">0</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Bikes Sold</span>
                <span className="text-[#ff6600]">0</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
