import React, { useState, useEffect, useRef } from "react";
import "../TwinTiresLanding.css";

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

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_MS);
    return () => resetTimeout();
  }, [index]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const goPrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const goTo = (i) => setIndex(i);

  return (
    <section className="tt-hero hero-carousel">
      <div className="carousel">
        <div
          className="carousel-track"
          style={{ transform: `translateX(${-index * 100}%)` }}
        >
          {slides.map((s) => (
            <div className="carousel-slide" key={s.id}>
              <img src={s.img} alt={s.title} />
              <div className="carousel-overlay">
                <h2>{s.title}</h2>
                <p className="muted">{s.subtitle}</p>
                <div className="hero-cta">
                  <button className="btn-outline">View Details</button>
                  <button className="btn-primary">Book Test Ride</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-btn prev" onClick={goPrev} aria-label="Previous slide">‹</button>
        <button className="carousel-btn next" onClick={goNext} aria-label="Next slide">›</button>

        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
