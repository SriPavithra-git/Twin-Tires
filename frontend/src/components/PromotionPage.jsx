import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PromotionPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-[#0d0d0d] text-white flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-4xl font-extrabold text-[#ff6600] mb-4">
          Promotions
        </h1>
        <p className="text-gray-300 text-lg">
          Placeholder: all offers & discounts.
        </p>
      </main>
      <Footer />
    </>
  );
}
