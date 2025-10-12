import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function LogoAnimation({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Trigger transition to landing page
    }, 3500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-screen overflow-hidden bg-black text-center">
      {/* Biker + Smoke container */}
      <div className="relative flex items-center justify-center">
        {/* Smoke animation — behind biker */}
        <motion.img
          src="/smoke.png"
          alt="Smoke"
          className="absolute z-10 w-[80px] sm:w-[120px] md:w-[150px] opacity-40 right-[55%] top-[45%] translate-x-[-50%] translate-y-[-50%]"
          initial={{ x: "-120%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 18,
            delay: 1,
          }}
        />

        {/* Biker animation */}
        <motion.img
          src="/bikeman.png"
          alt="Biker"
          className="relative z-20 w-[180px] sm:w-[250px] md:w-[350px]"
          initial={{ x: "-300%" }} // further offscreen to avoid visibility before motion
          animate={{ x: "0%" }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            delay: 1,
          }}
        />
      </div>

      {/* Title + Tagline */}
      <motion.div
        className="mt-6 sm:mt-8 md:mt-10 z-30" // reduced margin to move text upward
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2, ease: "easeOut" }}
      >
        <h1 className="font-extrabold text-[#FF6600] text-[40px] sm:text-[60px] md:text-[80px] tracking-[4px] sm:tracking-[6px] whitespace-nowrap">
          TWIN TIRES
        </h1>
        <p className="font-semibold text-[#FF6600] text-[14px] sm:text-[18px] md:text-[20px] tracking-[8px] sm:tracking-[12px] md:tracking-[15px] mt-1 whitespace-nowrap">
          FIND • RIDE • REPEAT
        </p>
      </motion.div>
    </div>
  );
}