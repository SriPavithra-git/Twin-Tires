// src/components/AccountOrders.jsx
import React, { useEffect, useState } from "react";
import { OrderApi } from "../lib/api";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";

export default function AccountOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      try {
        const res = await OrderApi.getByUser(user.id);
        setOrders(res || []);
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex justify-center items-center">
        Loading orders...
      </div>
    );

  if (!orders.length)
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex justify-center items-center">
        <p>No orders yet.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white px-4 py-10">
      <h1 className="text-3xl font-bold text-[#ffb84d] mb-6">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-[#222] bg-[#121212] rounded-xl p-5"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">
                Order #{order.id} — ₹{Number(order.totalAmount).toLocaleString("en-IN")}
              </h2>
              <span
                className={`text-xs px-3 py-1 rounded-md font-bold ${
                  order.status === "PENDING"
                    ? "bg-yellow-600/80 text-black"
                    : order.status === "DELIVERED"
                    ? "bg-green-600/80 text-black"
                    : "bg-gray-500"
                }`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-xs text-gray-400 mb-3">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>

            {/* 🏍️ Ordered Bikes */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#ffb84d] mb-2">
                Ordered Bikes
              </h3>

              {Array.isArray(order.items) && order.items.length > 0 ? (
                <div className="space-y-2">
                  {order.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm border-b border-[#333] pb-1"
                    >
                      <span>
                        {it.brand || it.model
                          ? `${it.brand || ""} ${it.model || ""}`
                          : `Bike ID: ${it.bikeId}`}
                      </span>
                      <span>₹{Number(it.price || 0).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm italic text-gray-400">
                  (No bike details available for this order)
                </p>
              )}
            </div>

            {/* 💰 Summary */}
            <div className="text-sm text-gray-300 space-y-1">
              <p>
                <span className="font-semibold text-[#ffb84d]">Total:</span>{" "}
                ₹{Number(order.totalAmount).toLocaleString("en-IN")}
              </p>
              <p>
                <span className="font-semibold text-[#ffb84d]">Payment:</span>{" "}
                {order.paymentMethod || "—"}
              </p>
              <p>
                <span className="font-semibold text-[#ffb84d]">Address:</span>{" "}
                {order.address}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
