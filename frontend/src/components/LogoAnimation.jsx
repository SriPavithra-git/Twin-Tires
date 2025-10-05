import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function LogoAnimation({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="relative h-screen w-screen bg-white overflow-hidden">
      {/* Title and Tagline */}
      <motion.div
        className="absolute left-1/2 top-[60%] -translate-x-1/2 text-center z-30"
        initial={{ opacity: 0, y: 330, x: 500 }}
        animate={{ opacity: 1, y: 330, x: 500 }}
        transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
      >
        <h1 className="text-[80px] text-[#FF6600] tracking-[6px] font-extrabold">
          TWIN TIRES
        </h1>
        <p className="mt-0 text-[20px] text-[#FF6600] tracking-[17px] font-semibold leading-none">
          FIND • RIDE • REPEAT
        </p>
      </motion.div>

      {/* Smoke Animation */}
      <motion.img
        src="/smoke.png"
        alt="Smoke"
        className="absolute z-10 w-[40px] h-auto left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2"
        initial={{ x: "-170%", y: "-50%", opacity: 0 }}
        animate={{ x: "500px", y: "-800%", opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 15,
          delay: 1,
        }}
      />

      {/* Biker Animation */}
      <motion.img
        src="/bikeman.png"
        alt="Biker"
        className="absolute z-20 w-[100px] top-[35%] -translate-x-1/2 -translate-y-1/2"
        initial={{ x: "-150%" }}
        animate={{ x: "150%", y: "-45%" }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 15,
          delay: 1,
        }}
      />
    </div>
  );
}
