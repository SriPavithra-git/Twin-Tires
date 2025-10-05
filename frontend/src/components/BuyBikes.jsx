import React, { useState, useEffect, useRef } from "react";
import { SAMPLE_BIKES } from "./BikeData";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function currency(x) {
  return x.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}

export default function BuyBikes() {
  const [compareSet, setCompareSet] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedFuel, setSelectedFuel] = useState("All");
  const filterRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBikes = SAMPLE_BIKES.filter(
    (b) =>
      (selectedBrand === "All" || b.brand === selectedBrand) &&
      (selectedFuel === "All" || b.fuelType === selectedFuel)
  );

  function toggleCompare(id) {
    setCompareSet((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) {
        alert("Maximum 3 bikes can be compared");
        return prev;
      }
      return [...prev, id];
    });
  }

  function goToCompare() {
    if (compareSet.length < 2) {
      alert("Select at least 2 bikes to compare");
      return;
    }
    navigate("/compare", { state: { bikesToCompare: compareSet } });
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar />

      {/* Header bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 flex items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-[#ff6600]">Buy Bikes</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gradient-to-r from-[#ff6600] to-[#ff8533]
            text-black font-semibold px-4 py-2 rounded-md text-sm
            shadow-[0_0_12px_rgba(255,102,0,0.6)]
            hover:shadow-[0_0_20px_rgba(255,102,0,0.9)]
            hover:brightness-110 transition-all duration-300"
          >
            Filters
          </button>

          {compareSet.length > 1 && (
            <button
              onClick={goToCompare}
              className="bg-gradient-to-r from-[#ff6600] to-[#ff8533]
              text-black font-semibold px-4 py-2 rounded-md text-sm
              shadow-[0_0_12px_rgba(255,102,0,0.6)]
              hover:shadow-[0_0_20px_rgba(255,102,0,0.9)]
              hover:brightness-110 transition-all duration-300"
            >
              Compare ({compareSet.length})
            </button>
          )}
        </div>
      </div>

      {/* Filters Sidebar */}
      <aside
        ref={filterRef}
        className={`fixed top-24 left-0 w-64 bg-[#1a1a1a] border-r border-[#ff6600]/10 rounded-r-lg p-5 shadow-[0_4px_16px_rgba(0,0,0,0.6)] transform transition-transform duration-300 ${
          showFilters ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h3 className="text-[#ff8533] text-xl font-bold mb-4">Filters</h3>

        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-1">Brand</label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full bg-[#0f0f0f] border border-[#ff6600]/20 text-white rounded-md p-2 focus:border-[#ff8533] outline-none"
          >
            <option>All</option>
            {Array.from(new Set(SAMPLE_BIKES.map((b) => b.brand))).map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Fuel Type</label>
          <select
            value={selectedFuel}
            onChange={(e) => setSelectedFuel(e.target.value)}
            className="w-full bg-[#0f0f0f] border border-[#ff6600]/20 text-white rounded-md p-2 focus:border-[#ff8533] outline-none"
          >
            <option>All</option>
            {Array.from(new Set(SAMPLE_BIKES.map((b) => b.fuelType))).map(
              (f) => (
                <option key={f}>{f}</option>
              )
            )}
          </select>
        </div>
      </aside>

      {/* Bikes Grid — 1 / 2 / 3 / 4 cols */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBikes.length > 0 ? (
            filteredBikes.map((b) => (
              <div
                key={b.id}
                className="bg-[#151515] border border-[rgba(255,136,0,0.06)] rounded-xl overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.55)] flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(0,0,0,0.6)]"
              >
                <div className="w-full h-[200px] bg-[#0f0f0f]">
                  <img
                    src={b.img}
                    alt={b.model}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col gap-2 flex-auto">
                  <h3 className="text-[#ffa500] text-lg font-semibold">
                    {b.brand} {b.model}
                  </h3>
                  <p className="text-[#ffb84d] font-bold text-lg">
                    {currency(b.price)}
                  </p>
                  <p className="text-sm text-gray-400">
                    {b.fuelType} | {b.mileage} km/l
                  </p>
                </div>

                <div className="flex gap-3 justify-center p-3 border-t border-[rgba(255,255,255,0.05)] bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.01))]">
                  <button
                    onClick={() => toggleCompare(b.id)}
                    className={`rounded-lg font-semibold px-3 py-2 text-sm transition-all duration-300 ${
                      compareSet.includes(b.id)
                        ? "bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black shadow-[0_0_12px_rgba(255,102,0,0.6)] hover:shadow-[0_0_18px_rgba(255,102,0,0.9)]"
                        : "bg-[#222] text-[#ff6600] border border-[#ff6600]/30 hover:bg-[#ff6600]/10"
                    }`}
                  >
                    {compareSet.includes(b.id) ? "Deselect" : "Compare"}
                  </button>

                  <button
                    onClick={() => navigate(`/bike/${b.id}`)}
                    className="bg-gradient-to-r from-[#ff6600] to-[#ff8533]
                    text-black font-semibold px-3 py-2 rounded-lg text-sm
                    shadow-[0_0_12px_rgba(255,102,0,0.6)]
                    hover:shadow-[0_0_20px_rgba(255,102,0,0.9)]
                    hover:brightness-110 transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">
              No bikes match your filters.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
