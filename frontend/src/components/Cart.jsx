// src/components/Cart.jsx
import React, { useEffect, useState, useMemo } from "react";
import { CartApi } from "../lib/api";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";

const fullImageUrl = (url) => {
  if (!url) return "/placeholder-bike.jpg";
  return url.startsWith("http")
    ? url
    : `http://localhost:8080/${url.startsWith("/") ? url.slice(1) : url}`;
};

export default function Cart() {
  const { isAuthenticated, user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      try {
        setLoading(true);
        const list = await CartApi.get(user.id);
        setItems(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error("❌ Failed to retrieve cart:", e);
        alert("Failed to retrieve your cart.");
      } finally {
        setLoading(false);
      }
    })();
  }, [isAuthenticated, user?.id]);

  const remove = async (bikeId, type) => {
    try {
      if (type === "USED") await CartApi.removeUsed(user.id, bikeId);
      else await CartApi.remove(user.id, bikeId);
      setItems((prev) => prev.filter((i) => i?.bike?.id !== bikeId));
    } catch (e) {
      console.error(e);
      alert(e.message || "Failed to remove item");
    }
  };

  // 🧮 Totals
  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => {
      const price = Number(it?.bike?.price ?? 0);
      const qty = Number(it?.quantity ?? 1);
      return sum + price * qty;
    }, 0);
  }, [items]);
  const gst = Math.round(subtotal * 0.18);
  const delivery = subtotal > 0 ? 1999 : 0;
  const total = subtotal + gst + delivery;

  if (!isAuthenticated) return <div className="p-6 text-white">Please login.</div>;
  if (loading) return <div className="p-6 text-white">Loading…</div>;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 🛒 Cart Items */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-[#ffb84d] mb-4">Your Cart</h2>

          {items.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <div className="space-y-4">
              {items.map((it) => {
                const b = it?.bike || {};
                const img = fullImageUrl(b.image);
                const isUsed = b.type === "USED";

                return (
                  <div
                    key={it.id}
                    className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#111] p-3"
                  >
                    <div className="relative">
                      <img
                        src={img}
                        alt={b.model || ""}
                        className="h-20 w-28 object-cover rounded-md"
                      />
                      <span
                        className={`absolute top-1 left-1 text-[10px] px-2 py-[1px] rounded-md font-bold ${
                          isUsed
                            ? "bg-[#ff4d4d]/80 text-white"
                            : "bg-[#3cb371]/80 text-white"
                        }`}
                      >
                        {isUsed ? "USED" : "NEW"}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="font-semibold">
                        {b.brand} {b.model}
                      </div>
                      <div className="text-sm text-gray-400">
                        Qty: {it.quantity}
                      </div>
                      <div className="text-sm text-gray-300">
                        ₹{Number(b.price || 0).toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                         navigate(isUsed ? `/used-bike/${b.id}` : `/bike/${b.id}`)

                        }
                        className="rounded-md border border-[#ff6600]/40 px-3 py-1 text-sm text-[#ff6600]"
                      >
                        View
                      </button>
                      <button
                        onClick={() => remove(b.id, b.type)}
                        className="rounded-md bg-[#ff6600] px-3 py-1 text-sm text-black hover:opacity-90"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 💸 Bill Summary */}
        <aside className="lg:col-span-1">
          <div className="rounded-lg border border-white/10 bg-[#111] p-5">
            <h3 className="text-lg font-semibold mb-3">Bill Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">GST (18%)</span>
                <span>₹{gst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Delivery</span>
                <span>₹{delivery.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t border-white/10 my-2" />
              <div className="flex justify-between font-bold text-[#ffb84d]">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* ✅ Go to multi-item checkout */}
            <button
              onClick={() => {
                if (items.length === 0) {
                  alert("Your cart is empty!");
                  return;
                }
                navigate("/buy-now/cart", { state: { cartItems: items } });
              }}
              className="mt-4 w-full rounded-md bg-gradient-to-r from-[#ff6600] to-[#ff8533] px-4 py-2 font-bold text-[#111] hover:brightness-110"
            >
              Proceed to Checkout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
