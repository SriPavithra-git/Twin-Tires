import React from "react";
import "../TwinTiresLanding.css";

export default function CompareModal({ bikes = [], onClose = () => {} }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal compare" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>Compare Bikes</h3>
          <button className="btn-outline" onClick={onClose}>Close</button>
        </div>

        <div className="compare-grid">
          {bikes.map((b) => (
            <div key={b.id} className="compare-card">
              <img src={b.image} alt={b.name} />
              <h4>{b.name}</h4>
              <div className="muted">{b.year} • {b.kms}</div>
              <div className="price">{b.price}</div>
              <div className="muted">{b.city}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, textAlign: "right" }}>
          <button className="btn-primary" onClick={() => alert("Compare clicked (demo)")}>Compare</button>
        </div>
      </div>
    </div>
  );
}
