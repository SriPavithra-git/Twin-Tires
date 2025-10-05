import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Wishlist() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0d0d0d] text-white px-7 py-10">
        <section className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-[#ff6600] mb-4">
            Wishlist
          </h1>
          <p className="text-gray-300 text-lg">
            Placeholder: saved bikes.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
