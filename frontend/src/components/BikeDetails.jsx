import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { SAMPLE_BIKES } from "./BikeData";
import "../TwinTiresLanding.css";

export default function BikeDetails() {
  const { id } = useParams();
  const bike = SAMPLE_BIKES.find(b => b.id === id);
  const [currentImg, setCurrentImg] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);

  if (!bike) return <h2 className="center-text">Bike not found</h2>;

  const calculateEMI = () => {
    const principal = bike.price - downPayment;
    const monthlyRate = 0.01;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return emi.toFixed(0);
  };

  return (
    <div className="bike-details-page">

      {/* Top Section: Images & Quick Info */}
      <div className="bike-top-section">
        <div className="bike-images">
          <img src={bike.img} alt={bike.model} className="main-bike-img" />
          {bike.images && bike.images.length > 1 && (
            <div className="thumbnails">
              {bike.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  onClick={() => setCurrentImg(idx)}
                  className={currentImg === idx ? "active-thumb" : ""}
                />
              ))}
            </div>
          )}
        </div>

        <div className="bike-summary">
          <h1 className="bike-title">{bike.brand} {bike.model}</h1>
          <h2 className="bike-price">₹{bike.price.toLocaleString()}</h2>
          <p className="bike-fuel-mileage">{bike.fuelType} | {bike.mileage} km/l</p>
          <p className="bike-description">{bike.description}</p>
          
          <div className="action-buttons">
            <button className="buy-btn">Add to Wishlist</button>
            <button className="compare-btn">Compare</button>
            <button className="buy-btn">Book Test Ride</button>
          </div>
        </div>
      </div>

      {/* Section: Specifications */}
      <div className="section-card">
        <h3 className="section-strip">Specifications</h3>
        <ul className="spec-list">
          <li><strong>Displacement:</strong> {bike.displacement || "N/A"}</li>
          <li><strong>Power:</strong> {bike.power}</li>
          <li><strong>Torque:</strong> {bike.torque}</li>
          <li><strong>Colors:</strong> {bike.colors ? bike.colors.join(", ") : "N/A"}</li>
        </ul>
      </div>

      {/* Section: Fuel & Mileage */}
      <div className="section-card">
        <h3 className="section-strip">Fuel & Mileage</h3>
        <div className="fuel-cards">
          <div className="fuel-card">
            <h4>Fuel Type</h4>
            <p>{bike.fuelType}</p>
          </div>
          <div className="fuel-card">
            <h4>Mileage</h4>
            <p>{bike.mileage} km/l</p>
          </div>
        </div>
      </div>

      {/* Section: EMI Calculator */}
      <div className="section-card">
        <h3 className="section-strip">EMI Calculator</h3>
        <div className="emi-inputs">
          <input
            type="number"
            placeholder="Down Payment"
            value={downPayment}
            onChange={(e) => setDownPayment(parseInt(e.target.value))}
          />
          <input
            type="number"
            placeholder="Tenure (months)"
            value={tenure}
            onChange={(e) => setTenure(parseInt(e.target.value))}
          />
        </div>
        <p className="emi-result">Estimated EMI: ₹{calculateEMI()}</p>
      </div>

      {/* Section: Reviews */}
      <div className="section-card">
        <h3 className="section-strip">Reviews</h3>
        {bike.reviews && bike.reviews.length > 0 ? (
          bike.reviews.map((rev, i) => (
            <div key={i} className="review-card">
              <p><strong>{rev.user}</strong> <span className="stars">{'⭐'.repeat(rev.rating)}</span></p>
              <p>{rev.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>

    </div>
  );
}
