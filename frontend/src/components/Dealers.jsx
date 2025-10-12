
import React from "react";

const dealers = [
  { id: 1, name: "Speed Motors", city: "Bangalore", phone: "+91 98765 43210" },
  { id: 2, name: "RideZone Autos", city: "Mumbai", phone: "+91 99887 76655" },
  { id: 3, name: "Elite Bikes Hub", city: "Hyderabad", phone: "+91 90909 30303" },
];

export default function Dealers() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-[#ff6600] mb-4">
          Find Dealers
        </h1>
        <p className="text-gray-300 mb-10">
          Connect with authorized and trusted bike dealers near you.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {dealers.map((dealer) => (
            <div
              key={dealer.id}
              className="bg-[#111] border border-[#222] rounded-xl p-5 hover:shadow-[0_6px_16px_rgba(255,102,0,0.2)] transition"
            >
              <h3 className="text-[#ffb84d] font-semibold text-lg mb-1">
                {dealer.name}
              </h3>
              <p className="text-gray-400 text-sm mb-1">City: {dealer.city}</p>
              <p className="text-gray-400 text-sm">Phone: {dealer.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}