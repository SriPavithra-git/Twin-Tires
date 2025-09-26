import React from "react";
import "../TwinTiresLanding.css";

export default function BikeCard({ bike, toggleWishlist, inWishlist, onBook }) {
  return (
    <article className="bike-card">
      <div className="bike-media">
        <img src={bike.image} alt={bike.name} />
      </div>
      <div className="bike-body">
        <h3>{bike.name}</h3>
        <div className="muted small">{bike.year} • {bike.kms} • {bike.city}</div>
        <div className="price">{bike.price}</div>
        <div className="card-actions">
          <button className="btn-primary" onClick={onBook}>Book Test Ride</button>
          <button
            className={inWishlist ? "btn-primary outline" : "btn-outline"}
            onClick={toggleWishlist}
          >
            {inWishlist ? "Wishlisted" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </article>
  );
}
