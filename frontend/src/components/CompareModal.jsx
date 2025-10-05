import React from "react";

export default function CompareModal({ bikes, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.75)] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-[#151515] text-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-6 w-[90%] max-w-4xl border border-[#ff6600]/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-[#ffb84d] mb-6 text-center">
          Compare Bikes
        </h2>

        {/* Bikes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {bikes.map((bike) => (
            <div
              key={bike.id}
              className="bg-[#1a1a1a] rounded-xl p-4 border border-[#ff6600]/10 shadow-[0_4px_18px_rgba(0,0,0,0.4)] text-center hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(255,136,0,0.15)] transition"
            >
              <div className="w-full h-36 mb-3 overflow-hidden rounded-lg bg-[#111]">
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h4 className="text-lg font-semibold text-[#ffa500]">
                {bike.name}
              </h4>
              <p className="text-gray-300 text-sm mt-1">{bike.price}</p>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="rounded-lg bg-gradient-to-b from-[#ffb84d] to-[#ff6600] px-5 py-2 font-bold text-black shadow-[0_8px_20px_rgba(255,140,0,0.12)] transition hover:-translate-y-0.5 hover:brightness-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
