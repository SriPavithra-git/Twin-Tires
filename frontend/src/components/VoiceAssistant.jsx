import React from "react";

export default function VoiceAssistant() {
  const handleClick = () => {
    alert("🎤 Voice assistant (placeholder).");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Voice Assistant"
      title="Voice Assistant"
      className="
        fixed bottom-6 right-6 z-[9999]
        flex items-center justify-center
        w-14 h-14 rounded-full text-2xl
        bg-[#ff6600] text-white
        shadow-[0_6px_16px_rgba(255,102,0,0.4)]
        hover:brightness-110 hover:scale-110
        transition-all duration-300 ease-out
        active:scale-95
      "
    >
      🎤
    </button>
  );
}
