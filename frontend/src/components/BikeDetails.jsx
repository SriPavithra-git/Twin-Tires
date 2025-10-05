import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { SAMPLE_BIKES } from "./BikeData";

export default function BikeDetails() {
  const { id } = useParams();
  const bike = SAMPLE_BIKES.find((b) => b.id === id);
  const [currentImg, setCurrentImg] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);

  if (!bike)
    return (
      <h2 className="text-center text-white text-xl mt-10">Bike not found</h2>
    );

  const calculateEMI = () => {
    const principal = bike.price - downPayment;
    const monthlyRate = 0.01;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return emi.toFixed(0);
  };

  return (
    <div className="bg-[#0d0d0d] text-white px-6 py-10 min-h-screen">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        {/* Images */}
        <div className="flex-1">
          <div className="rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#ff6600]/10">
            <img
              src={bike.img}
              alt={bike.model}
              className="w-full h-[360px] object-cover"
            />
          </div>
          {bike.images && bike.images.length > 1 && (
            <div className="flex gap-3 mt-3 justify-center flex-wrap">
              {bike.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  onClick={() => setCurrentImg(idx)}
                  className={`w-20 h-20 object-cover rounded-md border-2 cursor-pointer transition ${
                    currentImg === idx
                      ? "border-[#ff6600] scale-105"
                      : "border-transparent hover:scale-105"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-[#ff8533]">
            {bike.brand} {bike.model}
          </h1>
          <h2 className="text-2xl font-semibold text-[#ffb84d]">
            ₹{bike.price.toLocaleString()}
          </h2>
          <p className="text-sm text-gray-300">
            {bike.fuelType} | {bike.mileage} km/l
          </p>
          <p className="text-gray-400 leading-relaxed">
            {bike.description || "No description available."}
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            <button className="rounded-lg font-semibold bg-[#ffa500] text-black px-4 py-2 transition hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(255,165,0,0.4)]">
              Add to Wishlist
            </button>
            <button className="rounded-lg font-semibold bg-[#222] text-[#ffa500] border border-[#ffa500]/20 px-4 py-2 transition hover:-translate-y-0.5">
              Compare
            </button>
            <button className="rounded-lg font-semibold bg-gradient-to-b from-[#ffb84d] to-[#ff9a1a] text-black px-4 py-2 transition hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(255,165,0,0.4)]">
              Book Test Ride
            </button>
          </div>
        </div>
      </div>

      {/* Specs */}
      <div className="bg-[#1a1a1a] rounded-lg p-5 mb-8 border border-[#ff6600]/10">
        <h3 className="text-[#ff8533] text-xl font-bold mb-3">Specifications</h3>
        <ul className="space-y-2 text-gray-300">
          <li>
            <strong>Displacement:</strong> {bike.displacement || "N/A"}
          </li>
          <li>
            <strong>Power:</strong> {bike.power}
          </li>
          <li>
            <strong>Torque:</strong> {bike.torque}
          </li>
          <li>
            <strong>Colors:</strong>{" "}
            {bike.colors ? bike.colors.join(", ") : "N/A"}
          </li>
        </ul>
      </div>

      {/* Fuel & Mileage */}
      <div className="bg-[#1a1a1a] rounded-lg p-5 mb-8 border border-[#ff6600]/10">
        <h3 className="text-[#ff8533] text-xl font-bold mb-3">Fuel & Mileage</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#111] p-4 rounded-lg border border-[#ff6600]/10 text-center">
            <h4 className="text-[#ffa500] font-semibold mb-1">Fuel Type</h4>
            <p>{bike.fuelType}</p>
          </div>
          <div className="bg-[#111] p-4 rounded-lg border border-[#ff6600]/10 text-center">
            <h4 className="text-[#ffa500] font-semibold mb-1">Mileage</h4>
            <p>{bike.mileage} km/l</p>
          </div>
        </div>
      </div>

      {/* EMI Calculator */}
      <div className="bg-[#1a1a1a] rounded-lg p-5 mb-8 border border-[#ff6600]/10">
        <h3 className="text-[#ff8533] text-xl font-bold mb-4">EMI Calculator</h3>
        <div className="flex flex-col sm:flex-row gap-4 mb-3">
          <input
            type="number"
            placeholder="Down Payment"
            value={downPayment}
            onChange={(e) => setDownPayment(parseInt(e.target.value))}
            className="flex-1 rounded-md bg-[#0f0f0f] border border-[#ff6600]/20 px-3 py-2 text-white outline-none focus:border-[#ff8533]"
          />
          <input
            type="number"
            placeholder="Tenure (months)"
            value={tenure}
            onChange={(e) => setTenure(parseInt(e.target.value))}
            className="flex-1 rounded-md bg-[#0f0f0f] border border-[#ff6600]/20 px-3 py-2 text-white outline-none focus:border-[#ff8533]"
          />
        </div>
        <p className="text-[#ffb84d] font-semibold">
          Estimated EMI: ₹{calculateEMI()}
        </p>
      </div>

      {/* Reviews */}
      <div className="bg-[#1a1a1a] rounded-lg p-5 border border-[#ff6600]/10">
        <h3 className="text-[#ff8533] text-xl font-bold mb-4">Reviews</h3>
        {bike.reviews && bike.reviews.length > 0 ? (
          bike.reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-[#0f0f0f] rounded-md p-3 mb-3 border border-[#ff6600]/10"
            >
              <p>
                <strong>{rev.user}</strong>{" "}
                <span className="text-yellow-400">
                  {"⭐".repeat(rev.rating)}
                </span>
              </p>
              <p className="text-gray-300">{rev.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No reviews yet</p>
        )}
      </div>
    </div>
  );
}
