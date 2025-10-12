// src/components/AddBike.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { useAuth } from "./auth";

export default function AddBike() {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    price: "",
    fuelType: "",
    mileage: "",
    displacement: "",
    power: "",
    torque: "",
    colors: "",
    description: "",
    year: "",
    city: ""
  });

  const [images, setImages] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("❌ Seller not logged in. Please log in first.");
      return;
    }

    const colorList =
      form.colors && form.colors.trim() !== ""
        ? form.colors.split(",").map((c) => c.trim())
        : [];

    const fd = new FormData();

    // ✅ These must match your NewBikeRequestDTO field names exactly
    fd.append("sellerId", user.id);
    fd.append("brand", form.brand);
    fd.append("model", form.model);
    fd.append("price", form.price);
    fd.append("fuelType", form.fuelType);
    fd.append("mileage", form.mileage);
    fd.append("displacement", form.displacement);
    fd.append("power", form.power);
    fd.append("torque", form.torque);
    fd.append("description", form.description);
    fd.append("year", form.year);
    fd.append("city", form.city);

    colorList.forEach((color) => fd.append("colors", color));

    // ✅ Append image files properly
    images.forEach(({ file }) => fd.append("images", file));

    try {
      // ✅ DO NOT set headers manually — fetch will set proper boundary
      const response = await fetch("http://localhost:8080/api/new-bikes/add", {
        method: "POST",
        body: fd,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to add bike");
      }

      const data = await response.json();
      console.log("✅ New bike added:", data);
      alert("✅ New bike added successfully!");
      navigate("/seller-dashboard");
    } catch (err) {
      console.error("❌ Add bike failed:", err);
      alert(err.message || "Failed to add bike");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white py-10 px-4">
      <div className="max-w-4xl mx-auto border border-[#ff6600]/20 rounded-2xl bg-[#141414]/90 shadow p-8">
        <h1 className="text-3xl font-bold text-center text-[#ffb84d] mb-8">
          Add a New Bike
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Brand" name="brand" value={form.brand} onChange={handleChange} required />
            <Input label="Model" name="model" value={form.model} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input label="Price (₹)" name="price" type="number" value={form.price} onChange={handleChange} required />
            <Input label="Year" name="year" type="number" value={form.year} onChange={handleChange} required />
            <Select
              label="Fuel Type"
              name="fuelType"
              value={form.fuelType}
              onChange={handleChange}
              options={["PETROL", "ELECTRIC", "HYBRID"]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input label="Mileage (km/l)" name="mileage" value={form.mileage} onChange={handleChange} />
            <Input label="Displacement (cc)" name="displacement" value={form.displacement} onChange={handleChange} />
            <Input label="City" name="city" value={form.city} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Power (bhp)" name="power" value={form.power} onChange={handleChange} />
            <Input label="Torque (Nm)" name="torque" value={form.torque} onChange={handleChange} />
          </div>

          <Input label="Colors (comma-separated)" name="colors" value={form.colors} onChange={handleChange} placeholder="Red, Black, Blue" />

          <div>
            <label className="block text-sm text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="w-full rounded-md bg-[#111] border border-[#ff6600]/30 px-3 py-2 outline-none focus:border-[#ff8533]"
              placeholder="Describe features and highlights"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-md 
                         file:border-0 file:text-sm file:font-semibold file:bg-[#ff6600] file:text-black hover:file:bg-[#ff8533]"
            />

            {images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img.preview}
                      alt={`Preview ${i}`}
                      className="w-24 h-24 object-cover rounded-md border border-[#ff6600]/30"
                    />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 text-xs bg-black/60 text-white rounded-full px-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              className="rounded-md bg-gradient-to-r from-[#ff6600] to-[#ff8533] px-6 py-2 font-bold text-black 
                         shadow-[0_0_15px_rgba(255,102,0,0.55)] hover:shadow-[0_0_25px_rgba(255,102,0,0.9)] transition"
            >
              Add Bike
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-2">{label}</label>
      <input
        {...props}
        className="w-full rounded-md bg-[#111] border border-[#ff6600]/30 px-3 py-2 outline-none focus:border-[#ff8533]"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md bg-[#111] border border-[#ff6600]/30 px-3 py-2 text-gray-200 outline-none focus:border-[#ff8533]"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
