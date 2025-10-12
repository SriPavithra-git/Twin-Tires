import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ORANGE = "#ff6600";

export default function Insurance() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">

      {/* Hero Section */}
      <section className="pt-24 pb-10 px-6 text-center bg-gradient-to-b from-[#111] to-[#0d0d0d]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#ff6600] mb-3">
          Bike Insurance & Protection
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Secure your ride from accidents, theft, and damages with our trusted insurance partners.
        </p>
      </section>

      {/* --- FORM FIRST --- */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto bg-[#1a1a1a] border border-[#222] rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-center text-[#ff6600] mb-6">
            Get an Insurance Quote
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" placeholder="Enter your name" />
            <Input label="Email" placeholder="you@example.com" type="email" />
            <Input label="Phone Number" placeholder="Enter your number" type="tel" />
            <Input label="Bike Model" placeholder="e.g. Yamaha MT15" />
            <Input label="Bike Registration Number" placeholder="e.g. MH12AB1234" />
            <Input label="City" placeholder="Enter your city" />

            <div className="col-span-1 md:col-span-2">
              <label className="text-sm text-gray-400 mb-1 block">Insurance Type</label>
              <select className="w-full bg-[#111] border border-[#333] rounded-md p-2 text-sm outline-none focus:border-[#ff6600]">
                <option>Comprehensive Plan</option>
                <option>Third-Party Plan</option>
                <option>Own Damage Cover</option>
                <option>Personal Accident Cover</option>
              </select>
            </div>

            <div className="col-span-1 md:col-span-2 text-center mt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#ff6600] to-[#ff8533]
                text-black font-semibold px-8 py-2 rounded-md
                hover:shadow-[0_0_20px_rgba(255,102,0,0.8)] transition"
              >
                Get Quote
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* --- THEN THE PLANS GRID --- */}
      <section className="px-6 py-12 max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {insurancePlans.map((plan, i) => (
          <div
            key={i}
            className="bg-[#1a1a1a] border border-[#222] rounded-2xl p-6 hover:border-[#ff6600]/50 hover:shadow-[0_0_15px_rgba(255,102,0,0.4)] transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{plan.icon}</span>
              <h2 className="text-xl font-semibold text-[#ffcc80]">{plan.title}</h2>
            </div>
            <p className="text-gray-400 text-sm mb-4">{plan.desc}</p>
            <ul className="text-gray-300 text-sm list-disc ml-5 space-y-1">
              {plan.features.map((f, j) => (
                <li key={j}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

    </div>
  );
}

/* ------------ Reusable Input Component ------------ */
function Input({ label, type = "text", placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-[#111] border border-[#333] rounded-md p-2 text-sm text-gray-200 outline-none focus:border-[#ff6600]"
      />
    </div>
  );
}

/* ------------ Data ------------ */
const insurancePlans = [
  {
    icon: "🛡",
    title: "Comprehensive Plan",
    desc: "Covers both third-party liabilities and own bike damages.",
    features: [
      "Covers theft, fire, and natural disasters",
      "Includes third-party coverage",
      "Covers personal accident for rider",
    ],
  },
  {
    icon: "🚗",
    title: "Third-Party Plan",
    desc: "Mandatory plan covering damages caused to others in an accident.",
    features: [
      "Covers third-party injury or property loss",
      "Affordable and legally compliant",
    ],
  },
  {
    icon: "⚙",
    title: "Own Damage Cover",
    desc: "Protects your own bike from damage or accidents.",
    features: [
      "Covers vandalism, accidents, and theft",
      "Custom add-ons available",
    ],
  },
  {
    icon: "💥",
    title: "Personal Accident Cover",
    desc: "Financial protection for you and your family in case of an accident.",
    features: [
      "Coverage up to ₹15 lakhs",
      "Includes medical expense support",
    ],
  },
  {
    icon: "🌪",
    title: "Natural Calamity Cover",
    desc: "Covers losses due to floods, earthquakes, and storms.",
    features: [
      "Covers full bike damage or total loss",
      "Easy claim process",
    ],
  },
  {
    icon: "🔒",
    title: "Theft Protection",
    desc: "Full claim support in case your vehicle is stolen.",
    features: [
      "Instant claim registration",
      "Guaranteed settlement on verification",
    ],
  },
];