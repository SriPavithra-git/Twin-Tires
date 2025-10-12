import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { BargainApi ,CartApi} from "../lib/api";
import { useAuth } from "./auth";

export default function UsedBikeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [bike, setBike] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [showOffer, setShowOffer] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [message, setMessage] = useState("");

  // Fetch used bike details
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`used-bikes/${id}`);
        const b = res.data ?? res;

        // Fix image URL
        const fullImageUrl = b.imageUrl
          ? b.imageUrl.startsWith("http")
            ? b.imageUrl
            : `http://localhost:8080/${b.imageUrl.startsWith("/") ? b.imageUrl.slice(1) : b.imageUrl}`
          : "/placeholder-bike.jpg";

        setBike({ ...b, imageUrl: fullImageUrl });
      } catch (err) {
        console.error("❌ Failed to fetch used bike:", err);
      }
    })();
  }, [id]);

  const handleMakeOffer = async () => {
    if (!isAuthenticated) return navigate("/login");
    if (!offerPrice) return alert("Please enter offer amount");

    try {
      await BargainApi.create({
       bikeId: bike.id,
        buyerId: user.id,
        sellerId: bike.sellerId,
       offeredPrice: parseFloat(offerPrice),
        message,
      });
      alert("✅ Offer sent successfully!");
      setShowOffer(false);
    } catch (err) {
      console.error("Offer failed:", err);
      alert("Something went wrong!");
    }
  };

  const gallery = useMemo(() => {
    if (!bike) return ["/placeholder-bike.jpg"];
    return [bike.imageUrl];
  }, [bike]);

  if (!bike)
    return <h2 className="text-center text-white text-xl mt-10">Loading...</h2>;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10 space-y-12">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-400">
          Home / Buy / <span className="text-[#ffb366]">{bike.brand}</span> / {bike.model}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Image */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-[#111] p-3 shadow-lg">
              <img
                src={gallery[currentImg]}
                alt={bike.model}
                className="w-full h-[420px] object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Middle: Bike Info */}
          <div className="lg:col-span-4 bg-[#111] border border-white/10 rounded-xl p-6 shadow-lg space-y-5">
            <h1 className="text-4xl font-extrabold tracking-tight leading-snug">
              {bike.brand}{" "}
              <span className="text-[#ffb84d]">{bike.model}</span>
            </h1>
            <div className="text-3xl font-black text-[#ffb84d] bg-[#1a1a1a] inline-block px-3 py-1 rounded-md shadow-inner">
              ₹{(bike.price || 0).toLocaleString("en-IN")}
            </div>

            <ul className="space-y-2 text-gray-300 text-sm leading-relaxed border-t border-white/10 pt-3">
              <li><span className="text-gray-400">Fuel Type:</span> {bike.fuelType}</li>
              <li><span className="text-gray-400">Mileage:</span> {bike.mileage} km/l</li>
              <li><span className="text-gray-400">Engine Capacity:</span> {bike.engineCapacity} cc</li>
              <li><span className="text-gray-400">Year:</span> {bike.year}</li>
              <li><span className="text-gray-400">Owner Type:</span> {bike.ownerType}</li>
              <li><span className="text-gray-400">Condition:</span> {bike.conditionStatus}</li>
              <li><span className="text-gray-400">City:</span> {bike.city}</li>
              <li><span className="text-gray-400">Purchase Age:</span> {bike.purchaseAge}</li>
            </ul>

            <p className="text-gray-400 text-sm border-t border-white/10 pt-3">
              {bike.description}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowOffer(true)}
                className="flex-1 bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black font-semibold py-2 rounded-md hover:brightness-110"
              >
                Make an Offer
              </button>
              <button
  onClick={async () => {
    if (!isAuthenticated) return navigate("/login");
    try {
      await CartApi.addUsed(user.id, bike.id, 1);
      alert("✅ Bike added to your cart!");
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("❌ Failed to add bike to cart");
    }
  }}
  className="flex-1 bg-[#ffb84d] text-black font-semibold py-2 rounded-md hover:brightness-110"
>
  Add to Cart
</button>


              <button
                onClick={() => navigate("/buy")}
                className="flex-1 border border-[#ff6600]/40 text-[#ff6600] py-2 rounded-md font-semibold hover:bg-[#ff6600]/10"
              >
                Back to Bikes
              </button>
            </div>
          </div>

          {/* Right: Quick Specs */}
          <div className="lg:col-span-3 bg-[#111] border border-white/10 rounded-xl p-5 shadow-md">
            <h3 className="text-lg font-semibold text-[#ffb84d] mb-3">Quick Highlights</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li><b>Seller ID:</b> {bike.sellerId}</li>
              <li><b>Listed On:</b> {new Date(bike.createdAt).toLocaleDateString()}</li>
              <li><b>Condition:</b> {bike.conditionStatus}</li>
              <li><b>City:</b> {bike.city}</li>
              <li><b>Year:</b> {bike.year}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Offer Modal */}
      {showOffer && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1b1b1b] border border-[#333] rounded-xl p-6 w-[90%] max-w-md">
            <h3 className="text-xl font-bold text-[#ffb84d] mb-4">
              Make an Offer for {bike.brand} {bike.model}
            </h3>
            <input
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="Enter offer price"
              className="w-full mb-3 px-3 py-2 bg-[#111] border border-[#444] rounded-md text-white focus:ring-1 focus:ring-[#ff6600] outline-none"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add message (optional)"
              rows={3}
              className="w-full mb-4 px-3 py-2 bg-[#111] border border-[#444] rounded-md text-white focus:ring-1 focus:ring-[#ff6600] outline-none resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowOffer(false)}
                className="px-4 py-2 bg-[#333] rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleMakeOffer}
                className="px-4 py-2 bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black font-semibold rounded-md"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
