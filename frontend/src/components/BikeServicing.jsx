import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ORANGE = "#ff6600";

export default function BikeServicing() {
  const [serviceType, setServiceType] = useState("");

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">

      {/* main page area */}
      <main className="flex-1 pt-20 pb-0 px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#ff6600]">
            Bike Servicing & Maintenance
          </h1>
          <p className="mt-3 text-gray-400 text-lg max-w-2xl mx-auto">
            Keep your bike running like new — from regular maintenance to
            full-scale repairs, we’ve got you covered.
          </p>
        </div>

        {/* Service Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] border border-[#222] rounded-2xl p-6 hover:border-[#ff6600]/50 hover:shadow-[0_0_15px_rgba(255,102,0,0.4)] transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: ORANGE }}
                >
                  {service.icon}
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {service.title}
                </h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="mt-32 mb-20 max-w-3xl mx-auto bg-[#1a1a1a] border border-[#222] rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-center text-[#ff6600] mb-6">
            Book a Service Appointment
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" placeholder="Enter your name" />
            <Input label="Email" placeholder="you@example.com" type="email" />
            <Input label="Phone Number" placeholder="Enter your number" type="tel" />
            <Input label="Bike Model" placeholder="e.g. Yamaha FZ, Pulsar 150" />
            <Input label="City" placeholder="Enter your city" />
            <Input label="Preferred Date" type="date" />

            {/* Service Type Dropdown */}
            <div className="col-span-1 md:col-span-2">
              <label className="text-sm text-gray-400 mb-1 block">Service Type</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-[#111] border border-[#333] rounded-md p-2 text-sm outline-none focus:border-[#ff6600]"
              >
                <option value="">Select a service</option>
                <option value="General Service">General Service</option>
                <option value="Engine Tune-Up">Engine Tune-Up</option>
                <option value="Tire & Brake Care">Tire & Brake Care</option>
                <option value="Oil & Filter Change">Oil & Filter Change</option>
                <option value="Battery & Electricals">Battery & Electricals</option>
                <option value="Accident & Repair Work">Accident & Repair Work</option>
                <option value="Others">Others</option>
              </select>

              {/* Conditional Input for "Others" */}
              {serviceType === "Others" && (
                <div className="mt-3">
                  <label className="text-sm text-gray-400 mb-1 block">Specify Service</label>
                  <input
                    type="text"
                    placeholder="Enter your custom service type"
                    className="w-full bg-[#111] border border-[#333] rounded-md p-2 text-sm text-gray-200 outline-none focus:border-[#ff6600]"
                  />
                </div>
              )}
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="text-sm text-gray-400 mb-1 block">Additional Notes</label>
              <textarea
                placeholder="Any specific issues or instructions..."
                className="w-full bg-[#111] border border-[#333] rounded-md p-2 text-sm text-gray-200 outline-none focus:border-[#ff6600] resize-none h-28"
              />
            </div>

            <div className="col-span-1 md:col-span-2 text-center mt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black font-semibold px-8 py-2 rounded-md hover:shadow-[0_0_20px_rgba(255,102,0,0.8)] transition"
              >
                Book Service
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* footer is now inside the dark container */}
    </div>
  );
}

/* ------------ Components ------------ */
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
const services = [
  { icon: "🛠", title: "General Service", desc: "Comprehensive inspection and maintenance of all key bike components — engine, brakes, suspension, and more." },
  { icon: "⚙", title: "Engine Tune-Up", desc: "Fine-tuning for maximum performance and efficiency, including spark plug check and air filter cleaning." },
  { icon: "🛞", title: "Tire & Brake Care", desc: "Tire pressure, tread inspection, and brake pad replacement to ensure safe and smooth rides." },
  { icon: "⛽", title: "Oil & Filter Change", desc: "Regular oil replacement and filter cleaning to extend engine life and enhance fuel efficiency." },
  { icon: "🔋", title: "Battery & Electricals", desc: "Check, charge, and replacement of batteries, along with inspection of lights and wiring systems." },
  { icon: "🔩", title: "Accident & Repair Work", desc: "Full repair and restoration services after accidents — from frame straightening to repainting." },
];