import React from "react";
import { motion } from "framer-motion";
import { Bike, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        {/* 🔶 Header */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-[#ff6600] mb-6"
        >
          About <span className="text-[#ff9a1a]">Twin Tires</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300 max-w-3xl mx-auto text-base leading-relaxed mb-14"
        >
          At <span className="text-[#ff9a1a] font-semibold">Twin Tires</span>,
          we’re not just a two-wheeler marketplace — we’re a community built
          for riders, dreamers, and explorers. Our mission is to empower
          everyone to experience the thrill of two wheels with confidence,
          transparency, and technology.
        </motion.p>

        {/* 🔸 Info Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {/* Mission */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#111] rounded-xl p-6 border border-[#222] shadow-md hover:shadow-[0_6px_20px_rgba(255,102,0,0.2)] transition"
          >
            <ShieldCheck className="text-[#ff6600] mb-3 w-8 h-8" />
            <h3 className="text-[#ff9a1a] text-xl font-semibold mb-2">
              Our Mission
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              To make two-wheeler discovery, comparison, and ownership effortless
              and trustworthy — powered by innovation and rider-first thinking.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#111] rounded-xl p-6 border border-[#222] shadow-md hover:shadow-[0_6px_20px_rgba(255,102,0,0.2)] transition"
          >
            <Sparkles className="text-[#ff6600] mb-3 w-8 h-8" />
            <h3 className="text-[#ff9a1a] text-xl font-semibold mb-2">
              Our Vision
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              To be the ultimate digital garage for every biker — where every
              purchase, service, and ride begins with trust and ends with joy.
            </p>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#111] rounded-xl p-6 border border-[#222] shadow-md hover:shadow-[0_6px_20px_rgba(255,102,0,0.2)] transition"
          >
            <HeartHandshake className="text-[#ff6600] mb-3 w-8 h-8" />
            <h3 className="text-[#ff9a1a] text-xl font-semibold mb-2">
              Why Choose Us
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              From verified listings to smart comparisons and test-ride bookings,
              we’re redefining how riders explore and own bikes with confidence.
            </p>
          </motion.div>
        </div>

        {/* 🔶 CTA / Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-b from-[#111] to-[#0d0d0d] border border-[#222] rounded-2xl p-10 shadow-[0_0_15px_rgba(255,102,0,0.1)]"
        >
          <Bike className="w-12 h-12 text-[#ff6600] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#ff9a1a] mb-3">
            Join the Twin Tires Community
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Whether you're buying, selling, or simply exploring — Twin Tires is
            built for those who live for the ride. Let’s make every journey count.
          </p>
          <a
            href="/buy"
            className="inline-block bg-gradient-to-b from-[#ff9a1a] to-[#ff6600] text-black font-semibold rounded-md py-3 px-8 hover:brightness-110 transition"
          >
            Explore Bikes
          </a>
        </motion.div>
      </div>
    </div>
  );
}