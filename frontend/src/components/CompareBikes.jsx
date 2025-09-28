import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SAMPLE_BIKES } from "./BikeData";
import "../TwinTiresLanding.css";

function currency(x) {
  return x.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}

export default function ComparePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bikesToCompare } = location.state || { bikesToCompare: [] };

  const selectedBikes = SAMPLE_BIKES.filter(b => bikesToCompare.includes(b.id));

  if (selectedBikes.length < 2) {
    return (
      <div className="compare-page">
        <h2>Select at least 2 bikes to compare.</h2>
        <button onClick={() => navigate(-1)} className="btn">Go Back</button>
      </div>
    );
  }

  return (
    <div className="compare-page">
      <h2>Compare Bikes</h2>
      <div className="compare-grid">
        {selectedBikes.map(b => (
          <div key={b.id} className="compare-card">
            <img src={b.img} alt={b.model} />
            <h3>{b.brand} {b.model}</h3>
            <p>Price: {currency(b.price)}</p>
            <p>Fuel: {b.fuelType}</p>
            <p>Mileage: {b.mileage} km/l</p>
            <p>{b.description}</p>
          </div>
        ))}
      </div>
      <button onClick={() => navigate(-1)} className="btn">Back to Bikes</button>
    </div>
  );
}
