import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const servicesData = [
  { id: 1, title: "Pre-Test Ride Booking", subtitle: "Book your ride in advance", icon: "/testride.jpg" },
  { id: 2, title: "Bike Servicing", subtitle: "Maintenance & repair", icon: "/bikeservice.webp" },
  { id: 3, title: "Accessories", subtitle: "Helmets, gears & more", icon: "/accessories.jpg" },
  { id: 4, title: "Insurance", subtitle: "Protect your bike", icon: "/insurance.jpg" },
];

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-16 px-6 bg-gradient-to-b from-[#111] to-[#0d0d0d]">
        <h1 className="text-4xl font-extrabold text-[#ff6600] mb-4">
          Our Services
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Explore our wide range of bike services, test rides, and more.
        </p>
      </section>

      {/* Services Grid */}
      <section className="flex-grow px-6 py-10 max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="bg-[#111] border border-[#222] rounded-xl p-5 text-center hover:shadow-[0_6px_12px_rgba(255,102,0,0.25)] transition-transform hover:-translate-y-2"
          >
            <div className="overflow-hidden rounded-lg mb-4 h-40 w-full">
              <img
                src={service.icon}
                alt={service.title}
                className="h-full w-full object-cover hover:scale-105 transition-transform"
              />
            </div>

            <h3 className="text-lg font-semibold text-[#ff9a1a] mb-1">
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4">{service.subtitle}</p>

            <button className="w-full bg-gradient-to-b from-[#ff9a1a] to-[#ff6600] text-black font-semibold rounded-md py-2 shadow-[0_4px_10px_rgba(255,102,0,0.3)] hover:brightness-110 transition">
              Explore
            </button>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
