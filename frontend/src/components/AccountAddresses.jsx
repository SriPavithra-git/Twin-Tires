// src/components/AccountAddresses.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AddressApi } from "../lib/api";
import { useAuth } from "./auth";

export default function AccountAddresses() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      try {
        const res = await AddressApi.getByUser(user.id);
        setAddresses(res);
      } catch (err) {
        console.error("❌ Failed to fetch addresses:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        Loading your addresses...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
     
      <main className="flex-1 px-6 py-10 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-[#ff6600]">Your Addresses</h1>

        {addresses.length === 0 ? (
          <p className="text-gray-400">You haven’t saved any addresses yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {addresses.map((a) => (
              <div
                key={a.addressId}
                className="border border-[#222] bg-[#121212] p-5 rounded-lg hover:border-[#ff6600]/60 transition"
              >
                <h2 className="text-lg font-semibold text-[#ff8533] mb-1">
                  {a.label || "Address"}
                </h2>
                <p className="text-sm text-gray-300">{a.fullName}</p>
                <p className="text-sm text-gray-300">{a.phoneNumber}</p>
                <p className="text-sm text-gray-400">
                  {[a.addressLine1, a.addressLine2, a.city, a.state, a.pincode]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
      
    </div>
  );
}
