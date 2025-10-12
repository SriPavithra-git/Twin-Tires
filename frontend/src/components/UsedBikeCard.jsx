// src/components/UsedBikeCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function currency(x) {
  return Number(x || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}

export default function UsedBikeCard({ bike = {}, compareSet = [], toggleCompare = () => {} }) {
  const navigate = useNavigate();

  const img =
  bike.img ||
  bike.image ||
  (Array.isArray(bike.imageUrls) && bike.imageUrls[0]) ||
  "/placeholder-bike.jpg";


  return (
    <div className="bg-[#151515] border border-[rgba(255,136,0,0.06)] rounded-xl overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.55)] flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(0,0,0,0.6)]">
      <div className="w-full h-[200px] bg-[#0f0f0f]">
        <img
          src={img}
          alt={bike.model || ""}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-auto">
        <h3 className="text-[#ffa500] text-lg font-semibold">
          {bike.brand} {bike.model}
        </h3>
        <p className="text-[#ffb84d] font-bold text-lg">{currency(bike.price)}</p>
        <p className="text-sm text-gray-400">
          {bike.fuelType} {bike.mileage ? `| ${bike.mileage} km/l` : ""}{" "}
          {bike.city ? `| ${bike.city}` : ""}
        </p>
      </div>

      <div className="flex gap-3 justify-center p-3 border-t border-[rgba(255,255,255,0.05)] bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.01))]">
        <button
          onClick={() => toggleCompare(bike.id)}
          className={`rounded-lg font-semibold px-3 py-2 text-sm transition-all duration-300 ${
            compareSet.includes(bike.id)
              ? "bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black shadow-[0_0_12px_rgba(255,102,0,0.6)] hover:shadow-[0_0_18px_rgba(255,102,0,0.9)]"
              : "bg-[#222] text-[#ff6600] border border-[#ff6600]/30 hover:bg-[#ff6600]/10"
          }`}
        >
          {compareSet.includes(bike.id) ? "Deselect" : "Compare"}
        </button>

        <button
          onClick={() =>
            navigate(`/used-bike/${bike.id}`, { state: { bike, isUsed: true } })
          }
          className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black font-semibold px-3 py-2 rounded-lg text-sm shadow-[0_0_12px_rgba(255,102,0,0.6)] hover:shadow-[0_0_20px_rgba(255,102,0,0.9)] hover:brightness-110 transition-all duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
