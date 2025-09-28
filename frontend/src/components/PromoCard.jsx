// PromoCard.jsx
import React from "react";
import "../TwinTiresLanding.css";

export default function PromoCard({ promo = {}, onWishlist = () => {} }) {
  return (
    <div className="promo-card">
      <div className="promo-media">
        <img src={promo.img} alt={promo.title} />
        <div className="price-drop-badge">{promo.drop}</div>
      </div>
      <div className="promo-body">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 style={{ margin: 0 }}>{promo.title}</h4>
          <div className="price">{promo.price}</div>
        </div>
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <button className="btn-outline small" onClick={onWishlist}>Wishlist</button>
          <button className="btn-primary small">View</button>
        </div>
      </div>
    </div>
  );
}
