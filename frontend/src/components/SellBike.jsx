// SellBikes.jsx
import React, { useState } from "react";

const SellBikes = () => {
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
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
  };

  return (
    <div className="sell-bikes-bgpage">
    <div className="sell-bikes-page">
      <h2>Sell Your Bike</h2>

      <form className="sell-bikes-form" onSubmit={handleSubmit}>
        <h3>Seller Details</h3>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <h3>Bike Details</h3>
        <input
          type="text"
          name="bikeName"
          placeholder="Vehicle Name"
          value={formData.bikeName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year of Manufacturing"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <select
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          required
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
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">Submit Bike</button>
      </form>
    </div>
    </div>
  );
};

export default SellBikes;
