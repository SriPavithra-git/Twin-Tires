import React, { useState, useEffect, useRef } from "react";
import "../TwinTiresLanding.css"; 
import { SAMPLE_BIKES } from "./BikeData";
import { useNavigate } from "react-router-dom";

function currency(x) {
  return x.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}

export default function BuyBikes() {
  const [compareSet, setCompareSet] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedFuel, setSelectedFuel] = useState("All");
  const filterRef = useRef(null);
  const navigate = useNavigate();

  // Close filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBikes = SAMPLE_BIKES.filter(b => 
    (selectedBrand === "All" || b.brand === selectedBrand) &&
    (selectedFuel === "All" || b.fuelType === selectedFuel)
  );

  function toggleCompare(id) {
    setCompareSet(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) {
        alert("Maximum 3 bikes can be compared");
        return prev;
      }
      return [...prev, id];
    });
  }

  function goToCompare() {
    if (compareSet.length < 2) {
      alert("Select at least 2 bikes to compare");
      return;
    }
    navigate("/compare", { state: { bikesToCompare: compareSet } });
  }

  return (
    <div className="buy-page">
      {/* Navbar */}
      <nav className="tt-nav">
        <div className="nav-left">
          <img src="/bikeman.png" alt="TwinTires" className="nav-logo" />
          <span className="brand">TwinTires</span>
        </div>
        <div className="nav-right">
          <button className="hamburger" onClick={() => setShowFilters(!showFilters)}>
            &#9776;
          </button>
          {compareSet.length > 1 && (
            <button className="btn-compare-nav" onClick={goToCompare}>
              Compare ({compareSet.length})
            </button>
          )}
        </div>
      </nav>

      {/* Filters */}
      <aside ref={filterRef} className={`buy-filters-column ${showFilters ? "show" : ""}`}>
        <h3>Filters</h3>
        <div className="buy-filter-block">
          <label>Brand</label>
          <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
            <option>All</option>
            {Array.from(new Set(SAMPLE_BIKES.map(b => b.brand))).map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
        <div className="buy-filter-block">
          <label>Fuel Type</label>
          <select value={selectedFuel} onChange={e => setSelectedFuel(e.target.value)}>
            <option>All</option>
            {Array.from(new Set(SAMPLE_BIKES.map(b => b.fuelType))).map(f => <option key={f}>{f}</option>)}
          </select>
        </div>
      </aside>
      

      {/* Bikes Grid */}
      <main className="buy-bike-grid">
        {filteredBikes.length > 0 ? filteredBikes.map(b => (
          <div key={b.id} className="buy-bike-card">
            <div className="bike-img-container">
              <img src={b.img} alt={b.model} />
            </div>
            <div className="bike-info-card">
              <h3>{b.brand} {b.model}</h3>
              <p className="price">{currency(b.price)}</p>
              <p>{b.fuelType} | {b.mileage} km/l</p>
            </div>
            <div className="card-buttons">
              <button 
                onClick={() => toggleCompare(b.id)} 
                className={`btn-compare-card ${compareSet.includes(b.id) ? "selected" : ""}`}>
                {compareSet.includes(b.id) ? "Deselect" : "Compare"}
              </button>
              <button 
                onClick={() => navigate(`/bike/${b.id}`)} 
                className="buy-btn-view-details">
                View Details
              </button>
            </div>
          </div>
        )) : (
          <p className="no-results">No bikes match your filters.</p>
        )}
      </main>
    </div>
  );
}
