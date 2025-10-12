// src/components/BuyBikes.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UsedBikeApi } from "../lib/api";
import UsedBikeCard from "./UsedBikeCard";

function currency(x) {
  return Number(x || 0).toLocaleString("en-IN", {
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
  const [bikeType, setBikeType] = useState("new");

  // 🔧 New filters
  const [priceRange, setPriceRange] = useState(5000000);
  const [mileageRange, setMileageRange] = useState(0);
  const [minYear, setMinYear] = useState(2000);

  const [newBikes, setNewBikes] = useState([]);
  const [usedBikes, setUsedBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const filterRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const q = (urlParams.get("q") || "").trim();
  const categoryParam = (urlParams.get("category") || "").trim().toLowerCase();

  // ✅ Category map (ID → category)
  const categoryMap = {
    2: "sports", 3: "sports", 4: "sports", 5: "sports",
    6: "cruiser", 7: "cruiser", 8: "commuter", 9: "commuter",
    10: "commuter", 11: "commuter", 12: "commuter",
    13: "sports", 14: "adventure", 15: "cruiser",
    16: "electric", 17: "electric", 18: "electric",
    19: "cruiser", 20: "sports", 21: "adventure",
  };

  // ✅ Fetch NEW bikes
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch("/api/new-bikes");
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();

        const mapped = (data || []).map((b) => {
          let imgPath =
            b.imageUrl ||
            (Array.isArray(b.images) && b.images[0]) ||
            b.image ||
            null;

          if (!imgPath) imgPath = "/placeholder-bike.jpg";
          else if (!imgPath.startsWith("http")) {
            imgPath = imgPath.startsWith("/")
              ? `http://localhost:8080${imgPath}`
              : `http://localhost:8080/${imgPath}`;
          }

          return {
            id: b.id,
            brand: b.brand,
            model: b.model,
            price: b.price,
            fuelType: b.fuelType,
            mileage: b.mileage,
            img: imgPath,
            city: b.city || "—",
            year: b.year || "",
            condition: b.condition || "New",
            category: categoryMap[b.id] || "other",
          };
        });

        if (!ignore) setNewBikes(mapped);
      } catch (e) {
        if (!ignore) setErr(e.message || "Failed to load bikes");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  // 🟢 Fetch USED bikes
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/api/used-bikes");
        if (!res.ok) throw new Error(`Used bikes API ${res.status}`);
        const data = await res.json();

        const mapped = (data || []).map((b) => ({
          id: b.id,
          brand: b.brand,
          model: b.model,
          price: b.price,
          fuelType: b.fuelType,
          mileage: b.mileage,
          img: (() => {
            const url = b.imageUrl || (Array.isArray(b.images) && b.images[0]);
            if (!url) return "/placeholder-bike.jpg";
            if (url.startsWith("http")) return url;
            const fixed = url.startsWith("/") ? url.slice(1) : url;
            return `http://localhost:8080/${fixed}`;
          })(),
          city: b.city || "—",
          year: b.year || "",
          condition: b.conditionStatus || "Used",
          category: "used",
        }));

        if (!ignore) setUsedBikes(mapped);
      } catch (err) {
        if (!ignore) console.error("Used bikes fetch error:", err);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  // 🧭 Close sidebar on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setShowFilters(false);
    };

    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showFilters]);

  const dataSource = bikeType === "new" ? newBikes : usedBikes;

  const brands = useMemo(() => {
    const set = new Set(dataSource.map((b) => b.brand).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [dataSource]);

  const fuels = useMemo(() => {
    const set = new Set(dataSource.map((b) => b.fuelType).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [dataSource]);

  const flattenObject = (obj) => {
    if (!obj || typeof obj !== "object") return [];
    return Object.values(obj).flatMap((v) =>
      v && typeof v === "object" ? flattenObject(v) : [v]
    );
  };

  const filteredBikes = useMemo(() => {
  let list = dataSource;
  const needle = q?.toLowerCase() || "";

  // 🔍 Search filter
  if (needle) {
    list = list.filter((b) =>
      flattenObject(b)
        .filter((v) => typeof v === "string" || typeof v === "number")
        .some((v) => String(v).toLowerCase().includes(needle))
    );
  }

  // 📂 Category filter
  if (categoryParam) {
    list = list.filter(
      (b) => b.category?.toLowerCase() === categoryParam
    );
  }

  // 🎚️ Filters
  list = list.filter((b) => {
    const brandMatch = selectedBrand === "All" || b.brand === selectedBrand;
    const fuelMatch = selectedFuel === "All" || b.fuelType === selectedFuel;

    // 🧠 Clean and parse price from different formats
const priceNum = (() => {
  if (!b.price) return 0;
  let val = b.price;

  // Remove commas, ₹ symbol, and any spaces
  if (typeof val === "string") {
    val = val.replace(/[^0-9.]/g, "");
  }

  // Handle "Lakh" text formats (e.g., "1.5 Lakh")
  if (typeof b.price === "string" && b.price.toLowerCase().includes("lakh")) {
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num * 100000;
  }

  const num = parseFloat(val);
  return isNaN(num) ? 0 : num;
})();

    const mileageNum = Number(b.mileage) || 0;
    const yearNum = Number(b.year) || 0;

    const priceMatch = priceNum <= priceRange;
    const mileageMatch = mileageNum >= mileageRange;
    const yearMatch = yearNum >= minYear || yearNum === 0; // include missing year bikes

    return brandMatch && fuelMatch && priceMatch && mileageMatch && yearMatch;
  });

  return list;
}, [
  dataSource,
  q,
  selectedBrand,
  selectedFuel,
  categoryParam,
  priceRange,
  mileageRange,
  minYear,
]);


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
    <div className="min-h-screen bg-[#0d0d0d] text-white relative">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-xl font-bold text-[#ff6600]">Buy Bikes</h1>

        <div className="flex items-center gap-3">
          {q && (
            <span className="text-sm text-white/80">
              Results for{" "}
              <span className="text-[#ffb366] font-semibold">“{q}”</span>
            </span>
          )}
          {categoryParam && (
            <span className="text-sm text-[#ffb366] font-semibold capitalize">
              Category: {categoryParam}
            </span>
          )}

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

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-6">
        <div className="flex justify-center md:justify-start border-b border-[#ff6600]/20">
          <button
            onClick={() => setBikeType("new")}
            className={`px-6 py-2 font-semibold transition-all ${
              bikeType === "new"
                ? "text-[#ff6600] border-b-2 border-[#ff6600]"
                : "text-gray-400 hover:text-[#ff8533]"
            }`}
          >
            New Bikes
          </button>
          <button
            onClick={() => setBikeType("used")}
            className={`px-6 py-2 font-semibold transition-all ${
              bikeType === "used"
                ? "text-[#ff6600] border-b-2 border-[#ff6600]"
                : "text-gray-400 hover:text-[#ff8533]"
            }`}
          >
            Used Bikes
          </button>
        </div>
      </div>

      {/* Sidebar Filters */}
      <aside
        ref={filterRef}
        className={`fixed top-24 left-0 w-64 bg-[#1a1a1a] border-r border-[#ff6600]/10 rounded-r-lg p-5 shadow-[0_4px_16px_rgba(0,0,0,0.6)] transform transition-all duration-300 ease-in-out ${
          showFilters ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <h3 className="text-[#ff8533] text-xl font-bold mb-4">Filters</h3>

        {/* Brand */}
        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-1">Brand</label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full bg-[#0f0f0f] border border-[#ff6600]/20 text-white rounded-md p-2 focus:border-[#ff8533] outline-none"
          >
            {brands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Fuel */}
        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-1">Fuel Type</label>
          <select
            value={selectedFuel}
            onChange={(e) => setSelectedFuel(e.target.value)}
            className="w-full bg-[#0f0f0f] border border-[#ff6600]/20 text-white rounded-md p-2 focus:border-[#ff8533] outline-none"
          >
            {fuels.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-1">Max Price (₹)</label>
          <input
            type="range"
            min="50000"
            max="5000000"
            step="50000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-400 text-right">
            Up to ₹{priceRange.toLocaleString("en-IN")}
          </div>
        </div>

        {/* Mileage */}
        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-1">Min Mileage (km/l)</label>
          <input
            type="range"
            min="0"
            max="80"
            step="1"
            value={mileageRange}
            onChange={(e) => setMileageRange(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-gray-400 text-right">Above {mileageRange} km/l</div>
        </div>

        {/* Year */}
        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-1">Min Year</label>
          <input
            type="number"
            min="2000"
            max={new Date().getFullYear()}
            value={minYear}
            onChange={(e) => setMinYear(Number(e.target.value))}
            className="w-full bg-[#0f0f0f] border border-[#ff6600]/20 text-white rounded-md p-2 text-sm focus:border-[#ff8533] outline-none"
          />
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            setSelectedBrand("All");
            setSelectedFuel("All");
            setPriceRange(5000000);
            setMileageRange(0);
            setMinYear(2000);
          }}
          className="mt-3 w-full text-sm text-black font-semibold bg-gradient-to-r from-[#ff6600] to-[#ff8533] rounded-md py-2 hover:brightness-110 transition-all"
        >
          Clear Filters
        </button>
      </aside>

      {/* Bikes Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {loading && <p className="text-center text-gray-400">Loading...</p>}
        {err && <p className="text-center text-red-400">{err}</p>}

        {!loading && !err && filteredBikes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBikes.map((b) =>
              bikeType === "used" ? (
                <UsedBikeCard
                  key={b.id}
                  bike={b}
                  compareSet={compareSet}
                  toggleCompare={toggleCompare}
                />
              ) : (
                <BikeCard
                  key={b.id}
                  bike={b}
                  compareSet={compareSet}
                  toggleCompare={toggleCompare}
                  navigate={navigate}
                />
              )
            )}
          </div>
        ) : (
          !loading &&
          !err && (
            <p className="text-center text-gray-400 mt-10">
              No bikes found
              {categoryParam ? ` in ${categoryParam}` : q ? ` for “${q}”` : ""}.
            </p>
          )
        )}
      </main>
    </div>
  );
}

// ✅ Inline BikeCard
import { useNavigate as useNavHook } from "react-router-dom";
function BikeCard({ bike: b = {}, compareSet = [], toggleCompare = () => {}, navigate }) {
  const navHook = useNavHook();
  const go = navigate || navHook;
  const img =
    b.img ||
    (Array.isArray(b.imageUrls) ? b.imageUrls[0] : undefined) ||
    b.image ||
    "/placeholder-bike.jpg";

  return (
    <div className="bg-[#151515] border border-[rgba(255,136,0,0.06)] rounded-xl overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.55)] flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(0,0,0,0.6)]">
      <div className="w-full h-[200px] bg-[#0f0f0f]">
        <img src={img} alt={b.model || ""} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-auto">
        <h3 className="text-[#ffa500] text-lg font-semibold">
          {b.brand} {b.model}
        </h3>
        <p className="text-[#ffb84d] font-bold text-lg">{currency(b.price)}</p>
        <p className="text-sm text-gray-400">
          {b.fuelType} {b.mileage ? `| ${b.mileage} km/l` : ""}{" "}
          {b.city ? `| ${b.city}` : ""}
        </p>
      </div>
      <div className="flex gap-3 justify-center p-3 border-t border-[rgba(255,255,255,0.05)] bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.01))]">
        <button
          onClick={() => toggleCompare(b.id)}
          className={`rounded-lg font-semibold px-3 py-2 text-sm transition-all duration-300 ${
            (compareSet || []).includes(b.id)
              ? "bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black shadow-[0_0_12px_rgba(255,102,0,0.6)] hover:shadow-[0_0_18px_rgba(255,102,0,0.9)]"
              : "bg-[#222] text-[#ff6600] border border-[#ff6600]/30 hover:bg-[#ff6600]/10"
          }`}
        >
          {(compareSet || []).includes(b.id) ? "Deselect" : "Compare"}
        </button>
        <button
          onClick={() => go(`/bike/${b.id}`)}
          className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black font-semibold px-3 py-2 rounded-lg text-sm shadow-[0_0_12px_rgba(255,102,0,0.6)] hover:shadow-[0_0_20px_rgba(255,102,0,0.9)] hover:brightness-110 transition-all duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
