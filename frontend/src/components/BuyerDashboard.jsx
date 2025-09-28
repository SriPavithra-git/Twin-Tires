// src/pages/BuyerDashboard.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BikeCard from "../components/BikeCard";
import "../TwinTiresLanding.css";

export default function BuyerDashboard() {
  const [wishlist, setWishlist] = useState([
    // sample bikes in wishlist
    { id: 1, name: "Royal Enfield Classic 350", price: "$2,200", city: "New Delhi", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=60" },
    { id: 2, name: "Yamaha R15", price: "$1,600", city: "Chennai", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60" },
  ]);

  const [bookings, setBookings] = useState([
    { id: 1, bike: "TVS Apache RTR 160", city: "Bengaluru", date: "2025-10-01" },
  ]);

  const toggleWishlist = (bike) => {
    if (wishlist.find((b) => b.id === bike.id)) setWishlist(wishlist.filter((b) => b.id !== bike.id));
    else setWishlist([...wishlist, bike]);
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <section className="dashboard-container">
        <h2>My Wishlist</h2>
        <div className="card-grid">
          {wishlist.map((bike) => (
            <BikeCard key={bike.id} bike={bike} inWishlist={true} toggleWishlist={() => toggleWishlist(bike)} />
          ))}
          {wishlist.length === 0 && <p>No bikes in wishlist.</p>}
        </div>

        <h2 style={{ marginTop: "40px" }}>Booked Test Rides</h2>
        {bookings.length > 0 ? (
          <div className="bookings-grid">
            {bookings.map((b) => (
              <div key={b.id} className="booking-card">
                <h3>{b.bike}</h3>
                <p>City: {b.city}</p>
                <p>Date: {b.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No booked test rides.</p>
        )}
      </section>

      <Footer />
    </div>
  );
}
