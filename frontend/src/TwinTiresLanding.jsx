// src/TwinTiresLanding.jsx
import React, { useState } from "react";
import LogoAnimation from "./components/LogoAnimation";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import PromotionSection from "./components/PromotionSection";
import BikeCard from "./components/BikeCard";
import Footer from "./components/Footer";
import CompareBikes from "./components/CompareBikes";
import "./TwinTiresLanding.css";

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
    { id: 1, name: "Royal Enfield Classic 350", price: "$2,200", city: "New Delhi", year: 2019, kms: "18,000 km", type: "commuter", image: "/bike1.jpg" }, // change image if needed here
    { id: 2, name: "Ola S1 Pro", price: "$1,800", city: "Hyderabad", year: 2022, kms: "2,500 km", type: "electric", image: "/bike2.jpg" }, // image line
    { id: 3, name: "TVS Apache RTR 160", price: "$1,200", city: "Bengaluru", year: 2020, kms: "9,200 km", type: "sports", image: "/bike3.jpg" }, // image line
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
    return <CompareBikes bikes={bikes} compareSelection={compareSelection} setCompareSelection={setCompareSelection} onClose={() => setCompareMode(false)} />;

  return (
    <div className="tt-container">
      <Navbar onSearch={(q) => { setSearchQuery(q); setCategoryFilter(""); }} />
      <Hero onSearch={(q) => { setSearchQuery(q); setCategoryFilter(""); }} />

      <CategorySection categories={categories} onSelect={(c) => setCategoryFilter(c.id)} />

      <PromotionSection promotions={[
        { id: "discount", title: "Up to 20% off", subtitle: "Limited time", img: "/discount.jpg" }, // image line
        { id: "price-drop", title: "Price Drops Today", subtitle: "Grab fast", img: "/price_drop.jpg" }, // image line
      ]} />

      <main className="tt-main">
        <div className="listings-head">
          <h2>{categoryFilter ? `Showing: ${categories.find(c => c.id === categoryFilter)?.title}` : "Popular Listings"}</h2>
          <span>{filteredBikes.length} results</span>
        </div>

        <div className="card-grid">
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

      {compareSelection.length >= 2 && (
        <div className="compare-bar-floating">
          <span>{compareSelection.length} bikes selected</span>
          <button className="btn-primary" onClick={() => setCompareMode(true)}>Compare Now</button>
        </div>
      )}

      <Footer />
    </div>
  );
}
