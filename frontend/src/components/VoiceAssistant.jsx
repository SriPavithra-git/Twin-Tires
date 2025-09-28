// src/components/VoiceAssistant.jsx
import React from "react";
import "../TwinTiresLanding.css"; // ✅ Make sure the path is correct

export default function VoiceAssistant() {
  return (
    <button
      className="voice-assistant-btn"
      aria-label="Voice Assistant"
      title="Voice Assistant"
      onClick={() => alert("Voice assistant (placeholder).")}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        fontSize: "24px",
        padding: "10px",
        borderRadius: "50%",
        border: "none",
        background: "#ff6600",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      🎤
    </button>
  );
}
