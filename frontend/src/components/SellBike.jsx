import React, { useState } from "react";
import Navbar from "../components/Navbar"; // ✅ adjust path if needed

export default function SellBikes() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bikeName: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    fuelType: "",
    description: "",
    image: null,
  });

  const [bikesForSale, setBikesForSale] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setBikesForSale([...bikesForSale, formData]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      bikeName: "",
      brand: "",
      model: "",
      year: "",
      price: "",
      fuelType: "",
      description: "",
      image: null,
    });
    alert("✅ Bike submitted successfully!");
  };

  return (
    <>
    <div className="fixed inset-x-0 top-0 h-21.5 bg-black z-[110]" />

      <Navbar />

      {/* Page Content */}
      <div className="min-h-screen bg-[#0d0d0d] flex justify-center items-center px-4 py-10 pt-24">
        <div className="w-full max-w-3xl bg-[#111] border border-[#222] rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold text-center text-[#ff6600] mb-6">
            Sell Your Bike
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seller Details */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#ff9a1a]">
                Seller Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-md bg-[#1b1b1b] border border-gray-700 focus:ring-1 focus:ring-[#ff6600] outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-md bg-[#1b1b1b] border border-gray-700 focus:ring-1 focus:ring-[#ff6600] outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="md:col-span-2 w-full px-3 py-2 rounded-md bg-[#1b1b1b] border border-gray-700 focus:ring-1 focus:ring-[#ff6600] outline-none"
                />
              </div>
            </div>

            {/* Bike Details */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#ff9a1a]">
                Bike Details
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="bikeName"
                  placeholder="Vehicle Name"
                  value={formData.bikeName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-md bg-[#1b1b1b] border border-gray-700 focus:ring-1 focus:ring-[#ff6600]"
                />
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-md bg-[#1b1b1b] border border-gray-700 focus:ring-1 focus:ring-[#ff6600]"
                />
                <input
                  type="text"
                  name="model"
                  placeholder="Model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-md bg-[#1b1b1b] border border-gray-700 focus:ring-1 focus:ring-[#ff6600]"
                />
                <input
                  type="number"
                  name="year"
                  placeholder="Year of Manufacturing"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-md bg-[#1b1b1b] border border-gray-700 focus:ring-1 focus:ring-[#ff6600]"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price (₹)"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-md bg-[#1b1b1b] border border-gray-700 focus:ring-1 focus:ring-[#ff6600]"
                />

                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-md bg-[#1b1b1b] border border-gray-700 text-gray-300 focus:ring-1 focus:ring-[#ff6600]"
                >
                  <option value="">Select Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                </select>

                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="md:col-span-2 w-full px-3 py-2 rounded-md bg-[#1b1b1b] border border-gray-700 focus:ring-1 focus:ring-[#ff6600] resize-none"
                />

                {/* File Upload (Improved Style) */}
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-sm text-gray-300">Upload Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="file-input"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#ff6600] to-[#ff8533]
                text-black font-semibold px-6 py-2 rounded-md
                shadow-[0_0_12px_rgba(255,102,0,0.6)]
                hover:shadow-[0_0_20px_rgba(255,102,0,0.9)]
                hover:brightness-110 transition-all duration-300"
              >
                Submit Bike
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom styles for file input */}
      <style>{`
        input[type="file"] {
          color: transparent;
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
        input[type="file"]::-webkit-file-upload-button:hover {
          box-shadow: 0 0 18px rgba(255,102,0,0.7);
          transform: translateY(-1px);
        }
      `}</style>
    </>
  );
}
