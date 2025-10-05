import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SAMPLE_BIKES } from "./BikeData";

function currency(x) {
  return x.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}

export default function CompareBikes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bikesToCompare } = location.state || { bikesToCompare: [] };

  const selectedBikes = SAMPLE_BIKES.filter((b) => bikesToCompare.includes(b.id));

  // Empty State
  if (selectedBikes.length < 2) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center px-6 py-10">
        <div className="max-w-lg text-center">
          <h2 className="mb-6 text-2xl font-semibold text-[#ffa500]">
            Select at least 2 bikes to compare.
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border border-[#ff6600] px-6 py-2 font-semibold text-[#ff6600] transition hover:-translate-y-0.5 hover:bg-[#ff6600] hover:text-black hover:shadow-[0_6px_12px_rgba(255,102,0,0.4)]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Comparison Grid
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-10">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-[#ffa500] text-center">
          Compare Bikes
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {selectedBikes.map((b) => (
            <div
              key={b.id}
              className="rounded-xl bg-[#151515] border border-[#ff6600]/10 p-4 text-white shadow-[0_8px_28px_rgba(0,0,0,0.55)] hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(255,136,0,0.15)] transition"
            >
              {/* Image */}
              <div className="mb-4 h-44 w-full overflow-hidden rounded-lg bg-[#0f0f0f]">
                <img
                  src={b.img}
                  alt={b.model}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Header */}
              <h3 className="mb-2 text-lg font-semibold text-[#ffb84d]">
                {b.brand} {b.model}
              </h3>

              {/* Table */}
              <table className="w-full border-collapse text-sm text-gray-300">
                <tbody>
                  <tr className="border-t border-[#ffffff1a]">
                    <td className="py-2 font-medium text-[#ff9a1a]">Price</td>
                    <td className="py-2 text-right text-white">
                      {currency(b.price)}
                    </td>
                  </tr>
                  <tr className="border-t border-[#ffffff1a]">
                    <td className="py-2 font-medium text-[#ff9a1a]">Fuel</td>
                    <td className="py-2 text-right text-white">{b.fuelType}</td>
                  </tr>
                  <tr className="border-t border-[#ffffff1a]">
                    <td className="py-2 font-medium text-[#ff9a1a]">Mileage</td>
                    <td className="py-2 text-right text-white">
                      {b.mileage} km/l
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Description */}
              {b.description && (
                <p className="mt-4 text-sm text-gray-400">{b.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg bg-gradient-to-b from-[#ffb84d] to-[#ff6600] px-6 py-2 font-bold text-black shadow-[0_8px_20px_rgba(255,140,0,0.12)] transition hover:-translate-y-0.5 hover:brightness-105"
          >
            Back to Bikes
          </button>
        </div>
      </div>
    </div>
  );
}
