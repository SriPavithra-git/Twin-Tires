// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const AUTO_PLAY_MS = 4500;
 const navigate = useNavigate();
const { isAuthenticated } = useAuth();  // 👈 from Auth.jsx


  // ✅ Fetch specific bikes (IDs 4, 7, 6)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/new-bikes");
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();

        const desiredIds = [4, 15, 6];
        const chosen = desiredIds
          .map((id) => data.find((b) => b.id === id))
          .filter(Boolean)
          .map((b) => ({
            id: b.id,
            title: `${b.brand ?? ""} ${b.model ?? ""}`.trim() || "—",
            subtitle:
              b.tagline ||
              b.description ||
              "Experience performance and style.",
            img:
              b.image ||
              (Array.isArray(b.imageUrls) ? b.imageUrls[0] : undefined) ||
              "/placeholder-bike.jpg",
          }));

        // fallback
        if (chosen.length < 3) {
          const fallbacks = [
            {
              id: "f1",
              title: "Royal Enfield Classic 350",
              subtitle: "Classic road presence — city & highway ready",
              img: "/bike1.jpg",
            },
            {
              id: "f2",
              title: "BMW G 310 R",
              subtitle: "Dynamic performance meets German engineering",
              img: "/bike_bmw.jpg",
            },
            {
              id: "f3",
              title: "TVS Apache RTR 160",
              subtitle: "Sporty handling, excellent value",
              img: "/bike3.jpg",
            },
          ];
          while (chosen.length < 3) chosen.push(fallbacks[chosen.length]);
        }

        setSlides(chosen);
      } catch (err) {
        console.error("❌ Failed to fetch carousel bikes:", err);
      }
    })();
  }, []);

  // autoplay
  const resetTimeout = () =>
    timeoutRef.current && clearTimeout(timeoutRef.current);
  useEffect(() => {
    if (!slides.length) return;
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_MS);
    return () => resetTimeout();
  }, [index, slides]);

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);
  const goTo = (i) => setIndex(i);

  if (!slides.length)
    return (
      <section className="relative w-full h-[70vh] flex items-center justify-center bg-black text-gray-400">
        Loading bikes...
      </section>
    );

  return (
    <section className="relative w-screen overflow-hidden bg-black text-white -mx-[calc((103vw-theme(width.screen))/2)]">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s) => (
            <div
              key={s.id}
              className="group relative min-w-full h-[75vh] sm:h-[85vh] md:h-[91.5vh] flex items-center justify-center"
            >
              {/* ✅ Background Image (same sizing as before) */}
              <img
                src={s.img}
                alt={s.title}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[75vh] sm:h-[85vh] md:h-[91.5vh] object-cover object-center brightness-[0.85] group-hover:brightness-[0.55] transition-all duration-500"
                loading="eager"
              />

              {/* ✅ Overlay only on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />

              {/* Text & Buttons (unchanged size/spacing) */}
              <div className="relative z-10 mx-auto max-w-[90%] sm:max-w-3xl px-3 sm:px-8 text-center">
                <h2 className="mb-3 text-[18px] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow">
                  {s.title}
                </h2>
                <p className="mx-auto mb-6 max-w-2xl text-[12px] sm:text-lg text-gray-300">
                  {s.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  {/* View Details */}
                  <button
                    onClick={() => (window.location.href = `/bike/${s.id}`)}
                    className="
                      inline-flex items-center justify-center rounded-md border border-[#ff6600] text-[#ff6600]
                      px-3 py-2 text-xs
                      sm:px-4 sm:py-2.5 sm:text-sm
                      md:px-5 md:py-3 md:text-base
                      hover:bg-[#ff6600] hover:text-black
                      transition-all duration-300
                      shadow-[0_0_12px_rgba(255,102,0,0.4)]
                      hover:shadow-[0_0_20px_rgba(255,102,0,0.8)]
                    "
                  >
                    View Details
                  </button>

                  {/* Book Test Ride */}
                  <button
  onClick={() => {
    if (isAuthenticated) navigate("/test-ride");
    else navigate("/login");
  }}
  className="
    inline-flex items-center justify-center rounded-md font-bold text-[#111]
    bg-gradient-to-r from-[#ff6600] to-[#ff8533]
    px-3 py-2 text-xs
    sm:px-4 sm:py-2.5 sm:text-sm
    md:px-5 md:py-3 md:text-base
    shadow-[0_8px_20px_rgba(255,102,0,0.25)]
    hover:brightness-110 transition-all duration-300
  "
>
  Book Test Ride
</button>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev Button */}
        {/* Previous Button */}
<button
  onClick={goPrev}
  aria-label="Previous slide"
  className="absolute left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 
             w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center 
             rounded-full border-2 border-[#ff6600]
             text-[#ff6600] hover:bg-[#ff6600]/20
             shadow-[0_0_10px_rgba(255,102,0,0.4)] hover:shadow-[0_0_20px_rgba(255,102,0,0.8)] 
             hover:scale-105 transition-all z-20">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
</button>

{/* Next Button */}
<button
  onClick={goNext}
  aria-label="Next slide"
  className="absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 
             w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center 
             rounded-full border-2 border-[#ff6600]
             text-[#ff6600] hover:bg-[#ff6600]/20
             shadow-[0_0_10px_rgba(255,102,0,0.4)] hover:shadow-[0_0_20px_rgba(255,102,0,0.8)] 
             hover:scale-105 transition-all">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
</button>


        {/* Dots */}
        <div className="absolute bottom-2 sm:bottom-4 w-full flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition ${
                i === index
                  ? "bg-[#ff6600] shadow-[0_0_8px_rgba(255,102,0,0.8)]"
                  : "bg-white/60"
              } h-2 w-2`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
