import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function LogoAnimation({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // switch to landing page
    }, 3500); // adjust duration to match your animation
    return () => clearTimeout(timer);
  }, [onFinish]);

  const titleTop = "60%";

  return (
    <div className="h-screen w-screen bg-white relative overflow-hidden">
      <motion.div
        className="absolute left-1/2 text-center z-30"
        style={{ top: titleTop }}
        initial={{ opacity: 0, y: 330, x: 500 }}
        animate={{ opacity: 1, y: 330, x: 500 }}
        transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
      >
        <h1
          className="font-extrabold"
          style={{ fontSize: "80px", color: "#FF6600", letterSpacing: "6px" }}
        >
          TWIN TIRES
        </h1>
        <p
          className="font-semibold"
          style={{
            fontSize: "20px",
            color: "#FF6600",
            letterSpacing: "17px",
            marginTop: "0%",
            lineHeight: "1",
          }}
        >
          FIND • RIDE • REPEAT
        </p>
      </motion.div>

      <motion.img
        src="/smoke.png"
        alt="Smoke"
        className="absolute z-10"
        initial={{ x: "-170%", y: "-50%", opacity: 0 }}
        animate={{ x: "500px", y: "-800%", opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 15,
          delay: 1,
        }}
        style={{
          width: "40px",
          height: "auto",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <motion.img
        src="/bikeman.png"
        alt="Biker"
        className="w-[100px] absolute z-20"
        initial={{ x: "-150%" }}
        animate={{ x: "150%", y: "-45%" }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 15,
          delay: 1,
        }}
        style={{ top: "35%", transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}
