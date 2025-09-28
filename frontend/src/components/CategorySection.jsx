// src/components/CategorySection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../TwinTiresLanding.css";

export default function CategorySection({ categories = [], onSelect = () => {} }) {
  const navigate = useNavigate();

  return (
    <section className="categories-wrap">
      <div className="categories-head">
        <h2>Search by Category</h2>
        <p className="muted">Explore styles & types — find what fits your ride</p>
      </div>

      <div className="categories-grid">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="category-tile"
            onClick={() => {
              // keep existing landing-page behavior
              onSelect(cat.id);                  // pass id to your landing page
              // navigate to Buy page with the category as a query param
              navigate(`/buy?category=${encodeURIComponent(cat.id)}`);
            }}
            aria-label={`Show ${cat.title}`}
          >
            <div className="category-media">
              <img src={cat.img} alt={cat.title} loading="lazy" />
            </div>
            <div className="category-info">
              <div className="category-title">{cat.title}</div>
              {cat.subtitle && <div className="category-sub muted">{cat.subtitle}</div>}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
