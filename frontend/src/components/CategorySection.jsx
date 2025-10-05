import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategorySection({ categories = [], onSelect = () => {} }) {
  const navigate = useNavigate();

  return (
    <section className="py-10 px-6 bg-[#0d0d0d] text-white">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#ffb84d] mb-2">
          Search by Category
        </h2>
        <p className="text-gray-400 text-sm">
          Explore styles & types — find what fits your ride
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              onSelect(cat.id);
              navigate(`/buy?category=${encodeURIComponent(cat.id)}`);
            }}
            aria-label={`Show ${cat.title}`}
            className="group relative flex flex-col overflow-hidden rounded-xl bg-[#151515] border border-[#ff6600]/10 shadow-[0_6px_16px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_28px_rgba(255,136,0,0.15)]"
          >
            {/* Image */}
            <div className="w-full h-44 bg-[#111] overflow-hidden">
              <img
                src={cat.img}
                alt={cat.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Info */}
            <div className="p-4 text-center flex flex-col justify-center">
              <div className="text-[#ffa500] font-semibold text-lg mb-1">
                {cat.title}
              </div>
              {cat.subtitle && (
                <div className="text-gray-400 text-sm">{cat.subtitle}</div>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
