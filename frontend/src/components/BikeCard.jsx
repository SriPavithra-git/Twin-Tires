import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BargainApi } from "../lib/api";

export default function BikeCard({
  bike = {},
  isUsed = false,
  user,
  isAuthenticated,
  toggleCompare,
  compareSet,
  navigate,
}) {
  const nav = useNavigate();
  const [showOffer, setShowOffer] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [message, setMessage] = useState("");

  const image =
    bike.image ||
    (Array.isArray(bike.imageUrls) ? bike.imageUrls[0] : undefined) ||
    "/placeholder-bike.jpg";

  const handleMakeOffer = async () => {
    if (!isAuthenticated) return alert("Please log in first");
    if (!offerPrice) return alert("Enter offer amount");

    try {
      await BargainApi.create({
        usedBikeId: bike.id,
        buyerId: user.id,
        sellerId: bike.sellerId,
        offerPrice: parseFloat(offerPrice),
        message,
      });
      alert("✅ Offer sent successfully!");
      setShowOffer(false);
    } catch (err) {
      console.error("Offer failed:", err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <article className="flex flex-col rounded-xl border border-[#ff6600]/10 bg-[#151515] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.6)]">
        <div
          className="h-48 w-full cursor-pointer"
          onClick={() => nav(`/bike/${bike.id}`, { state: { bike, isUsed } })}
        >
          <img src={image} alt={bike.model} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col p-4 text-white flex-grow">
          <h3 className="text-[#ff6600] font-semibold text-lg">{bike.brand} {bike.model}</h3>
          <p className="text-gray-400 text-sm">{bike.city || "—"} • {bike.fuelType}</p>
          <p className="text-[#ffcc00] text-xl font-bold mt-1">
            ₹{bike.price?.toLocaleString("en-IN")}
          </p>

          <div className="mt-4 flex gap-2">
            {isUsed ? (
              <button
                onClick={() => setShowOffer(true)}
                className="flex-1 bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black font-semibold py-2 rounded-md hover:brightness-110"
              >
                Make Offer
              </button>
            ) : (
              <button
                onClick={() => alert("Added to cart")}
                className="flex-1 bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black font-semibold py-2 rounded-md hover:brightness-110"
              >
                Add to Cart
              </button>
            )}

            <button
              onClick={() => nav(`/bike/${bike.id}`)}
              className="flex-1 border border-[#ff6600]/40 text-[#ff6600] py-2 rounded-md font-semibold hover:bg-[#ff6600]/10"
            >
              View
            </button>
          </div>
        </div>
      </article>

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
    </>
  );
}
