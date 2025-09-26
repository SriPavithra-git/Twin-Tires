import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BikeCard from "./components/BikeCard";
import CompareModal from "./components/CompareModal";
import Footer from "./components/Footer";
import "./TwinTiresLanding.css";

export default function TwinTiresLanding() {
  const [wishlist, setWishlist] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [rideBooking, setRideBooking] = useState(null); // bike being booked

  const bikes = [
    {
      id: 1,
      name: "Royal Enfield Classic 350",
      price: "$2,200",
      city: "New Delhi",
      year: 2019,
      kms: "18,000 km",
      image:
        "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      name: "Ola S1 Pro",
      price: "$1,800",
      city: "Hyderabad",
      year: 2022,
      kms: "2,500 km",
      image:
        "https://images.unsplash.com/photo-1605792657660-2f2b11abfae1?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "TVS Apache RTR 160",
      price: "$1,200",
      city: "Bengaluru",
      year: 2020,
      kms: "9,200 km",
      image:
        "https://images.unsplash.com/photo-1524594153529-8f25c8c1a768?auto=format&fit=crop&w=800&q=60",
    },
    // add more objects as needed
  ];

  // Filter bikes by search query (name or city)
  const filtered = bikes.filter((b) =>
    (b.name + " " + b.city).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleWishlist = (bike) => {
    if (wishlist.find((b) => b.id === bike.id)) {
      setWishlist(wishlist.filter((b) => b.id !== bike.id));
    } else {
      setWishlist([...wishlist, bike]);
    }
  };

  return (
    <div className="tt-container">
      <Navbar
        onSearch={(q) => setSearchQuery(q)}
      />

      <Hero onSearch={(q) => setSearchQuery(q)} />

      <main className="tt-main">
        <section className="listings">
          <div className="listings-head">
            <h2>Popular Listings</h2>
            <div className="listings-actions">
              <span className="muted">{filtered.length} results</span>
              <button className="btn-outline">Sell a Bike</button>
            </div>
          </div>

          <div className="card-grid">
            {filtered.map((bike) => (
              <BikeCard
                key={bike.id}
                bike={bike}
                inWishlist={!!wishlist.find((b) => b.id === bike.id)}
                toggleWishlist={() => toggleWishlist(bike)}
                onBook={() => setRideBooking(bike)}
              />
            ))}
            {filtered.length === 0 && (
              <div className="no-results">No listings found for "{searchQuery}"</div>
            )}
          </div>
        </section>
      </main>

      {/* Compare bar */}
      {wishlist.length >= 2 && (
        <div className="compare-bar">
          <div className="compare-preview">
            <strong>{wishlist.length}</strong> bikes in wishlist
            <div className="compare-thumbs">
              {wishlist.slice(0, 4).map((b) => (
                <img key={b.id} src={b.image} alt={b.name} />
              ))}
            </div>
          </div>
          <div>
            <button
              className="btn-primary"
              onClick={() => setCompareOpen(true)}
            >
              Compare Now
            </button>
          </div>
        </div>
      )}

      {/* Compare modal */}
      {compareOpen && (
        <CompareModal
          bikes={wishlist}
          onClose={() => setCompareOpen(false)}
        />
      )}

      {/* Booking modal */}
      {rideBooking && (
        <div className="modal-backdrop" onClick={() => setRideBooking(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Book Test Ride</h3>
            <p>
              Booking test ride for <strong>{rideBooking.name}</strong> in{" "}
              {rideBooking.city}.
            </p>
            <label>
              Your name
              <input placeholder="Full name" />
            </label>
            <label>
              Phone
              <input placeholder="Mobile number" />
            </label>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn-outline" onClick={() => setRideBooking(null)}>Cancel</button>
              <button
                className="btn-primary"
                onClick={() => {
                  alert("Test ride requested — demo only");
                  setRideBooking(null);
                }}
              >
                Request Ride
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
