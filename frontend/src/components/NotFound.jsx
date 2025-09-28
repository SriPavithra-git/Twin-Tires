import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 28, color: "#fff" }}>
        <h1>404 — Page Not Found</h1>
        <p><Link to="/">Go back home</Link></p>
      </main>
      <Footer />
    </>
  );
}
