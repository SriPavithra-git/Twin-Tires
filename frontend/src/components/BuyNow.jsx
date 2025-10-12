// src/components/BuyNow.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api, { AddressApi, OrderApi, CartApi } from "../lib/api";
import { useAuth } from "./auth";

const ORANGE = "#ff6600";

export default function BuyNow() {
  const { user } = useAuth();
  const { id, type } = useParams();
  const { state } = useLocation();
  const cartItems = state?.cartItems || null;
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);

  // 🏍️ Fetch single bike if not from cart
  useEffect(() => {
    if (cartItems) {
      setLoading(false);
      return;
    }
    if (!id || !type) return;
    (async () => {
      try {
        let data;
        if (type === "used") data = await api.get(`used-bikes/${id}`);
        else data = await api.get(`new-bikes/${id}`);
        setBike(data.data ?? data);
      } catch (e) {
        console.error("Failed to fetch bike:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, type, cartItems]);

  // 📦 Address state
  const [addr, setAddr] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    label: "Home",
  });

  // 💳 Order state
  const [order, setOrder] = useState({
    email: "",
    paymentMethod: "COD",
  });

  const price = bike?.price || 0;

  // 🧾 Place Order
  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Save Address
      const addressPayload = { ...addr, user: { id: user.id } };
      await AddressApi.add(addressPayload);

      // 2️⃣ Build order payload(s)
      if (cartItems && cartItems.length > 0) {
        // 🧾 Create one order per bike in cart
        for (const item of cartItems) {
          const orderPayload = {
            buyerId: user.id,
            bikeId: item.bike?.id,
            fullName: addr.fullName,
            phone: addr.phoneNumber,
            altPhone: addr.altPhone || "",
            address: `${addr.addressLine1}, ${addr.addressLine2}, ${addr.city}, ${addr.state} - ${addr.pincode}`,
            email: order.email,
            paymentMethod: order.paymentMethod,
            totalAmount: item.bike?.price || 0,
            status: "PENDING",
          };

          await OrderApi.create(orderPayload);
        }

        // ✅ Clear cart after placing all orders
        await CartApi.clear(user.id);
      } else {
        // 🏍️ Single-bike order
        const orderPayload = {
          buyerId: user.id,
          bikeId: bike.id,
          fullName: addr.fullName,
          phone: addr.phoneNumber,
          altPhone: addr.altPhone || "",
          address: `${addr.addressLine1}, ${addr.addressLine2}, ${addr.city}, ${addr.state} - ${addr.pincode}`,
          email: order.email,
          paymentMethod: order.paymentMethod,
          totalAmount: bike.price,
          status: "PENDING",
        };

        await OrderApi.create(orderPayload);
      }

      // 3️⃣ Success
      navigate("/order-success");
    } catch (err) {
      console.error("❌ Order failed:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
      {/* Progress Steps */}
      <div className="flex justify-center items-center gap-6 text-sm text-gray-400 pt-24 pb-4">
        <Step number="1" title="Address" active={step === 1} done={step > 1} />
        <span className="text-[#ff6600] text-lg">›</span>
        <Step number="2" title="Order Summary" active={step === 2} done={step > 2} />
        <span className="text-[#ff6600] text-lg">›</span>
        <Step number="3" title="Payment" active={step === 3} />
      </div>

      <main className="flex-1 px-6 pb-16">
        {step === 1 ? (
          <div className="mx-auto w-full max-w-3xl">
            <div className="rounded-xl border border-[#222] bg-[#121212] p-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <AddressForm addr={addr} setAddr={setAddr} onContinue={() => setStep(2)} />
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
            {/* Order Summary */}
            <section className="col-span-12 lg:col-span-5">
              <div className="rounded-xl border border-[#222] bg-[#121212] p-5">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                {cartItems ? (
                  cartItems.map((i, idx) => (
                    <div key={idx} className="flex justify-between text-sm border-b border-[#333] py-2">
                      <span>
                        {i.bike?.brand} {i.bike?.model}
                      </span>
                      <span>₹{Number(i.bike?.price || 0).toLocaleString("en-IN")}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex gap-4">
                    <img
                      src={bike.imageUrls?.[0] || bike.image || "/placeholder-bike.jpg"}
                      alt={bike.model}
                      className="w-40 h-40 object-contain rounded-lg border border-[#1f1f1f]"
                    />
                    <div>
                      <p className="text-sm text-gray-400">{bike.brand}</p>
                      <h3 className="text-lg font-semibold">{bike.model}</h3>
                      <div className="mt-2 text-[#ffb84d] text-2xl font-bold">
                        ₹{price.toLocaleString("en-IN")}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes.</p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Payment Section */}
            <section className="col-span-12 lg:col-span-7">
              <div className="rounded-xl border border-[#222] bg-[#121212] p-6">
                {step === 2 && (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Review & Confirm</h2>
                    <div className="rounded-lg border border-[#222] bg-[#0f0f0f] p-4">
                      <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
                      <div className="text-sm text-gray-300 space-y-1">
                        <p>
                          <span className="text-gray-400">Name:</span> {addr.fullName}
                        </p>
                        <p>
                          <span className="text-gray-400">Phone:</span> {addr.phoneNumber}
                        </p>
                        <p>
                          <span className="text-gray-400">Address:</span> {addr.city}, {addr.state}, {addr.pincode}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-2 rounded-md border border-[#333] hover:border-[--o] text-sm"
                        style={{ "--o": ORANGE }}
                      >
                        Edit Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black font-semibold px-8 py-2 rounded-md"
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <form onSubmit={placeOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Email">
                      <input
                        name="email"
                        type="email"
                        required
                        value={order.email}
                        onChange={(e) => setOrder((o) => ({ ...o, email: e.target.value }))}
                        className="w-full bg-[#111] border border-[#333] rounded-md p-2 text-sm text-white"
                      />
                    </Field>

                    <div className="md:col-span-2">
                      <label className="text-sm text-gray-400 mb-1 block">Payment Method</label>
                      <div className="flex flex-wrap gap-3">
                        {["COD", "CARD", "UPI"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setOrder((o) => ({ ...o, paymentMethod: opt }))}
                            className={`px-3 py-2 rounded-md border text-sm ${
                              order.paymentMethod === opt
                                ? "border-[--o] text-[#ffcc80]"
                                : "border-[#333] text-gray-300"
                            }`}
                            style={{ "--o": ORANGE }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-2 flex justify-between mt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-2 rounded-md border border-[#333]"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black font-semibold px-10 py-3 rounded-md"
                      >
                        Place Order
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

/* ---------- UI Components ---------- */
function Step({ number, title, active, done }) {
  return (
    <div className={`flex flex-col items-center ${active ? "text-[#ff6600]" : ""}`}>
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full border ${
          done
            ? "bg-[#ff6600] border-[#ff6600] text-black"
            : active
            ? "border-[#ff6600] text-[#ff6600]"
            : "border-[#444] text-gray-300"
        }`}
      >
        {number}
      </div>
      <p className="text-xs mt-1">{title}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-400 mb-1">{label}</label>
      {children}
    </div>
  );
}

function AddressForm({ addr, setAddr, onContinue }) {
  const set = (k) => (e) => setAddr({ ...addr, [k]: e.target.value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onContinue();
      }}
      className="w-full"
    >
      <Input label="Full Name" value={addr.fullName} onChange={set("fullName")} required />
      <Input label="Phone Number" value={addr.phoneNumber} onChange={set("phoneNumber")} required />
      <Input label="Address Line 1" value={addr.addressLine1} onChange={set("addressLine1")} required />
      <Input label="Address Line 2" value={addr.addressLine2} onChange={set("addressLine2")} />
      <Input label="City" value={addr.city} onChange={set("city")} required />
      <Input label="State" value={addr.state} onChange={set("state")} required />
      <Input label="Pincode" value={addr.pincode} onChange={set("pincode")} required />

      <label className="block text-sm text-gray-400 mb-1">Label</label>
      <select
        value={addr.label}
        onChange={(e) => setAddr({ ...addr, label: e.target.value })}
        className="bg-[#111] border border-[#333] rounded-md p-2 text-sm text-gray-200 focus:border-[#ff6600]"
      >
        <option value="Home">Home</option>
        <option value="Work">Work</option>
      </select>

      <div className="flex justify-end">
        <button
          type="submit"
          className="mt-6 bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black font-semibold px-8 py-2 rounded-md hover:shadow-[0_0_20px_rgba(255,102,0,0.8)] transition"
        >
          Save & Continue
        </button>
      </div>
    </form>
  );
}

function Input({ label, value, onChange, required, type = "text" }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-sm text-gray-400 mb-1">
        {label}
        {required && "*"}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-[#111] border border-[#333] rounded-md p-2 text-sm text-gray-200 outline-none focus:border-[#ff6600]"
      />
    </div>
  );
}
