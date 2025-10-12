import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5500); // fade out confetti
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
    

      <main className="relative flex-1 px-6 pt-24 pb-16 overflow-hidden z-0">
        {showConfetti && <ConfettiCelebration />}

        <div className="relative z-10 max-w-xl mx-auto text-center bg-[#121212] border border-[#222] rounded-2xl p-10">
          {/* ✅ Green Circle with White Tick */}
          <div className="mx-auto w-16 h-16 rounded-full bg-[#19a24b] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(25,162,75,0.6)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="white"
              className="w-8 h-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-[#ffcc80]">Order Successfully Placed</h1>
          <p className="text-gray-300 mt-3">
            Thank you for your purchase. You’ll receive a confirmation shortly.
          </p>

          <button
            onClick={() => navigate("/buy")}
            className="mt-8 bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black font-semibold px-8 py-3 rounded-md hover:shadow-[0_0_20px_rgba(255,102,0,0.8)] transition"
          >
            Continue Shopping
          </button>
        </div>
      </main>

     
    </div>
  );
}

/* --------------------------------------- */
/* Confetti Celebration Component */
/* --------------------------------------- */
function ConfettiCelebration() {
  return (
    <>
      <ConfettiBurst side="left" />
      <ConfettiBurst side="right" />
      <ConfettiOverlay pieces={80} duration={4000} delaySpread={1200} />
    </>
  );
}

/* ---------- Burst Popper ---------- */
function ConfettiBurst({ side }) {
  const COLORS = ["#ff6600", "#ff9a1a", "#ffd166", "#19a24b", "#3abff8", "#e879f9", "#f43f5e"];
  const burst = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const color = COLORS[i % COLORS.length];
      const angle = (Math.random() - 0.5) * 40 + (side === "left" ? 60 : 120);
      const distance = 200 + Math.random() * 150;
      const size = 6 + Math.random() * 10;
      return { color, angle, distance, size };
    });
  }, [side]);

  return (
    <>
      <style>{`
        @keyframes pop-burst {
          0% { transform: translate(0,0) scale(1); opacity: 1; }
          100% { 
            transform: translate(
              calc(var(--x-move) * 1px), 
              calc(var(--y-move) * 1px)
            ) scale(0.7) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>

      <div
        className={`absolute top-[5rem] ${
          side === "left" ? "left-4" : "right-4"
        } pointer-events-none`}
      >
        {burst.map((b, i) => (
          <span
            key={i}
            className="absolute block"
            style={{
              width: `${b.size}px`,
              height: `${b.size * 0.4}px`,
              backgroundColor: b.color,
              borderRadius: "1px",
              ["--x-move"]: Math.cos((b.angle * Math.PI) / 180) * b.distance,
              ["--y-move"]: -Math.sin((b.angle * Math.PI) / 180) * b.distance,
              animation: "pop-burst 900ms ease-out forwards",
              transformOrigin: "center",
              opacity: 0.9,
            }}
          />
        ))}
      </div>
    </>
  );
}

/* ---------- Rain Confetti ---------- */
function ConfettiOverlay({ pieces = 60, duration = 4000, delaySpread = 1000 }) {
  const COLORS = ["#ff6600", "#ff9a1a", "#ffd166", "#19a24b", "#3abff8", "#e879f9", "#f43f5e"];
  const confetti = useMemo(() => {
    return Array.from({ length: pieces }).map((_, i) => {
      const left = Math.random() * 100;
      const size = 6 + Math.random() * 8;
      const rot = Math.random() * 360;
      const color = COLORS[i % COLORS.length];
      const delay = Math.random() * delaySpread;
      const xDrift = (Math.random() - 0.5) * 80;
      const shape = ["rect", "square", "triangle"][Math.floor(Math.random() * 3)];
      return { left, size, rot, color, delay, xDrift, shape };
    });
  }, [pieces, delaySpread]);

  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-20vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(105vh) translateX(var(--x-drift)) rotate(720deg); opacity: 0; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 transition-opacity duration-700 ease-out">
        {confetti.map((c, idx) => {
          let shapeStyle = {};
          if (c.shape === "triangle") {
            shapeStyle = {
              width: 0,
              height: 0,
              borderLeft: `${c.size / 2}px solid transparent`,
              borderRight: `${c.size / 2}px solid transparent`,
              borderBottom: `${c.size}px solid ${c.color}`,
            };
          } else {
            shapeStyle = {
              width: c.shape === "square" ? `${c.size}px` : `${c.size * 1.5}px`,
              height: c.shape === "square" ? `${c.size}px` : `${c.size * 0.4}px`,
              backgroundColor: c.color,
            };
          }

          return (
            <span
              key={idx}
              className="absolute"
              style={{
                left: `${c.left}vw`,
                top: "-10vh",
                animation: `confetti-fall ${duration + Math.random() * 2000}ms linear ${c.delay}ms forwards`,
                transform: `rotate(${c.rot}deg)`,
                ["--x-drift"]: `${c.xDrift}px`,
                ...shapeStyle,
                opacity: 0,
                borderRadius: c.shape === "square" ? "2px" : "0",
                transformOrigin: "center",
              }}
            />
          );
        })}
      </div>
    </>
  );
}