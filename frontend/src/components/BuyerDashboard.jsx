// src/pages/BuyerDashboard.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BikeCard from "../components/BikeCard";

export default function BuyerDashboard() {
  const [wishlist, setWishlist] = useState([
    // sample bikes in wishlist
    {
      id: 1,
      name: "Royal Enfield Classic 350",
      price: "$2,200",
      city: "New Delhi",
      image:
        "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      name: "Yamaha R15",
      price: "$1,600",
      city: "Chennai",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60",
    },
  ]);

  const [bookings] = useState([
    { id: 1, bike: "TVS Apache RTR 160", city: "Bengaluru", date: "2025-10-01" },
  ]);

  const toggleWishlist = (bike) => {
    if (wishlist.find((b) => b.id === bike.id))
      setWishlist(wishlist.filter((b) => b.id !== bike.id));
    else setWishlist([...wishlist, bike]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto min-h-[80vh] max-w-[1280px] px-5 py-8 md:px-8">
        {/* Wishlist */}
        <h2 className="mb-4 text-2xl font-semibold">My Wishlist</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.length > 0 ? (
            wishlist.map((bike) => (
              <BikeCard
                key={bike.id}
                bike={bike}
                inWishlist={true}
                toggleWishlist={() => toggleWishlist(bike)}
                onBook={() => {}}
              />
            ))
          ) : (
            <p className="col-span-full rounded-md border border-white/10 bg-black/40 p-6 text-center text-[#bdbdbd]">
              No bikes in wishlist.
            </p>
          )}
        </div>

        {/* Booked Test Rides */}
        <h2 className="mt-10 mb-3 text-2xl font-semibold">Booked Test Rides</h2>
        {bookings.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="w-full max-w-xs rounded-[12px] bg-[#111] p-4 shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
              >
                <h3 className="mb-1 text-lg font-semibold">{b.bike}</h3>
                <p className="text-sm text-[#cfcfcf]">City: {b.city}</p>
                <p className="text-sm text-[#cfcfcf]">Date: {b.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-md border border-white/10 bg-black/40 p-6 text-center text-[#bdbdbd]">
            No booked test rides.
          </p>
        )}
      </section>

      <Footer />
    </div>
  );
}
