// src/components/OrderDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OrderApi } from "../lib/api";
import Navbar from "./Navbar";
import Footer from "./Footer";

const fullImageUrl = (url) => {
  if (!url) return "/placeholder-bike.jpg";
  return url.startsWith("http")
    ? url
    : `http://localhost:8080/${url.startsWith("/") ? url.slice(1) : url}`;
};

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await OrderApi.getById(id);
        setOrder(res);
      } catch (err) {
        console.error("❌ Failed to fetch order details:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center">
        Loading order details...
      </div>
    );

  if (!order)
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col items-center justify-center">
        <p>Order not found.</p>
        <button
          onClick={() => navigate("/account/orders")}
          className="mt-4 px-4 py-2 bg-[#ff6600] text-black font-semibold rounded-md"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#ffb84d]">
              Order #{order.id}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Placed on{" "}
              {new Date(order.createdAt || order.date).toLocaleString()}
            </p>
          </div>
          <span
            className={`px-4 py-1 text-sm font-semibold rounded ${
              order.status === "DELIVERED"
                ? "bg-green-700/40 text-green-300"
                : order.status === "PENDING"
                ? "bg-yellow-800/40 text-yellow-200"
                : "bg-gray-700/40 text-gray-300"
            }`}
          >
            {order.status || "PENDING"}
          </span>
        </div>

        {/* Bikes in order */}
        <div className="bg-[#121212] border border-white/10 rounded-xl p-5 mb-6">
          <h2 className="text-lg font-semibold text-[#ffb84d] mb-3">
            Ordered Bikes
          </h2>
          {order.items && order.items.length > 0 ? (
            <div className="space-y-3">
              {order.items.map((it, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-[#1a1a1a] p-2 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={fullImageUrl(it.image)}
                      alt={it.model}
                      className="w-20 h-14 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-semibold">
                        {it.brand} {it.model}
                      </p>
                      <p className="text-xs text-gray-400">
                        {it.type || "NEW"} × {it.quantity || 1}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-[#ffb84d]">
                    ₹{Number(it.price || 0).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No bikes in this order.</p>
          )}
        </div>

        {/* Summary */}
        <div className="bg-[#121212] border border-white/10 rounded-xl p-5 mb-6">
          <h2 className="text-lg font-semibold text-[#ffb84d] mb-3">
            Order Summary
          </h2>
          <div className="space-y-2 text-sm text-gray-300">
            <p>
              <span className="text-gray-400">Subtotal:</span> ₹
              {Number(order.subtotal || order.totalAmount || 0).toLocaleString(
                "en-IN"
              )}
            </p>
            {order.gst && (
              <p>
                <span className="text-gray-400">GST (18%):</span> ₹
                {Number(order.gst).toLocaleString("en-IN")}
              </p>
            )}
            {order.delivery && (
              <p>
                <span className="text-gray-400">Delivery:</span> ₹
                {Number(order.delivery).toLocaleString("en-IN")}
              </p>
            )}
            <p className="font-bold text-[#ffb84d] text-base mt-3">
              Total: ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Shipping and Payment */}
        <div className="bg-[#121212] border border-white/10 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-[#ffb84d] mb-3">
            Shipping & Payment
          </h2>
          <div className="text-sm text-gray-300 space-y-1">
            <p>
              <span className="text-gray-400">Name:</span>{" "}
              {order.fullName || "Not provided"}
            </p>
            <p>
              <span className="text-gray-400">Address:</span>{" "}
              {order.address || "Not provided"}
            </p>
            <p>
              <span className="text-gray-400">Payment Method:</span>{" "}
              {order.paymentMethod || "Cash on Delivery"}
            </p>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/account/orders")}
            className="px-5 py-2 bg-[#ff6600] text-black font-semibold rounded-md hover:bg-[#ff8533] transition"
          >
            ← Back to Orders
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
