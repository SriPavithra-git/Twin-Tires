import React from "react";
import "../TwinTiresLanding.css";

export default function CompareModal({ bikes, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Compare Bikes</h2>
        <div className="compare-grid">
          {bikes.map((bike) => (
            <div key={bike.id} className="compare-card">
              <img src={bike.image} alt={bike.name} />
              <h4>{bike.name}</h4>
              <p>{bike.price}</p>
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
