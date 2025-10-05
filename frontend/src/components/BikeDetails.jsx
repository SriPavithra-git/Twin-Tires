import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { SAMPLE_BIKES } from "./BikeData";

export default function BikeDetails() {
  const { id } = useParams();
  const bike = SAMPLE_BIKES.find((b) => b.id === id);

  if (!bike) {
    return <h2 className="text-center text-white text-xl mt-10">Bike not found</h2>;
  }

  const gallery = bike.images?.length ? bike.images : [bike.img];
  const [currentImg, setCurrentImg] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);

  const calcEMI = () => {
    const principal = Math.max(0, (bike.price || 0) - (Number(downPayment) || 0));
    const r = 0.01, n = Number(tenure) || 1;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1 || 1);
    return isFinite(emi) ? Math.round(emi).toLocaleString() : "0";
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Glow backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-20 left-1/3 h-[380px] w-[380px] rounded-full blur-[120px] opacity-20"
             style={{ background: "radial-gradient(closest-side,#ff6600,#000)" }} />
      </div>

      <div className="mx-auto max-w-[1220px] px-4 lg:px-6 py-8">
        {/* Breadcrumb-ish header */}
        <div className="mb-4 text-xs text-gray-400/80">
          Home / Buy / <span className="text-[#ffb366]">{bike.brand}</span> / {bike.model}
        </div>

        {/* === TOP: Gallery / Info / Action === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Gallery */}
          <section className="lg:col-span-5">
            <div className="flex gap-3">
              {/* Thumbs (vertical on md+) */}
              <div className="hidden md:flex flex-col gap-3 max-h-[540px] overflow-auto pr-1">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border transition 
                    ${currentImg === i ? "border-[#ff6600]" : "border-white/10 hover:border-[#ff6600]/60"}`}
                    aria-label={`Image ${i + 1}`}
                  >
                    <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="flex-1">
                <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#121212] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                  <img
                    src={gallery[currentImg]}
                    alt={`${bike.brand} ${bike.model}`}
                    className="w-full h-[420px] md:h-[540px] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Mobile thumbs row */}
                {gallery.length > 1 && (
                  <div className="md:hidden mt-3 flex gap-2 overflow-x-auto">
                    {gallery.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImg(i)}
                        className={`min-w-16 h-16 rounded-lg overflow-hidden border transition 
                        ${currentImg === i ? "border-[#ff6600]" : "border-white/10"}`}
                      >
                        <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* MIDDLE: Title / price / bullets / ctas */}
          <section className="lg:col-span-4">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {bike.brand} <span className="text-[#ffb84d]">{bike.model}</span>
            </h1>

            {/* Rating/meta */}
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-300">
              <span className="text-yellow-400">★★★★☆</span>
              <span>({bike.reviews?.length || 0} ratings)</span>
            </div>

            {/* Price */}
            <div className="mt-4 text-3xl md:text-4xl font-black text-[#ffb84d]">
              ₹{(bike.price || 0).toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1">Inclusive of all taxes • EMI options available</div>

            {/* Offer chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["Bank Offer", "No Cost EMI", "Cashback"].map((t) => (
                <span key={t}
                  className="text-[11px] px-2 py-1 rounded-md border border-[#ff6600]/30 text-[#ffcc80] bg-white/5">
                  {t}
                </span>
              ))}
            </div>

            {/* Bullets */}
            <ul className="mt-6 space-y-2 text-gray-300 text-sm leading-relaxed">
              <li>• Fuel: {bike.fuelType}</li>
              <li>• Mileage: {bike.mileage} km/l</li>
              {bike.displacement && <li>• Displacement: {bike.displacement}</li>}
              {bike.power && <li>• Power: {bike.power}</li>}
              {bike.torque && <li>• Torque: {bike.torque}</li>}
              {bike.colors?.length ? (
                <li>• Colors: {bike.colors.join(", ")}</li>
              ) : null}
            </ul>

            {/* CTAs */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                className="rounded-md px-4 py-2 font-semibold text-black
                bg-gradient-to-r from-[#ff6600] to-[#ff8533]
                shadow-[0_0_12px_rgba(255,102,0,0.55)]
                hover:shadow-[0_0_20px_rgba(255,102,0,0.85)]
                hover:brightness-110 transition">
                Add to Wishlist
              </button>
              <button
                className="rounded-md px-4 py-2 font-semibold border border-[#ff6600]/40 text-[#ff6600]
                hover:bg-[#ff6600]/10 transition">
                Compare
              </button>
              <button
                className="rounded-md px-4 py-2 font-semibold text-black
                bg-gradient-to-r from-[#ff6600] to-[#ff8533]
                shadow-[0_0_12px_rgba(255,102,0,0.55)]
                hover:shadow-[0_0_20px_rgba(255,102,0,0.85)]
                hover:brightness-110 transition">
                Book Test Ride
              </button>
            </div>

            {/* Description */}
            <p className="mt-6 text-sm text-gray-300 leading-7">
              {bike.description || "A dynamic motorcycle built for power, performance, and reliability."}
            </p>
          </section>

          {/* RIGHT: Sticky action/EMI card */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-6 rounded-2xl border border-white/10 bg-[#121212]/95 p-5
                            shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
              <div className="text-2xl font-extrabold text-[#ffb84d]">
                ₹{(bike.price || 0).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 mb-4">Free delivery • 5 Year Warranty</div>

              {/* EMI quick calc */}
              <div className="space-y-3">
                <div className="text-sm text-gray-200">Quick EMI Estimator</div>
                <input
                  type="number"
                  placeholder="Down Payment"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="w-full rounded-md bg-[#0f0f0f] border border-[#ff6600]/30 px-3 py-2 text-white outline-none focus:border-[#ff8533]"
                />
                <input
                  type="number"
                  placeholder="Tenure (months)"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="w-full rounded-md bg-[#0f0f0f] border border-[#ff6600]/30 px-3 py-2 text-white outline-none focus:border-[#ff8533]"
                />
                <div className="text-sm text-[#ffcc80]">Estimated EMI: ₹{calcEMI()}</div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2">
                <button
                  className="rounded-md px-4 py-2 font-bold text-black
                  bg-gradient-to-r from-[#ff6600] to-[#ff8533]
                  shadow-[0_0_12px_rgba(255,102,0,0.55)]
                  hover:shadow-[0_0_20px_rgba(255,102,0,0.85)]
                  hover:brightness-110 transition">
                  Add to Cart
                </button>
                <button
                  className="rounded-md px-4 py-2 font-bold text-black
                  bg-gradient-to-r from-[#ff6600] to-[#ff8533]
                  shadow-[0_0_12px_rgba(255,102,0,0.55)]
                  hover:shadow-[0_0_20px_rgba(255,102,0,0.85)]
                  hover:brightness-110 transition">
                  Buy Now
                </button>
              </div>

              <div className="mt-3 text-[11px] text-gray-400">
                Ships from: TwinTires Partner • Secure transaction
              </div>
            </div>
          </aside>
        </div>

        {/* === BELOW: Specs / Fuel & Mileage / Reviews === */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Specifications */}
          <section className="rounded-2xl border border-[#ff6600]/10 bg-[#141414]/80 backdrop-blur-md p-6">
            <h3 className="text-[#ff9a1a] text-xl font-semibold mb-4">Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-gray-200">
              <Spec label="Displacement" value={bike.displacement || "N/A"} />
              <Spec label="Power" value={bike.power || "—"} />
              <Spec label="Torque" value={bike.torque || "—"} />
              <Spec label="Fuel" value={bike.fuelType} />
              <Spec label="Mileage" value={`${bike.mileage} km/l`} />
              <Spec label="Colors" value={bike.colors?.join(", ") || "N/A"} />
            </div>
          </section>

          {/* Fuel & Mileage quick tiles */}
          <section className="rounded-2xl border border-[#ff6600]/10 bg-[#141414]/80 backdrop-blur-md p-6">
            <h3 className="text-[#ff9a1a] text-xl font-semibold mb-4">Fuel & Mileage</h3>
            <div className="grid grid-cols-2 gap-4">
              <Tile title="Fuel Type" value={bike.fuelType} />
              <Tile title="Mileage" value={`${bike.mileage} km/l`} />
            </div>
          </section>
        </div>

        {/* Reviews */}
        <section className="mt-6 rounded-2xl border border-[#ff6600]/10 bg-[#141414]/80 backdrop-blur-md p-6">
          <h3 className="text-[#ff9a1a] text-xl font-semibold mb-4">Customer Reviews</h3>
          {bike.reviews?.length ? (
            <div className="space-y-4">
              {bike.reviews.map((rev, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-[#0f0f0f]/90 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[#ffcc80] font-semibold">{rev.user}</p>
                    <span className="text-yellow-400 text-sm">{"⭐".repeat(rev.rating)}</span>
                  </div>
                  <p className="text-gray-300 mt-2 leading-7">{rev.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No reviews yet</p>
          )}
        </section>
      </div>
    </div>
  );
}

/* Small helpers for clean markup */
function Spec({ label, value }) {
  return (
    <p className="flex items-center justify-between gap-4 border-b border-white/5 py-2">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-200">{value}</span>
    </p>
  );
}

function Tile({ title, value }) {
  return (
    <div className="text-center rounded-xl border border-white/10 bg-[#111] p-5 shadow-[0_10px_22px_rgba(0,0,0,0.35)]">
      <div className="text-[#ffa500] font-semibold">{title}</div>
      <div className="text-gray-100 mt-1">{value}</div>
    </div>
  );
}
