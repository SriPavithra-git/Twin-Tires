// src/pages/SellBike.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "./auth"; // ✅ logged-in buyer
import { UsedBikeApi } from "../lib/api";

export default function SellBike() {
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    price: "",
    fuelType: "",
    mileage: "",
    engineCapacity: "",
    year: "",
    description: "",
    ownerType: "",
    city: "",
    condition: "",
    purchaseAge: "",
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const filesArr = Array.from(files);
      setFormData((p) => ({ ...p, images: filesArr }));
      setPreviewImages(filesArr.map((f) => URL.createObjectURL(f)));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  // ✅ handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please log in before selling a bike!");
      return;
    }

    setLoading(true);
    const fd = new FormData();
    fd.append("sellerId", user.id);
    Object.entries(formData).forEach(([key, val]) => {
      if (key === "images") val.forEach((img) => fd.append("images", img));
      else fd.append(key, val);
    });

    try {
      const res = await fetch("http://localhost:8080/api/used-bikes", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      console.log("✅ saved:", data);
      alert("✅ Bike listed successfully!");
      setFormData({
        brand: "",
        model: "",
        price: "",
        fuelType: "",
        mileage: "",
        engineCapacity: "",
        year: "",
        description: "",
        ownerType: "",
        city: "",
        condition: "",
        purchaseAge: "",
        images: [],
      });
      setPreviewImages([]);
    } catch (err) {
      console.error("❌ error:", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 h-20 bg-black z-[110]" />
   

      <div className="min-h-screen bg-[#0d0d0d] flex justify-center px-4 py-10 pt-24">
        <div className="w-full max-w-4xl bg-[#111] border border-[#222] rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold text-center text-[#ff6600] mb-6">
            Sell Your Bike
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#ff9a1a]">
                Bike Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required className="input-field" />
                <input name="model" placeholder="Model" value={formData.model} onChange={handleChange} required className="input-field" />
                <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleChange} required className="input-field" />
                <select name="fuelType" value={formData.fuelType} onChange={handleChange} required className="input-field text-gray-300">
                  <option value="">Select Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric">Electric</option>
                  <option value="Diesel">Diesel</option>
                </select>
                <input name="mileage" placeholder="Mileage (km/l)" value={formData.mileage} onChange={handleChange} required className="input-field" />
                <input name="engineCapacity" placeholder="Engine Capacity (cc)" value={formData.engineCapacity} onChange={handleChange} required className="input-field" />
                <input type="number" name="year" placeholder="Year of Manufacture" value={formData.year} onChange={handleChange} required className="input-field" />
                <select name="purchaseAge" value={formData.purchaseAge} onChange={handleChange} required className="input-field text-gray-300">
                  <option value="">Years Since Purchase</option>
                  <option value="<1">Below 1 Year</option>
                  <option value="1-2">1–2 Years</option>
                  <option value="2-5">2–5 Years</option>
                  <option value="5+">5+ Years</option>
                </select>
                <select name="ownerType" value={formData.ownerType} onChange={handleChange} required className="input-field text-gray-300">
                  <option value="">Owner Type</option>
                  <option value="1">1st Owner</option>
                  <option value="2">2nd Owner</option>
                  <option value="3+">3+ Owners</option>
                </select>
                <select name="condition" value={formData.condition} onChange={handleChange} required className="input-field text-gray-300">
                  <option value="">Condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Below Average">Below Average</option>
                </select>
                <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="input-field" />
              </div>
              <textarea
                name="description"
                placeholder="Describe your bike condition, features, and modifications..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                className="w-full mt-4 px-3 py-2 rounded-md bg-[#1b1b1b] border border-gray-700 focus:ring-1 focus:ring-[#ff6600] outline-none resize-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Upload Bike Images (You can select multiple)
              </label>
              <input type="file" name="images" accept="image/*" multiple onChange={handleChange} className="file-input" />
              {previewImages.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {previewImages.map((src, i) => (
                    <img key={i} src={src} alt="preview" className="w-24 h-24 object-cover rounded-md border border-white/10" />
                  ))}
                </div>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black font-semibold px-6 py-2 rounded-md shadow-[0_0_12px_rgba(255,102,0,0.6)] hover:shadow-[0_0_20px_rgba(255,102,0,0.9)] hover:brightness-110 transition-all duration-300 disabled:opacity-60"
              >
                {loading ? "Uploading..." : "Submit Bike"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.5rem 0.75rem;
          background-color: #1b1b1b;
          border: 1px solid #444;
          border-radius: 0.5rem;
          outline: none;
          transition: 0.2s;
        }
        .input-field:focus {
          border-color: #ff6600;
          box-shadow: 0 0 8px rgba(255,102,0,0.4);
        }
        input[type="file"]::-webkit-file-upload-button {
          background: linear-gradient(to right, #ff6600, #ff8533);
          color: black;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 10px rgba(255,102,0,0.4);
        }
      `}</style>
    </>
  );
}
