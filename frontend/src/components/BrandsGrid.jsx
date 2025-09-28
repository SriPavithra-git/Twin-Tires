// BrandsGrid.jsx
import React from "react";
import "../TwinTiresLanding.css";

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
    <div className="brands-grid">
      {brands.map(b => (
        <button key={b.id} className="brand-tile" onClick={() => onSelect(b.id)}>
          <img src={b.img} alt={b.name} />
          <div className="brand-name">{b.name}</div>
        </button>
      ))}
    </div>
  );
}
