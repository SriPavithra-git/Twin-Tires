import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Auth() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 28, color: "#fff" }}>
        <h1>Auth (Login / Signup)</h1>
        <p>Placeholder: buyer/seller login and seller registration.</p>
      </main>
      <Footer />
    </>
  );
}
