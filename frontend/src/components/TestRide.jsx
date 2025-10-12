import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

/**
 * TestRide.jsx
 * - Requires login
 * - Optional prefilled bike from location.state.bike
 * - Book a test ride (POST /api/test-rides/book)
 * - List & cancel user's test rides
 */
export default function TestRide() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const prefilledBike = location.state?.bike || null;

  // --- Form state ---
  const [bikeId, setBikeId] = useState(prefilledBike?.id || "");
  const [bikeName, setBikeName] = useState(
    prefilledBike ? `${prefilledBike.brand ?? ""} ${prefilledBike.model ?? ""}`.trim() : ""
  );
  const [date, setDate] = useState(defaultDateStr(1)); // tomorrow
  const [time, setTime] = useState("10:00");
  const [locationText, setLocationText] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // --- My rides ---
  const [rides, setRides] = useState([]);
  const [loadingRides, setLoadingRides] = useState(true);

  // redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { redirectTo: "/test-ride" } });
    }
  }, [isAuthenticated, navigate]);

  // load my rides
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;
    let ignore = false;
    (async () => {
      try {
        setLoadingRides(true);
        const res = await fetch(`/api/test-rides/user/${user.id}`);
        if (!res.ok) throw new Error(`Failed to fetch rides (${res.status})`);
        const data = await res.json();
        if (!ignore) setRides(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!ignore) console.error(e);
      } finally {
        if (!ignore) setLoadingRides(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [isAuthenticated, user?.id]);

  const hasPrefilledBike = useMemo(() => !!prefilledBike, [prefilledBike]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user?.id) {
      setError("Please login to book a test ride.");
      return;
    }
    const payload = {
      userId: user.id,
      bikeId: safeNumber(bikeId) || (hasPrefilledBike ? prefilledBike.id : null),
      bikeName: bikeName?.trim() || (hasPrefilledBike ? `${prefilledBike.brand} ${prefilledBike.model}` : ""),
      date,     // YYYY-MM-DD
      time,     // HH:mm
      location: locationText?.trim(),
    };

    // minimal validation
    if (!payload.bikeName) return setError("Please enter a bike/model name.");
    if (!payload.date) return setError("Please pick a date.");
    if (!payload.time) return setError("Please pick a time.");
    if (!payload.location) return setError("Please enter a location or dealership.");

    try {
      setSubmitting(true);
      const res = await fetch("/api/test-rides/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Booking failed (${res.status})`);
      // success
      alert("✅ Test ride booked!");
      // refresh list
      const my = await fetch(`/api/test-rides/user/${user.id}`);
      if (my.ok) setRides(await my.json());
      // keep the form if they want another time, or reset as you like:
      // reset to prefilled bike if present
      setDate(defaultDateStr(1));
      setTime("10:00");
      setLocationText("");
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to book a test ride.");
    } finally {
      setSubmitting(false);
    }
  };

  const cancelRide = async (id) => {
    if (!window.confirm("Cancel this test ride?")) return;
    try {
      const res = await fetch(`/api/test-rides/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Cancel failed (${res.status})`);
      setRides((r) => r.filter((x) => x.id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to cancel.");
    }
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#0b0b0b] text-white p-6">Redirecting to login…</div>;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white px-4 py-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Book a <span className="text-[#ff9a1a]">Test Ride</span>
            </h1>
            <p className="text-sm text-gray-400">
              Choose your bike, date, and a preferred time. We’ll confirm with the nearest dealership.
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="self-start rounded-md border border-[#ff6600]/40 px-3 py-2 text-sm font-semibold text-[#ff6600] hover:bg-[#ff6600]/10 transition"
          >
            ← Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form card */}
          <section className="lg:col-span-3 rounded-2xl border border-white/10 bg-[#131313] p-5 shadow-[0_12px_24px_rgba(0,0,0,0.35)]">
            {hasPrefilledBike ? (
              <PrefilledBikeInfo bike={prefilledBike} />
            ) : (
              <div className="mb-4 rounded-lg border border-white/10 bg-[#0f0f0f]/60 p-3 text-sm">
                <div className="text-[#ffcc80] font-semibold mb-1">No bike selected</div>
                <div className="text-gray-400">Enter a model below, or pick one from the catalog first.</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!hasPrefilledBike && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Bike ID (optional)">
                    <input
                      type="number"
                      value={bikeId}
                      onChange={(e) => setBikeId(e.target.value)}
                      className="w-full rounded-md bg-[#0f0f0f] border border-[#ff6600]/30 px-3 py-2 text-white outline-none focus:border-[#ff8533]"
                      placeholder="e.g. 12"
                    />
                  </Field>
                  <Field label="Bike / Model Name *">
                    <input
                      type="text"
                      value={bikeName}
                      onChange={(e) => setBikeName(e.target.value)}
                      className="w-full rounded-md bg-[#0f0f0f] border border-[#ff6600]/30 px-3 py-2 text-white outline-none focus:border-[#ff8533]"
                      placeholder="e.g. Honda SP 125"
                      required
                    />
                  </Field>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Preferred Date *">
                  <input
                    type="date"
                    min={defaultDateStr(0)}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-md bg-[#0f0f0f] border border-[#ff6600]/30 px-3 py-2 text-white outline-none focus:border-[#ff8533]"
                    required
                  />
                </Field>
                <Field label="Preferred Time *">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-md bg-[#0f0f0f] border border-[#ff6600]/30 px-3 py-2 text-white outline-none focus:border-[#ff8533]"
                    required
                  />
                </Field>
              </div>

              <Field label="Location / Dealership *">
                <input
                  type="text"
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  className="w-full rounded-md bg-[#0f0f0f] border border-[#ff6600]/30 px-3 py-2 text-white outline-none focus:border-[#ff8533]"
                  placeholder="e.g. TwinTires Showroom, JP Nagar, Bengaluru"
                  required
                />
              </Field>

              {error && (
                <div className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                  {error}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-md bg-gradient-to-r from-[#ff6600] to-[#ff8533] px-4 py-2 font-bold text-black shadow-[0_0_12px_rgba(255,102,0,0.55)] hover:shadow-[0_0_20px_rgba(255,102,0,0.85)] hover:brightness-110 transition disabled:opacity-60"
                >
                  {submitting ? "Booking…" : "Book Test Ride"}
                </button>
              </div>
            </form>
          </section>

          {/* My Bookings */}
          <section className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#131313] p-5 shadow-[0_12px_24px_rgba(0,0,0,0.35)]">
            <div className="mb-3 text-lg font-semibold text-[#ffcc80]">My Test Rides</div>

            {loadingRides ? (
              <div className="text-sm text-gray-400">Loading…</div>
            ) : rides.length === 0 ? (
              <div className="text-sm text-gray-400">No bookings yet.</div>
            ) : (
              <div className="space-y-3">
                {rides.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-lg border border-white/10 bg-[#0f0f0f]/60 p-3 flex items-center justify-between gap-3"
                  >
                    <div className="text-sm">
                      <div className="font-semibold text-white/90">{r.bikeName || `Bike #${r.bikeId}`}</div>
                      <div className="text-gray-400">
                        {r.date} • {formatTime(r.time)} • {r.location || "—"}
                      </div>
                    </div>
                    <button
                      onClick={() => cancelRide(r.id)}
                      className="rounded-md border border-red-500/50 px-3 py-1.5 text-sm text-red-300 hover:bg-red-500/10 transition"
                    >
                      Cancel
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small helpers ---------- */

function Field({ label, children }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-gray-300">{label}</span>
      {children}
    </label>
  );
}

function PrefilledBikeInfo({ bike }) {
  const name = `${bike.brand ?? ""} ${bike.model ?? ""}`.trim();
  const img =
    bike.image ||
    (Array.isArray(bike.imageUrls) ? bike.imageUrls[0] : undefined) ||
    "/placeholder-bike.jpg";

  return (
    <div className="mb-4 flex items-center gap-3 rounded-lg border border-white/10 bg-[#0f0f0f]/60 p-3">
      <img src={img} alt={name} className="h-16 w-24 object-cover rounded-md border border-white/10" />
      <div className="text-sm">
        <div className="font-semibold text-white/90">{name || `Bike #${bike.id}`}</div>
        <div className="text-gray-400">
          {bike.fuelType ? `${bike.fuelType}` : ""} {bike.mileage ? `• ${bike.mileage} km/l` : ""}
        </div>
      </div>
    </div>
  );
}

function defaultDateStr(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function safeNumber(x) {
  const n = Number(x);
  return isFinite(n) ? n : null;
}

function formatTime(t) {
  // backend returns "HH:MM:SS" or "HH:MM"
  if (!t) return "";
  const [H, M] = String(t).split(":");
  return `${H}:${M}`;
}
