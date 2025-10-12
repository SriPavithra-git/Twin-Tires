// src/components/TwinTiresLanding.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Hero from "./Hero";
import CategorySection from "./CategorySection";
import PromotionSection from "./PromotionSection";
import BikeCard from "./BikeCard";
import { useAuth } from "./auth";
import { CartApi, WishlistApi } from "../lib/api";

export default function TwinTiresLanding() {
  const [fadeIn, setFadeIn] = useState(false);
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  // ✅ Trigger fade-in on mount
  useEffect(() => {
    setFadeIn(true);
  }, []);

  // ✅ Fetch bikes
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/new-bikes", { signal: controller.signal });
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();

        const mapped = (data || []).map((b) => ({
          id: b.id,
          brand: b.brand,
          model: b.model,
          price: b.price,
          city: b.city || "—",
          mileage: b.mileage || "—",
          fuelType: b.fuelType || "Petrol",
          image:
            b.image ||
            (Array.isArray(b.imageUrls) ? b.imageUrls[0] : undefined) ||
            "/placeholder-bike.jpg",
        }));

        setBikes(mapped);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message || "Failed to load bikes");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  // ✅ Require authentication for wishlist/cart actions
  const requireAuth = (intent, fn) => (...args) => {
    if (!isAuthenticated) {
      navigate("/login", {
        replace: false,
        state: { redirectTo: location.pathname, intent },
      });
      return;
    }
    if (typeof fn === "function") fn(...args);
  };

  const toggleWishlistLocal = (bike) =>
    wishlist.find((b) => b.id === bike.id)
      ? setWishlist((w) => w.filter((b) => b.id !== bike.id))
      : setWishlist((w) => [...w, bike]);

  const addToCart = (bike) =>
    requireAuth("add_to_cart", async () => {
      try {
        await CartApi.add(user.id, bike.id);
        alert("✅ Bike added to cart!");
      } catch (err) {
        console.error(err);
        alert("Failed to add to cart.");
      }
    })();

  const addToWishlist = (bike) =>
    requireAuth("wishlist", async () => {
      try {
        await WishlistApi.add(user.id, bike.id);
        toggleWishlistLocal(bike);
        alert("❤️ Added to wishlist!");
      } catch (err) {
        console.error(err);
        alert("Failed to add to wishlist.");
      }
    })();

  // ✅ Categories
  const categories = [
    { id: "commuter", title: "Commuter Bikes", subtitle: "Daily & efficient", img: "/daily_efficient_bikes.jpg" },
    { id: "scooter", title: "Scooters", subtitle: "Convenient & lightweight", img: "/light_weight_bikes.jpeg" },
    { id: "sports", title: "Sports Bikes", subtitle: "Agile & fast", img: "/fast_bike.jpeg" },
    { id: "cruiser", title: "Cruisers", subtitle: "Comfort & style", img: "/comfort_bike.webp" },
    { id: "electric", title: "Electric", subtitle: "Silent & efficient", img: "/efficient_bike.jpg" },
    { id: "vintage", title: "Vintage / Classics", subtitle: "Timeless rides", img: "/timeless_ride_bike.jpg" },
    { id: "adventure", title: "Adventure", subtitle: "Off-road capable", img: "/off_road_bike.webp" },
    { id: "accessories", title: "Accessories", subtitle: "Helmets, gear & more", img: "/accessories.jpg" },
  ];

  return (
    <div
      className={`min-h-screen bg-[#0d0d0d] text-white transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <Hero onSearch={(q) => navigate(`/buy?q=${encodeURIComponent(q)}`)} />

      <section className="px-4 sm:px-6 md:px-10 lg:px-12">
        <CategorySection categories={categories} onSelect={() => {}} />
      </section>

      <section className="px-4 sm:px-6 md:px-10 lg:px-12">
        <PromotionSection
          promotions={[
            { id: "discount", title: "Up to 20% off", subtitle: "Limited time", img: "/discount.jpg" },
            { id: "price-drop", title: "Price Drops Today", subtitle: "Grab fast", img: "/price_drop.jpg" },
          ]}
        />
      </section>

      <main className="px-4 sm:px-6 md:px-10 lg:px-12 pt-6 pb-20">
        {loading && <div className="mb-3 text-sm text-[#bdbdbd]">Loading bikes…</div>}
        {error && <div className="mb-3 text-sm text-red-400">Error: {error}</div>}

        <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <h2 className="text-xl sm:text-2xl font-semibold">Popular Listings</h2>
          <span className="text-sm text-[#bdbdbd]">{bikes.length} results</span>
        </div>

        <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          {bikes.slice(0, 9).map((item) => (
            <BikeCard
              key={item.id}
              bike={item}
              isAuthenticated={isAuthenticated}
              inWishlist={!!wishlist.find((x) => x.id === item.id)}
              onToggleWishlist={() => addToWishlist(item)}
              onAddToCart={() => addToCart(item)}
              showBookButton={false}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
