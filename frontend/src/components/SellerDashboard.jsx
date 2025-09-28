import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SellerDashboard() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 28, color: "#fff" }}>
        <h1>Seller Dashboard</h1>
        <p>Placeholder: active listings, add new listing.</p>
      </main>
      <Footer />
    </>
  );
}
