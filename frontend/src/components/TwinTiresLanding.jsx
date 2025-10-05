// src/TwinTiresLanding.jsx
import React, { useState } from "react";
import LogoAnimation from "./LogoAnimation";
import Navbar from "./Navbar";
import Hero from "./Hero";
import CategorySection from "./CategorySection";
import PromotionSection from "./PromotionSection";   // or PromotionsSection if that’s your file
import BikeCard from "./BikeCard";
import Footer from "./Footer";
import CompareBikes from "./CompareBikes";
export default function TwinTiresLanding() {
  const [showLanding, setShowLanding] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [compareMode, setCompareMode] = useState(false);
  const [compareSelection, setCompareSelection] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [rideBooking, setRideBooking] = useState(null);

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

  const bikes = [
    { id: 1, name: "Royal Enfield Classic 350", price: "$2,200", city: "New Delhi", year: 2019, kms: "18,000 km", type: "commuter", image: "/bike1.jpg" },
    { id: 2, name: "Ola S1 Pro", price: "$1,800", city: "Hyderabad", year: 2022, kms: "2,500 km", type: "electric", image: "/bike2.jpg" },
    { id: 3, name: "TVS Apache RTR 160", price: "$1,200", city: "Bengaluru", year: 2020, kms: "9,200 km", type: "sports", image: "/bike3.jpg" },
  ];

  const filteredBikes = bikes.filter(
    (b) =>
      (b.name + " " + b.city + " " + b.type).toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter ? b.type === categoryFilter : true)
  );

  const toggleWishlist = (bike) =>
    wishlist.find((b) => b.id === bike.id)
      ? setWishlist(wishlist.filter((b) => b.id !== bike.id))
      : setWishlist([...wishlist, bike]);

  const toggleCompareSelect = (bike) => {
    if (compareSelection.find((b) => b.id === bike.id))
      setCompareSelection(compareSelection.filter((b) => b.id !== bike.id));
    else if (compareSelection.length < 2) setCompareSelection([...compareSelection, bike]);
  };

  if (!showLanding) return <LogoAnimation onFinish={() => setShowLanding(true)} />;

  if (compareMode)
    return (
      <CompareBikes
        bikes={bikes}
        compareSelection={compareSelection}
        setCompareSelection={setCompareSelection}
        onClose={() => setCompareMode(false)}
      />
    );

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Navbar (internal component handles its own styles) */}
      <Navbar onSearch={(q) => { setSearchQuery(q); setCategoryFilter(""); }} />

      {/* Hero */}
      <Hero onSearch={(q) => { setSearchQuery(q); setCategoryFilter(""); }} />

      {/* Categories */}
      <section className="px-5 md:px-12">
        <CategorySection
          categories={categories}
          onSelect={(c) => setCategoryFilter(c.id)}
        />
      </section>

      {/* Promotions */}
      <section className="px-5 md:px-12">
        <PromotionSection
          promotions={[
            { id: "discount", title: "Up to 20% off", subtitle: "Limited time", img: "/discount.jpg" },
            { id: "price-drop", title: "Price Drops Today", subtitle: "Grab fast", img: "/price_drop.jpg" },
          ]}
        />
      </section>

      {/* Listings */}
      <main className="px-5 pb-16 pt-7 md:px-12">
        <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <h2 className="text-xl font-semibold">
            {categoryFilter ? `Showing: ${categories.find(c => c.id === categoryFilter)?.title}` : "Popular Listings"}
          </h2>
          <span className="text-sm text-[#bdbdbd]">{filteredBikes.length} results</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBikes.map((bike) => (
            <BikeCard
              key={bike.id}
              bike={bike}
              inWishlist={!!wishlist.find((b) => b.id === bike.id)}
              toggleWishlist={() => toggleWishlist(bike)}
              onBook={() => setRideBooking(bike)}
              compareMode={true}
              compareSelected={!!compareSelection.find((b) => b.id === bike.id)}
              toggleCompare={() => toggleCompareSelect(bike)}
            />
          ))}
        </div>
      </main>

      {/* Compare floating bar */}
      {compareSelection.length >= 2 && (
        <div className="fixed bottom-4 left-1/2 z-[160] w-[calc(100%-32px)] max-w-[980px] -translate-x-1/2 rounded-[12px] border-2 border-[#ff6600] bg-[#111111] px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <span className="text-sm text-white/90">{compareSelection.length} bikes selected</span>
            <button
              onClick={() => setCompareMode(true)}
              className="rounded-md bg-[linear-gradient(180deg,#ff9a1a,#ff6600)] px-4 py-2 font-bold text-[#111] shadow-[0_8px_20px_rgba(255,140,0,0.12)] transition hover:brightness-105"
            >
              Compare Now
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
