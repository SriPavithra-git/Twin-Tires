
import React from "react";

const upcomingBikes = [
  { id: 1, name: "KTM Duke 490", release: "Coming November 2025", img: "/ktm_490.jpg" },
  { id: 2, name: "Yamaha R3 2025", release: "Expected December 2025", img: "/yamaha_r3.jpg" },
  { id: 3, name: "TVS Apache EV", release: "Coming Early 2026", img: "/tvs_apache_ev.jpg" },
];

export default function Upcoming() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-[#ff6600] mb-4">
          Upcoming Launches
        </h1>
        <p className="text-gray-300 mb-10">
          Get a sneak peek at the most anticipated bikes coming soon to the roads.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingBikes.map((bike) => (
            <div
              key={bike.id}
              className="bg-[#111] border border-[#222] rounded-xl p-4 hover:shadow-[0_8px_20px_rgba(255,102,0,0.2)] transition"
            >
              <div className="h-40 w-full overflow-hidden rounded-md mb-3">
                <img
                  src={bike.img}
                  alt={bike.name}
                  className="h-full w-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="text-[#ffb84d] font-semibold text-lg">{bike.name}</h3>
              <p className="text-gray-400 text-sm mt-1">{bike.release}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}