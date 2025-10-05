import React, { useState, useEffect, useRef } from "react";

export default function Hero() {
  const slides = [
    {
      id: 1,
      title: "Royal Enfield Classic 350",
      subtitle: "Classic road presence — city & highway ready",
      img: "bike1.jpg",
    },
    {
      id: 2,
      title: "Ola S1 Pro",
      subtitle: "Electric performance, modern features",
      img: "bike2.jpg",
    },
    {
      id: 3,
      title: "TVS Apache RTR 160",
      subtitle: "Sporty handling, excellent value",
      img: "bike3.jpg",
    },
  ];

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const AUTO_PLAY_MS = 4500;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_MS);
    return () => resetTimeout();
  }, [index]);

  const goPrev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const goTo = (i) => setIndex(i);

  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* Carousel Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s) => (
          <div
            key={s.id}
            className="relative min-w-full h-[91vh] flex items-center justify-center"
          >
            {/* Background Image */}
            <img
              src={s.img}
              alt={s.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Text & Buttons */}
            <div className="relative z-10 px-6 sm:px-12 md:px-20 text-center max-w-3xl">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                {s.title}
              </h2>
              <p className="text-gray-300 text-base sm:text-lg mb-8">
                {s.subtitle}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-2 rounded-md border border-white text-white hover:bg-white hover:text-black transition-all duration-300">
                  View Details
                </button>
                <button
                  className="px-6 py-2 rounded-md font-semibold text-black
                  bg-gradient-to-r from-[#ff6600] to-[#ff8533]
                  shadow-[0_0_15px_rgba(255,102,0,0.6)]
                  hover:shadow-[0_0_25px_rgba(255,102,0,0.9)]
                  hover:brightness-110 transition-all duration-300"
                >
                  Book Test Ride
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-6 top-1/2 -translate-y-1/2
        bg-gradient-to-b from-[#ff6600] to-[#ff8533] 
        w-12 h-12 flex items-center justify-center rounded-full 
        shadow-[0_0_15px_rgba(255,102,0,0.6)]
        hover:shadow-[0_0_25px_rgba(255,102,0,0.9)]
        hover:scale-110 transition-all duration-300"
      >
        {/* Left Arrow Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-6 top-1/2 -translate-y-1/2
        bg-gradient-to-b from-[#ff6600] to-[#ff8533] 
        w-12 h-12 flex items-center justify-center rounded-full 
        shadow-[0_0_15px_rgba(255,102,0,0.6)]
        hover:shadow-[0_0_25px_rgba(255,102,0,0.9)]
        hover:scale-110 transition-all duration-300"
      >
        {/* Right Arrow Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots / Indicators */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full ${
              i === index
                ? "bg-[#ff6600] shadow-[0_0_8px_rgba(255,102,0,0.8)]"
                : "bg-gray-400/60"
            } hover:scale-110 transition`}
          />
        ))}
      </div>
    </section>
  );
}
