// PromotionsSection.jsx
import React, { useState, useEffect } from "react";
import PromoCard from "./PromoCard";
import BrandsGrid from "./BrandsGrid";
import "../TwinTiresLanding.css";

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
    const t = setInterval(() => setOfferIndex(i => (i + 1) % topOffers.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="promotions-wrap">
      {/* Top offers carousel */}
      <div className="offers-row">
        <div className="offers-left">
          <div className="offers-header">
            <h2>Top Offers</h2>
            <div className="muted">Grab limited-time deals</div>
          </div>

          <div className="offer-card" style={{ backgroundImage: `url(${topOffers[offerIndex].img})` }}>
            <div className="offer-overlay">
              <h3>{topOffers[offerIndex].title}</h3>
              <p className="muted">{topOffers[offerIndex].subtitle}</p>
              <div style={{ marginTop: 12 }}>
                <button className="btn-primary">Explore Offer</button>
                <button className="btn-outline" style={{ marginLeft: 8 }}>Notify Me</button>
              </div>
            </div>
          </div>

          {/* small indicator */}
          <div className="offer-indicators">
            {topOffers.map((_, i) => (
              <button key={i} className={`small-dot ${i === offerIndex ? "active" : ""}`} onClick={() => setOfferIndex(i)} />
            ))}
          </div>
        </div>

        {/* Price drops grid */}
        <div className="offers-right">
          <h3>Price Drops</h3>
          <div className="price-drop-grid">
            {priceDrops.map(p => (
              <PromoCard key={p.id} promo={p} onWishlist={() => onWishlist(p)} />
            ))}
          </div>
        </div>
      </div>

      {/* Brands to explore */}
      <div className="brands-section">
        <div className="brands-header">
          <h2>Brands to Explore</h2>
          <div className="muted">Popular manufacturers & trending collections</div>
        </div>
        <BrandsGrid onSelect={(id) => onCategorySelect(id)} />
      </div>

      {/* Small strip for trending discounts */}
      <div className="trending-strip">
        <div className="trending-item">🔥 Flash Sale: Bajaj — ₹15,000 off for today only</div>
        <div className="trending-item">⭐ New Arrivals: 2023 electric scooters</div>
        <div className="trending-item">💥 Exchange boost: Extra ₹5,000 on older bikes</div>
      </div>
    </section>
  );
}
