import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Wishlist() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 28, color: "#fff" }}>
        <h1>Wishlist</h1>
        <p>Placeholder: saved bikes.</p>
      </main>
      <Footer />
    </>
  );
}
