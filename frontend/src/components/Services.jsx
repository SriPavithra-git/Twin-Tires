// src/pages/Services.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../TwinTiresLanding.css";

const servicesData = [
  { id: 1, title: "Pre-Test Ride Booking", subtitle: "Book your ride in advance", icon: "/testride.jpg" },
  { id: 2, title: "Bike Servicing", subtitle: "Maintenance & repair", icon: "/bikeservice.webp" },
  { id: 3, title: "Accessories", subtitle: "Helmets, gears & more", icon: "/accessories.jpg" },
  { id: 4, title: "Insurance", subtitle: "Protect your bike", icon: "/insurance.jpg" },
];

export default function Services() {
  return (
    <div className="services-page">
      <Navbar />
      <section className="services-hero">
        <h1>Our Services</h1>
        <p>Explore our wide range of bike services, test rides, and more.</p>
      </section>

      <section className="services-grid">
        {servicesData.map((service) => (
          <div key={service.id} className="service-card">
            <img src={service.icon} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.subtitle}</p>
            <button className="btn-primary">Explore</button>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
