import React, { useEffect, useState } from "react";
import { WishlistApi, CartApi } from "../lib/api";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Wishlist() {
  const { isAuthenticated, user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;
    (async () => {
      try {
        setLoading(true);
        const data = await WishlistApi.get(user.id);
        console.log("💖 Wishlist items:", data);
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to get wishlist:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [isAuthenticated, user?.id]);

  const remove = async (bikeId) => {
    try {
      await WishlistApi.remove(user.id, bikeId);
      setItems((prev) =>
        prev.filter((it) => String(it?.bike?.id) !== String(bikeId))
      );
    } catch (e) {
      console.error("Remove failed:", e);
      alert("Failed to remove from wishlist.");
    }
  };

  const moveToCart = async (bikeId) => {
    try {
      await CartApi.add(user.id, bikeId, 1);
      await WishlistApi.remove(user.id, bikeId);
      setItems((prev) =>
        prev.filter((it) => String(it?.bike?.id) !== String(bikeId))
      );
      alert("✅ Bike moved to cart successfully!");
    } catch (e) {
      console.error("Move to cart failed:", e);
      alert("Failed to move item to cart.");
    }
  };

  if (!isAuthenticated)
    return <div className="p-6 text-white">Please login.</div>;
  if (loading) return <div className="p-6 text-white">Loading…</div>;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-[#ffb84d] mb-4">
          Your Wishlist
        </h2>

        {items.length === 0 ? (
          <p>No bikes in wishlist.</p>
        ) : (
          <div className="space-y-4">
            {items.map((it) => {
              const b = it?.bike || {};
              const img =
                b.image ||
                (Array.isArray(b.imageUrls) ? b.imageUrls[0] : undefined) ||
                "/placeholder-bike.jpg";

              return (
                <div
                  key={it.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#111] p-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={img}
                      alt={b.model || ""}
                      className="h-20 w-28 object-cover rounded-md"
                    />
                    <div>
                      <div className="font-semibold">
                        {b.brand} {b.model}
                      </div>
                      <div className="text-sm text-gray-300">
                        ₹{Number(b.price || 0).toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/bike/${b.id}`)}
                      className="rounded-md border border-[#ff6600]/40 px-3 py-1 text-sm text-[#ff6600]"
                    >
                      View
                    </button>
                    <button
                      onClick={() => moveToCart(b.id)}
                      className="rounded-md bg-[#ffb84d] px-3 py-1 text-sm text-black"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => remove(b.id)}
                      className="rounded-md bg-[#ff6600] px-3 py-1 text-sm text-black"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

     
    </div>
  );
}
