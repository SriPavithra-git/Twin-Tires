// src/components/CompareBikes.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CompareBikes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const bikesToCompare = location.state?.bikesToCompare || [];

  useEffect(() => {
    if (!bikesToCompare.length) {
      navigate("/buy");
      return;
    }

    const fetchBikes = async () => {
      try {
        setLoading(true);
        setError("");

        const results = await Promise.all(
          bikesToCompare.map(async (id) => {
            try {
              const res = await fetch(`/api/new-bikes/${id}`);
              if (res.ok) {
                const data = await res.json();
                return {
                  id: data.id,
                  brand: data.brand,
                  model: data.model,
                  price: data.price,
                  mileage: data.mileage || "—",
                  fuelType: data.fuelType || "—",
                  city: data.city || "—",
                  year: data.year || "—",
                  image:
                    data.image ||
                    (Array.isArray(data.imageUrls) ? data.imageUrls[0] : undefined) ||
                    "/placeholder-bike.jpg",
                };
              } else {
                // fallback to used bikes API
                const usedRes = await fetch(`http://localhost:8080/api/used-bikes/${id}`);
                if (!usedRes.ok) throw new Error();
                const usedData = await usedRes.json();
                return {
                  id: usedData.id,
                  brand: usedData.brand,
                  model: usedData.model,
                  price: usedData.price,
                  mileage: usedData.mileage || "—",
                  fuelType: usedData.fuelType || "—",
                  city: usedData.city || "—",
                  year: usedData.year || "—",
                  image:
                    usedData.imageUrl ||
                    (Array.isArray(usedData.images) && usedData.images[0]) ||
                    "/placeholder-bike.jpg",
                };
              }
            } catch {
              return null;
            }
          })
        );

        setBikes(results.filter(Boolean));
      } catch (e) {
        setError("Failed to load bike details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, [bikesToCompare, navigate]);

  if (loading) {
    return <p className="text-center text-gray-400 mt-10">Loading comparison...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400 mt-10">{error}</p>;
  }

  if (bikes.length < 2) {
    return <p className="text-center text-gray-400 mt-10">Select at least 2 bikes to compare.</p>;
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-[#ff6600] mb-8 text-center">
        Compare Bikes
      </h1>

      <div
        className={`grid gap-6 justify-center ${
          bikes.length === 2 ? "grid-cols-2" : "grid-cols-3"
        }`}
      >
        {bikes.map((b) => (
          <div
            key={b.id}
            className="bg-[#151515] border border-[#ff6600]/20 rounded-xl p-4 shadow-[0_8px_20px_rgba(0,0,0,0.6)] text-center"
          >
           <div className="w-full h-48 bg-[#0f0f0f] flex items-center justify-center rounded-lg mb-4 overflow-hidden">
  <img
    src={b.image}
    alt={b.model}
    className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
  />
</div>

            <h2 className="text-[#ffa500] font-semibold text-lg mb-2">
              {b.brand} {b.model}
            </h2>
            <p className="text-[#ffb366] font-bold text-xl mb-3">
              ₹{b.price?.toLocaleString("en-IN")}
            </p>
            <div className="text-sm text-gray-300 space-y-1">
              <p><span className="text-[#ff8533]">Mileage:</span> {b.mileage}</p>
              <p><span className="text-[#ff8533]">Fuel Type:</span> {b.fuelType}</p>
              <p><span className="text-[#ff8533]">City:</span> {b.city}</p>
              <p><span className="text-[#ff8533]">Year:</span> {b.year}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/buy")}
          className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black font-semibold px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(255,102,0,0.6)] hover:shadow-[0_0_25px_rgba(255,102,0,0.9)] transition-all duration-300"
        >
          Back to Bikes
        </button>
      </div>
    </div>
  );
}
