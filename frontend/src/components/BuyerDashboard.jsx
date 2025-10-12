import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useAuth } from "./auth";
import api, { BargainApi } from "../lib/api";

export default function BuyerDashboard() {
  const { user } = useAuth();
  const [listedBikes, setListedBikes] = useState([]);
  const [bargains, setBargains] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load seller’s listed bikes and offers
  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      try {
        setLoading(true);
        const resBikes = await api.get(`used-bikes/seller/${user.id}`);
        setListedBikes(resBikes.data ?? resBikes);

        const resOffers = await BargainApi.getBySeller(user.id);
        setBargains(resOffers.data ?? resOffers);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  // ✅ FIXED: Uses offer.id (number), not the entire object
  async function handleStatusUpdate(offerId, newStatus) {
    try {
      console.log("Updating offer:", offerId, "status:", newStatus);

      await api.put(`bargains/${offerId}?status=${newStatus}`);

      setBargains((prev) =>
        prev.map((b) =>
          b.id === offerId ? { ...b, status: newStatus } : b
        )
      );

      // ✅ Auto-add to cart if accepted
      if (newStatus === "ACCEPTED") {
        await fetch("http://localhost:8080/api/cart/add-offer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ offerId }),
        });
        alert("Offer accepted and bike added to cart with offer price!");
      } else {
        alert(`Offer ${newStatus.toLowerCase()} successfully!`);
      }
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Failed to update offer status.");
    }
  }

  if (loading)
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-gray-400 flex items-center justify-center">
        Loading your listings...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
   
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-10">
        <h1 className="text-3xl font-extrabold text-[#ff6600] mb-8">
          My Listed Bikes
        </h1>

        {/* ---------------------- LISTED BIKES ---------------------- */}
        {listedBikes.length === 0 ? (
          <p className="text-gray-400 italic">
            You haven’t listed any bikes yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listedBikes.map((bike) => {
              const img = bike.imageUrl
                ? bike.imageUrl.startsWith("http")
                  ? bike.imageUrl
                  : `http://localhost:8080/${
                      bike.imageUrl.startsWith("/")
                        ? bike.imageUrl.slice(1)
                        : bike.imageUrl
                    }`
                : "/placeholder-bike.jpg";

              return (
                <div
                  key={bike.id}
                  className="bg-[#111] border border-white/10 rounded-xl p-4 shadow-md hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition"
                >
                  <img
                    src={img}
                    alt={bike.model}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-lg font-semibold text-[#ffb84d]">
                    {bike.brand} {bike.model}
                  </h3>
                  <p className="text-sm text-gray-400">
                    ₹{bike.price?.toLocaleString("en-IN")} • {bike.city}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {bike.conditionStatus} • {bike.purchaseAge}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* ---------------------- OFFERS RECEIVED ---------------------- */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-[#ff8533] mb-5">
            Offers Received
          </h2>

          {bargains.length === 0 ? (
            <p className="text-gray-400 italic">No offers received yet.</p>
          ) : (
            <div className="overflow-x-auto bg-[#111] border border-white/10 rounded-xl shadow-md">
              <table className="min-w-full text-sm">
                <thead className="bg-[#1a1a1a] text-[#ffb84d] text-left">
                  <tr>
                    <th className="p-3">Bike</th>
                    <th className="p-3">Buyer ID</th>
                    <th className="p-3">Offer Price</th>
                    <th className="p-3">Message</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bargains.map((offer) => {
                    const relatedBike = listedBikes.find(
                      (b) => b.id === offer.usedBikeId
                    );
                    return (
                      <tr
                        key={offer.id}
                        className="border-t border-white/5 hover:bg-[#1a1a1a]"
                      >
                        <td className="p-3 text-gray-200">
                          {relatedBike
                            ? `${relatedBike.brand} ${relatedBike.model}`
                            : `Bike ID ${offer.usedBikeId}`}
                        </td>
                        <td className="p-3 text-gray-400">{offer.buyerId}</td>
                        <td className="p-3 text-[#ffb84d] font-semibold">
                          ₹{offer.offerPrice?.toLocaleString("en-IN")}
                        </td>
                        <td className="p-3 text-gray-300 italic max-w-[300px] truncate">
                          {offer.message || "—"}
                        </td>
                        <td className="p-3">
                          <span
                            className={`font-semibold ${
                              offer.status === "ACCEPTED"
                                ? "text-green-400"
                                : offer.status === "REJECTED"
                                ? "text-red-400"
                                : "text-yellow-400"
                            }`}
                          >
                            {offer.status || "PENDING"}
                          </span>
                        </td>
                        <td className="p-3 flex gap-2 justify-center">
                          {offer.status === "PENDING" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(offer.id, "ACCEPTED")
                                }
                                className="px-3 py-1 rounded-md bg-green-600 hover:bg-green-700 text-sm font-semibold"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(offer.id, "REJECTED")
                                }
                                className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-sm font-semibold"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
