import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { WishlistApi, CartApi, ReviewApi } from "../lib/api";
import { useAuth } from "./auth";

export default function BikeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();

  const [bike, setBike] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);

  // Review system
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    images: [],
    files: [],
  });

  // EMI / Fuel state
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [interest, setInterest] = useState(12);
  const [dailyKms, setDailyKms] = useState(20);
  const [fuelPrice, setFuelPrice] = useState(110);
  const [customMileage, setCustomMileage] = useState(40);

  // Fetch bike and reviews
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await api.get(`new-bikes/${id}`);
        const b = res.data ?? res;
        setBike(b);

        // Fetch reviews from backend
        const revs = await ReviewApi.getByBike(id);
        setReviews(revs);

        if (b?.mileage) {
          const parsed = Number(String(b.mileage).match(/[\d.]+/)?.[0] || 40);
          setCustomMileage(isFinite(parsed) ? parsed : 40);
        }
      } catch (e) {
        console.error("❌ Failed to load bike or reviews:", e);
      }
    })();
  }, [id]);

  // Gallery
  const gallery = useMemo(() => {
    if (Array.isArray(bike?.imageUrls) && bike.imageUrls.length)
      return bike.imageUrls;
    if (bike?.image) return [bike.image];
    return ["/placeholder-bike.jpg"];
  }, [bike]);

  // EMI calculations
  const principal = Math.max(0, (bike?.price ?? 0) - (Number(downPayment) || 0));
  const monthlyRate = (Number(interest) || 0) / 12 / 100;
  const months = Math.max(1, Number(tenure) || 1);
  const emi = useMemo(() => {
    if (monthlyRate === 0) return principal / months || 0;
    const f = Math.pow(1 + monthlyRate, months);
    return (principal * monthlyRate * f) / (f - 1 || 1);
  }, [principal, monthlyRate, months]);
  const totalPayable = emi * months;
  const totalInterest = Math.max(0, totalPayable - principal);

  // Fuel cost
  const monthlyFuelLitres = (Number(dailyKms) * 30) / (Number(customMileage) || 1);
  const monthlyFuelCost = monthlyFuelLitres * (Number(fuelPrice) || 0);
  const annualFuelCost = monthlyFuelCost * 12;

  // Rating summary
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
      : 0;
  const ratingBreakdown = [5, 4, 3, 2, 1].map((r) => ({
    stars: r,
    percent: reviews.length
      ? (reviews.filter((x) => x.rating === r).length / reviews.length) * 100
      : 0,
  }));

  // Wishlist & Cart actions
  const addToWishlist = async () => {
    if (!isAuthenticated) return navigate("/login");
    await WishlistApi.add(user.id, bike.id);
    alert("Added to wishlist!");
  };

  const addToCart = async () => {
    if (!isAuthenticated) return navigate("/login");
    await CartApi.add(user.id, bike.id, 1);
    alert("Added to cart!");
  };

  // Handle review submit
  const handleReviewSubmit = async () => {
    if (!newReview.comment.trim() || newReview.rating === 0) {
      alert("Please add rating and comment!");
      return;
    }

    let uploaded = [];
    try {
      if (newReview.files?.length) {
        uploaded = await ReviewApi.uploadImages(Array.from(newReview.files));
      }
    } catch (err) {
      console.warn("Image upload failed", err);
    }

    const review = {
      bikeId: Number(id),
      userId: user?.id || 0,
      userName: user?.name || "Anonymous",
      rating: newReview.rating,
      comment: newReview.comment,
      images: uploaded,
    };

    try {
      const saved = await ReviewApi.add(review);
      setReviews((prev) => [saved, ...prev]);
      setNewReview({ rating: 0, comment: "", images: [], files: [] });
    } catch (err) {
      console.error("❌ Failed to post review:", err);
      alert("Failed to post review");
    }
  };

  if (!bike)
    return <h2 className="text-center text-white text-xl mt-10">Loading...</h2>;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-[1300px] px-4 py-10 space-y-16">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-400">
          Home / Buy / <span className="text-[#ffb366]">{bike.brand}</span> / {bike.model}
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Gallery */}
          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-[#111] p-3 shadow-lg">
              <img
                src={gallery[currentImg]}
                alt={`${bike.brand} ${bike.model}`}
                className="w-full h-[440px] object-contain rounded-lg"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImg(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border transition ${
                    currentImg === i
                      ? "border-[#ff6600]"
                      : "border-white/10 hover:border-[#ff6600]/60"
                  }`}
                >
                  <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Center: Details */}
          <div className="lg:col-span-4 bg-[#111] border border-white/10 rounded-xl p-6 shadow-lg space-y-5">
            <h1 className="text-4xl font-extrabold tracking-tight leading-snug">
              {bike.brand} <span className="text-[#ffb84d]">{bike.model}</span>
            </h1>
            <div className="text-3xl font-black text-[#ffb84d] bg-[#1a1a1a] inline-block px-3 py-1 rounded-md shadow-inner">
              ₹{(bike.price || 0).toLocaleString()}
            </div>

            <ul className="space-y-2 text-gray-300 text-sm leading-relaxed border-t border-white/10 pt-3">
              <li><span className="text-gray-400">Fuel Type:</span> {bike.fuelType}</li>
              <li><span className="text-gray-400">Mileage:</span> {bike.mileage}</li>
              <li><span className="text-gray-400">Displacement:</span> {bike.displacement}</li>
              <li><span className="text-gray-400">Power:</span> {bike.power}</li>
              <li><span className="text-gray-400">Torque:</span> {bike.torque}</li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={addToWishlist}
                className="flex-1 px-5 py-2 bg-gradient-to-r from-[#ff6600] to-[#ff8533] rounded-md font-semibold text-black hover:opacity-90 transition"
              >
                Add to Wishlist
              </button>
              <button
                onClick={addToCart}
                className="flex-1 px-5 py-2 border border-[#ff6600]/60 text-[#ff6600] rounded-md hover:bg-[#ff6600]/10 transition"
              >
                Add to Cart
              </button>
            </div>

            <button
              onClick={() => navigate("/test-ride", { state: { bike } })}
              className="w-full mt-3 py-2 bg-[#ff6600] hover:bg-[#ff8533] text-black font-semibold rounded-md transition"
            >
              Test Ride
            </button>
          </div>

          {/* Right: Key Specs */}
          <div className="lg:col-span-3 bg-[#111] border border-white/10 rounded-xl p-5 shadow-md">
            <h3 className="text-lg font-semibold text-[#ffb84d] mb-3">Key Highlights</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li><b>Top Speed:</b> {bike.topSpeed || "120 km/h"}</li>
              <li><b>Engine Type:</b> {bike.engineType || "4-stroke Single Cylinder"}</li>
              <li><b>Brakes:</b> {bike.brakes || "Disc / Drum"}</li>
              <li><b>Weight:</b> {bike.weight || "145 kg"}</li>
              <li><b>Transmission:</b> {bike.transmission || "5-speed Manual"}</li>
            </ul>
          </div>
        </div>

        {/* Ratings & Reviews */}
        <div className="mt-14 border-t border-white/10 pt-10">
          <h2 className="text-2xl font-bold text-[#ffb84d] mb-6">Ratings & Reviews</h2>

          {/* Ratings summary */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
            <div className="text-center md:text-left">
              <div className="text-5xl font-bold text-[#ffb84d]">{avgRating.toFixed(1)}</div>
              <div className="text-gray-400 text-sm">Average Rating</div>
            </div>
            <div className="flex-1 max-w-md space-y-2">
              {ratingBreakdown.map((r) => (
                <div key={r.stars} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="w-6">{r.stars}★</span>
                  <div className="flex-1 h-1 bg-[#222] rounded">
                    <div
                      className="h-1 bg-[#ff6600] rounded"
                      style={{ width: `${r.percent}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-xs">{r.percent.toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review cards */}
          <div className="space-y-4 mb-10">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-lg bg-[#111] border border-white/10 p-5 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center text-sm font-bold text-[#ffb84d]">
                      {r.userName[0]?.toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-100">{r.userName}</span>
                  </div>
                  <span className="text-[#ffb84d] text-sm">
                    {"★".repeat(r.rating)}
                    <span className="text-gray-600">{"★".repeat(5 - r.rating)}</span>
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{r.comment}</p>

                {r.images && r.images.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {r.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="review"
                        className="w-20 h-20 object-cover rounded-md border border-white/10"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Review */}
          <div className="bg-[#111] border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-[#ffb84d] mb-4">Write a Review</h3>

            {/* Star Rating Input */}
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview((r) => ({ ...r, rating: star }))}
                  className={`text-2xl ${
                    star <= newReview.rating ? "text-[#ffb84d]" : "text-gray-600"
                  } hover:text-[#ffb84d] transition`}
                >
                  ★
                </button>
              ))}
            </div>

            {/* Comment */}
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview((r) => ({ ...r, comment: e.target.value }))
              }
              placeholder="Share your experience..."
              className="w-full h-28 p-3 bg-black/40 border border-white/10 rounded-md text-sm text-gray-200 focus:outline-none focus:border-[#ff6600] resize-none"
            />

            {/* Image Upload */}
            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-2">
                Upload Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setNewReview((r) => ({
                    ...r,
                    files: Array.from(e.target.files),
                    images: Array.from(e.target.files).map((f) =>
                      URL.createObjectURL(f)
                    ),
                  }))
                }
                className="text-sm text-gray-400"
              />
              {newReview.images?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {newReview.images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-md border border-white/10"
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleReviewSubmit}
              className="mt-6 px-5 py-2 bg-[#ff6600] hover:bg-[#ff8533] text-black font-semibold rounded-md transition"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
