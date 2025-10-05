// PromotionsSection.jsx
import React, { useState, useEffect } from "react";
import PromoCard from "./PromoCard";
import BrandsGrid from "./BrandsGrid";

const topOffers = [
  { id: 1, title: "Festive Offer: Up to 20% OFF", subtitle: "On select Royal Enfield models", img: "royal&field.jpeg" },
  { id: 2, title: "Electric Week", subtitle: "Special EMI & exchange deals", img: "electric_bikes.gif" },
  { id: 3, title: "Sports Specials", subtitle: "Save on pre-owned sports bikes", img: "sports_bikes.jpg" },
];

const priceDrops = [
  { id: 11, title: "Royal Enfield Classic 350", price: "$1,999", drop: "10% off", img: "Rf.cms" },
  { id: 12, title: "Yamaha R15", price: "$1,450", drop: "12% off", img: "yamaha.jpg" },
  { id: 13, title: "Ola S1 Pro", price: "$1,600", drop: "8% off", img: "olas1.jpg" },
];

export default function PromotionsSection({ onCategorySelect = () => {}, onWishlist = () => {} }) {
  const [offerIndex, setOfferIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setOfferIndex((i) => (i + 1) % topOffers.length), 4500);
    return () => clearInterval(t);
  }, []);

  const activeOffer = topOffers[offerIndex];

  return (
    <section className="bg-black px-5 py-7 md:px-12">
      {/* Top offers + price drops row */}
      <div className="mb-6 flex flex-col gap-5 lg:flex-row">
        {/* Left: Top Offers */}
        <div className="flex-1">
          <div className="mb-3">
            <h2 className="m-0 text-[22px] font-semibold text-white">Top Offers</h2>
            <div className="text-sm text-white/80">Grab limited-time deals</div>
          </div>

          <div
            className="relative flex h-[340px] items-end overflow-hidden rounded-[12px] bg-cover bg-center shadow-[0_14px_40px_rgba(154,96,2,0.12)] sm:h-[300px] md:h-[340px]"
            style={{ backgroundImage: `url(${activeOffer.img})` }}
          >
            <div className="w-full bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.45)_25%,rgba(0,0,0,0.75)_100%)] p-5 text-white">
              <h3 className="mb-1 text-xl font-semibold">{activeOffer.title}</h3>
              <p className="text-sm text-white/80">{activeOffer.subtitle}</p>
              <div className="mt-3 flex gap-2">
                <button className="rounded-md bg-[linear-gradient(180deg,#ff9a1a,#ff6600)] px-4 py-2 font-bold text-[#111] shadow-[0_8px_20px_rgba(255,140,0,0.12)] transition hover:brightness-105">
                  Explore Offer
                </button>
                <button className="rounded-md border-2 border-[#ff6600] px-4 py-2 font-semibold text-[#ff6600] transition hover:-translate-y-0.5 hover:bg-[#ff6600] hover:text-white hover:shadow-[0_6px_12px_rgba(255,102,0,0.4)]">
                  Notify Me
                </button>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="mt-3 flex gap-2">
            {topOffers.map((_, i) => (
              <button
                key={i}
                onClick={() => setOfferIndex(i)}
                className={`h-[10px] w-[10px] rounded-full ${
                  i === offerIndex ? "bg-[#ff6600] shadow-[0_6px_18px_rgba(255,102,0,0.18)]" : "bg-white/35"
                }`}
                aria-label={`Go to offer ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Price Drops */}
        <aside className="w-full lg:w-[360px]">
          <h3 className="mb-3 text-lg font-semibold text-white">Price Drops</h3>
          <div className="flex flex-col gap-3">
            {priceDrops.map((p) => (
              <PromoCard key={p.id} promo={p} onWishlist={() => onWishlist(p)} />
            ))}
          </div>
        </aside>
      </div>

      {/* Brands to explore */}
      <div className="mt-4">
        <div className="mb-3 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
          <h2 className="m-0 text-[20px] font-semibold text-[#ff6600]">Brands to Explore</h2>
          <div className="text-sm text-white/70">Popular manufacturers &amp; trending collections</div>
        </div>
        <BrandsGrid onSelect={(id) => onCategorySelect(id)} />
      </div>

      {/* Trending strip */}
      <div className="mt-4 flex gap-3 overflow-x-auto px-1 py-2">
        <div className="whitespace-nowrap rounded-full border border-[rgba(255,102,0,0.3)] bg-[linear-gradient(90deg,rgba(255,102,0,0.2),rgba(255,102,0,0.05))] px-4 py-2 font-bold text-[#ff6600] shadow-[0_0_0] transition hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,102,0,0.25)]">
          🔥 Flash Sale: Bajaj — ₹15,000 off for today only
        </div>
        <div className="whitespace-nowrap rounded-full border border-[rgba(255,102,0,0.3)] bg-[linear-gradient(90deg,rgba(255,102,0,0.2),rgba(255,102,0,0.05))] px-4 py-2 font-bold text-[#ff6600]">
          ⭐ New Arrivals: 2023 electric scooters
        </div>
        <div className="whitespace-nowrap rounded-full border border-[rgba(255,102,0,0.3)] bg-[linear-gradient(90deg,rgba(255,102,0,0.2),rgba(255,102,0,0.05))] px-4 py-2 font-bold text-[#ff6600]">
          💥 Exchange boost: Extra ₹5,000 on older bikes
        </div>
      </div>
    </section>
  );
}
