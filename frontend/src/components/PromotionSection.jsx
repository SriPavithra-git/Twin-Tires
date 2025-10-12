import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PromoCard from "./PromoCard";
import BrandsGrid from "./BrandsGrid";

const topOffers = [
  { id: 1, title: "Festive Offer: Up to 20% OFF", subtitle: "On select Royal Enfield models", img: "/group_bike3.jpg", bikeId: 1 },
  { id: 2, title: "Electric Week", subtitle: "Special EMI & exchange deals", img: "/group_bike7.jpg", bikeId: 2 },
  { id: 3, title: "Sports Specials", subtitle: "Save on pre-owned sports bikes", img: "/group_bike1.jpg", bikeId: 3 },
];

export default function PromotionsSection({ onCategorySelect = () => {} }) {
  const [offerIndex, setOfferIndex] = useState(0);
  const [priceDrops, setPriceDrops] = useState([]);
  const navigate = useNavigate();

  // carousel rotation
  useEffect(() => {
    const t = setInterval(() => setOfferIndex((i) => (i + 1) % topOffers.length), 4500);
    return () => clearInterval(t);
  }, []);

  // fetch backend price drops
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/api/new-bikes");
        const data = await res.json();
        const lowest = (data || [])
          .filter((b) => b.price)
          .sort((a, b) => a.price - b.price)
          .slice(0, 3)
          .map((b) => ({
            id: b.id,
            title: `${b.brand} ${b.model}`, // ✅ fixed
            price: `₹${b.price.toLocaleString("en-IN")}`, // ✅ fixed
            drop: "Hot Deal",
            img: b.image || (b.imageUrls?.[0] ?? "/placeholder-bike.jpg"),
          }));
        setPriceDrops(lowest);
      } catch (err) {
        console.error("❌ Failed to fetch price drops:", err);
      }
    })();
  }, []);

  const activeOffer = topOffers[offerIndex];

  // Button functionalities using Bike Details page
  const handleExploreOffer = () => {
    if (activeOffer.bikeId) navigate(`/bike/${activeOffer.bikeId}`); // ✅ fixed
    else navigate("/buy-bikes");
  };

  const handleNotifyMe = () => {
    alert(`You will be notified about: ${activeOffer.title}`); // ✅ fixed
  };

  const handleViewBike = (id) => {
    navigate(`/bike/${id}`); // ✅ fixed
  };

  const handleAddWishlist = async (id) => {
    try {
      await fetch("http://localhost:8080/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bikeId: id }),
      });
      alert("Added to wishlist!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to wishlist.");
    }
  };

  return (
    <section className="bg-black px-5 py-7 md:px-12">
      <div className="mb-6 flex flex-col gap-5 lg:flex-row">
        {/* Top Offers */}
        <div className="flex-1">
          <div className="mb-3">
            <h2 className="text-[22px] font-semibold text-white">Top Offers</h2>
            <p className="text-sm text-white/80">Grab limited-time deals</p>
          </div>
          <div
            className="relative flex h-[340px] items-end overflow-hidden rounded-[12px] bg-cover bg-center shadow-[0_14px_40px_rgba(154,96,2,0.12)]"
            style={{ backgroundImage: `url(${activeOffer.img})` }} // ✅ fixed
          >
            <div className="w-full bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
              <h3 className="mb-1 text-xl font-semibold">{activeOffer.title}</h3>
              <p className="text-sm text-white/80">{activeOffer.subtitle}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleExploreOffer}
                  className="rounded-md bg-gradient-to-b from-[#ff9a1a] to-[#ff6600] px-4 py-2 font-bold text-[#111] hover:brightness-105 transition"
                >
                  Explore Offer
                </button>
                <button
                  onClick={handleNotifyMe}
                  className="rounded-md border-2 border-[#ff6600] px-4 py-2 font-semibold text-[#ff6600] hover:bg-[#ff6600] hover:text-white transition"
                >
                  Notify Me
                </button>
              </div>
            </div>
          </div>
          {/* indicators */}
          <div className="mt-3 flex gap-2">
            {topOffers.map((_, i) => (
              <button
                key={i}
                onClick={() => setOfferIndex(i)}
                className={`h-[10px] w-[10px] rounded-full ${i === offerIndex ? "bg-[#ff6600]" : "bg-white/35"}`} // ✅ fixed
              />
            ))}
          </div>
        </div>

        {/* Price Drops */}
        <aside className="w-full lg:w-[360px] lg:mt-9">
          <h3 className="mb-3 text-lg font-semibold text-white">Price Drops</h3>
          <div className="flex flex-col gap-3">
            {priceDrops.length > 0 ? (
              priceDrops.map((p) => (
                <PromoCard
                  key={p.id}
                  promo={p}
                  onView={() => handleViewBike(p.id)}
                  onWishlist={() => handleAddWishlist(p.id)}
                />
              ))
            ) : (
              <p className="text-sm text-gray-400">Loading...</p>
            )}
          </div>
        </aside>
      </div>

      {/* Brands */}
      <div className="mt-4">
        <h2 className="text-[20px] font-semibold text-[#ff6600] mb-2">Brands to Explore</h2>
        <BrandsGrid onSelect={onCategorySelect} />
      </div>
    </section>
  );
}
