// src/pages/SellerDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth";
import api from "../lib/api";

export default function SellerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [bikes, setBikes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  /** ✅ Fetch bikes, orders, and reviews */
  useEffect(() => {
    if (!user?.id) return;

    const fetchAll = async () => {
      try {
        const [bikeRes, orderRes, reviewRes] = await Promise.all([
          api.get(`/new-bikes/seller/${user.id}`),
          api.get(`/orders/seller/${user.id}`),
          api.get(`/reviews/seller/${user.id}`),
        ]);

        setBikes(bikeRes || []);
        setOrders(orderRes || []);
        setReviews(reviewRes || []);
      } catch (err) {
        console.error("❌ Failed to load seller dashboard data:", err);
        alert("Failed to load your dashboard data. Check if backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [user]);

  /** ✅ Delete a bike */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bike?")) return;
    try {
      await api.delete(`/new-bikes/${id}`);
      setBikes((prev) => prev.filter((b) => b.id !== id));
      alert("✅ Bike deleted successfully");
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("Failed to delete bike");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#ff6600]">
            Seller Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your listed bikes, orders, and reviews easily.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          <SummaryCard label="Your Bikes" value={bikes.length} />
          <SummaryCard label="Orders Received" value={orders.length} />
          <SummaryCard label="Reviews" value={reviews.length} />
          <SummaryCard
            label="Pending Orders"
            value={orders.filter((o) => o.status !== "Delivered").length}
          />
          <SummaryCard label="Revenue (₹)" value="—" />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => navigate("/add-bike")}
            className="flex items-center gap-2 bg-gradient-to-r from-[#ff6600] to-[#ff8533]
               px-6 py-2.5 rounded-lg font-semibold text-black text-sm sm:text-base
               shadow-[0_0_15px_rgba(255,102,0,0.6)] hover:shadow-[0_0_25px_rgba(255,102,0,0.85)]
               hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
          >
            Add New Bike
          </button>

          <button
            onClick={() => navigate("/my-listings")}
            className="flex items-center gap-2 border border-[#ff6600]/60 text-[#ffcc80]
               px-6 py-2.5 rounded-lg font-semibold text-sm sm:text-base
               bg-[#111]/60 backdrop-blur-md
               hover:bg-[#ff6600]/10 hover:text-[#ffb366]
               hover:border-[#ff6600] hover:scale-[1.03] active:scale-[0.98]
               transition-all duration-200"
          >
            View All Listings
          </button>
        </div>

        {/* ✅ Your Listed Bikes */}
        <section className="rounded-2xl border border-[#ff6600]/10 bg-[#121212]/80 backdrop-blur-md p-6 mb-10">
          <h2 className="text-xl font-semibold text-[#ff9a1a] mb-4">
            Your Listed Bikes
          </h2>

          {loading ? (
            <p className="text-center text-gray-400 py-6">Loading bikes...</p>
          ) : bikes.length === 0 ? (
            <p className="text-center text-gray-400 py-6">
              No bikes listed yet. Add a new bike to get started!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm text-gray-300">
                <thead>
                  <tr className="bg-[#1a1a1a] text-[#ffb366]">
                    <th className="px-4 py-2 text-left">Image</th>
                    <th className="px-4 py-2 text-left">Brand</th>
                    <th className="px-4 py-2 text-left">Model</th>
                    <th className="px-4 py-2 text-center">Price (₹)</th>
                    <th className="px-4 py-2 text-center">Fuel</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bikes.map((bike) => (
                    <tr
                      key={bike.id}
                      className="border-b border-white/10 hover:bg-[#1a1a1a]/50 transition"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={bike.imageUrls?.[0] || "/placeholder-bike.jpg"}
                          alt={bike.brand}
                          className="w-16 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-3 font-semibold text-white">
                        {bike.brand}
                      </td>
                      <td className="px-4 py-3">{bike.model}</td>
                      <td className="px-4 py-3 text-center text-[#ffb84d]">
                        ₹{bike.price?.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">{bike.fuelType}</td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button
                          className="text-[#ffb366] hover:text-[#ff8533] transition"
                          onClick={() => navigate(`/edit-bike/${bike.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(bike.id)}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Orders Section */}
        <section className="rounded-2xl border border-[#ff6600]/10 bg-[#141414]/80 backdrop-blur-md p-6 mb-10">
          <h2 className="text-xl font-semibold text-[#ff9a1a] mb-4">
            Orders Received
          </h2>
          {orders.length === 0 ? (
            <p className="text-gray-400">No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="border border-white/10 rounded-lg bg-[#0f0f0f]/80 p-4 mb-3"
              >
                <p className="font-semibold text-[#ffb366]">
                  {order.bike?.model || "Bike"} — ₹{order.totalAmount}
                </p>
                <p className="text-sm text-gray-400">
                  Buyer: {order.buyerName || order.buyerId} | Status:{" "}
                  <span className="text-[#ff8533]">{order.status}</span>
                </p>
              </div>
            ))
          )}
        </section>

        {/* Reviews Section */}
        <section className="rounded-2xl border border-[#ff6600]/10 bg-[#141414]/80 backdrop-blur-md p-6">
          <h2 className="text-xl font-semibold text-[#ff9a1a] mb-4">
            Reviews Received
          </h2>
          {reviews.length === 0 ? (
            <p className="text-gray-400">No reviews yet.</p>
          ) : (
            reviews.map((rev) => (
              <div
                key={rev.id}
                className="border border-white/10 rounded-lg p-4 mb-3 bg-[#0f0f0f]/80"
              >
                <p className="text-[#ffb366] font-semibold">
                  {rev.userName || "Anonymous"}
                </p>
                <p className="text-gray-300 text-sm mt-1">{rev.comment}</p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-xl border border-[#ff6600]/10 bg-[#121212]/80 text-center p-4 shadow-[0_10px_20px_rgba(0,0,0,0.35)]">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-2xl font-extrabold text-[#ffb84d] mt-1">{value}</p>
    </div>
  );
}
