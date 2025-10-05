import React from "react";

/* Example brands — images from public (root) or use external urls */
const brands = [
  { id: "royal", name: "Royal Enfield", img: "/brand_royal&field.png" },
  { id: "ola", name: "Ola", img: "/brand_ola.png" },
  { id: "yamaha", name: "Yamaha", img: "/brand_yamaha.gif" },
  { id: "tvs", name: "TVS", img: "/brand_tvs.png" },
  { id: "hero", name: "Hero", img: "/brand_hero.jpeg" },
  { id: "bajaj", name: "Bajaj", img: "/brand_bajaj.avif" },
];

export default function BrandsGrid({ onSelect = () => {} }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 py-6 px-4 bg-[#0d0d0d]">
      {brands.map((b) => (
        <button
          key={b.id}
          onClick={() => onSelect(b.id)}
          className="group flex flex-col items-center justify-center p-4 rounded-xl bg-[#151515] border border-[#ff6600]/10 shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,102,0,0.2)]"
        >
          <img
            src={b.img}
            alt={b.name}
            className="w-20 h-20 object-contain mb-2 group-hover:scale-105 transition-transform"
          />
          <div className="text-[#ffb84d] font-semibold text-sm group-hover:text-[#ff8533] transition-colors">
            {b.name}
          </div>
        </button>
      ))}
    </div>
  );
}
