// src/components/IntroAnimationPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import LogoAnimation from "./LogoAnimation.jsx";

export default function IntroAnimationPage() {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <LogoAnimation onFinish={handleFinish} />
    </div>
  );
}
