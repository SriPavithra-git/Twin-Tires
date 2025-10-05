import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-[#0d0d0d] text-white flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-4xl font-extrabold text-[#ff6600] mb-4">
          404 — Page Not Found
        </h1>
        <p className="text-gray-300 text-lg">
          <Link
            to="/"
            className="text-[#ff6600] font-semibold underline hover:text-[#ffaa33] transition"
          >
            Go back home
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
