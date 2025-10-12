import React, { useMemo, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ORANGE = "#ff6600";

const ALL_ACCESSORIES = [
  // Helmets
  { id: 1, title: "AXOR Apex Venom", price: 4999, cat: "Helmets", img: "/acc/helmet1.jpg", brand: "AXOR", rating: 4.6 },
  { id: 2, title: "SMK Twister",    price: 4299, cat: "Helmets", img: "/acc/helmet2.jpg", brand: "SMK",  rating: 4.4 },
  { id: 3, title: "Studds Thunder",  price: 2899, cat: "Helmets", img: "/acc/helmet3.jpg", brand: "Studds", rating: 4.2 },

  // Riding Jackets
  { id: 4, title: "Rynox Tornado Pro", price: 7499, cat: "Jackets", img: "/acc/jacket1.jpg", brand: "Rynox", rating: 4.7 },
  { id: 5, title: "Royal Enfield Streetwind", price: 5999, cat: "Jackets", img: "/acc/jacket2.jpg", brand: "RE", rating: 4.3 },

  // Gloves
  { id: 6, title: "BBG Air Mesh Gloves", price: 1799, cat: "Gloves", img: "/acc/gloves1.jpg", brand: "BBG", rating: 4.5 },
  { id: 7, title: "Scala Riding Gloves", price: 1499, cat: "Gloves", img: "/acc/gloves2.jpg", brand: "Scala", rating: 4.1 },

  // Boots
  { id: 8, title: "Solace Riding Boots", price: 5999, cat: "Boots", img: "/acc/boots1.jpg", brand: "Solace", rating: 4.4 },

  // Knee/Elbow Guards
  { id: 9, title: "Dirtsack Knee Guards", price: 2499, cat: "Guards", img: "/acc/guards1.jpg", brand: "Dirtsack", rating: 4.3 },

  // Luggage
  { id: 10, title: "Viaterra Tail Bag", price: 3999, cat: "Luggage", img: "/acc/luggage1.jpg", brand: "Viaterra", rating: 4.6 },
];

const FILTERS = ["All", "Helmets", "Jackets", "Gloves", "Boots", "Guards", "Luggage"];

export default function Accessories() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const [priceSort, setPriceSort] = useState(""); // "", "low", "high"

  const items = useMemo(() => {
    let list = [...ALL_ACCESSORIES];

    if (active !== "All") list = list.filter((i) => i.cat === active);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.brand.toLowerCase().includes(q) ||
          i.cat.toLowerCase().includes(q)
      );
    }

    if (priceSort === "low") list.sort((a, b) => a.price - b.price);
    if (priceSort === "high") list.sort((a, b) => b.price - a.price);

    return list;
  }, [active, query, priceSort]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">

      {/* Hero */}
      <header className="pt-24 pb-10 px-6 bg-gradient-to-b from-[#111] to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#ff6600]">
            Riding Accessories
          </h1>
          <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
            Helmets, jackets, gloves, boots, guards & luggage — curated for safety and style.
          </p>
        </div>
      </header>

      {/* Controls */}
      <section className="px-6 pb-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-3 py-1.5 rounded-md text-sm border transition
                  ${active === f
                    ? "border-[--o] text-[#ffcc80]"
                    : "border-[#222] text-gray-300 hover:border-[--o]/60"}`}
                style={{ "--o": ORANGE }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brand, item..."
              className="h-10 w-56 md:w-72 rounded-md bg-[#111] border border-[#333] px-3 text-sm outline-none focus:border-[--o] placeholder-gray-500"
              style={{ "--o": ORANGE }}
            />
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="h-10 rounded-md bg-[#111] border border-[#333] px-3 text-sm outline-none focus:border-[--o]"
              style={{ "--o": ORANGE }}
            >
              <option value="">Sort by</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <main className="px-6 pb-16">
<div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <article
              key={p.id}
              className="bg-[#111] border border-[#222] rounded-xl overflow-hidden hover:border-[--o]/60 hover:shadow-[0_8px_20px_rgba(255,102,0,0.25)] transition"
              style={{ "--o": ORANGE }}
            >
              <div className="h-48 w-full overflow-hidden bg-[#0f0f0f]">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400">{p.brand} • {p.cat}</p>
                <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-[22px] font-bold text-[#ffb84d]">
                    ₹{p.price.toLocaleString("en-IN")}
                  </div>
                  <span className="text-sm text-[#19a24b]">{p.rating} ★</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    className="h-10 rounded-md border border-[#ff6600]/50 text-[#ffb366] hover:border-[#ff6600] transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    className="h-10 rounded-md font-semibold text-black"
                    style={{
                      background: "linear-gradient(90deg,#ff6600,#ff8533)",
                      boxShadow: "0 0 12px rgba(255,102,0,0.45)",
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </article>
          ))}

          {items.length === 0 && (
            <div className="col-span-full text-center text-gray-400">
              No items match your filters.
            </div>
          )}
        </div>
      </main>

    </div>
  );
}