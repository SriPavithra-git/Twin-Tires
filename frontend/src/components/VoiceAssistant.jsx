import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { executeAIAction } from "../utils/aiActions";

export default function VoiceAssistant({ forcedLang }) {
  const [active, setActive] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Backend base URL
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";
  const sessionId = "voice-session";

  // 🔊 Speak text (uses backend TTS if available, else browser fallback)
 const speakText = async (text, lang, callback) => {
  if (!text) return;
  try {
    if (recognitionRef.current) recognitionRef.current.stop();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const res = await fetch(`${API_BASE}/api/ai/speak`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, lang }),
    });

    if (!res.ok) throw new Error("TTS request failed");

    const blob = await res.blob();
    const audio = new Audio(URL.createObjectURL(blob));
    audioRef.current = audio;

    audio.onended = () => {
      console.log("🔁 Resuming listening...");
      if (callback) callback();
      // ✅ Restart listening automatically
      if (listening && recognitionRef.current) recognitionRef.current.start();
      else if (listening && !recognitionRef.current) startListening();
    };

    audio.play();
  } catch (err) {
    console.error("TTS fallback:", err);
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang || navigator.language || "en-IN";
    utter.onend = () => {
      if (callback) callback();
      if (listening && recognitionRef.current) recognitionRef.current.start();
      else if (listening && !recognitionRef.current) startListening();
    };
    speechSynthesis.speak(utter);
  }
};



  // 🤖 Send message to backend AI (non-stream version)
  const sendToAI = async (message) => {
    const lang = forcedLang || navigator.language || "en-IN";
    const url = `${API_BASE}/api/ai/chat`;
    console.log("🌐 Sending to AI:", url);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          lang,
          sessionId,
        }),
      });

      if (!res.ok) throw new Error("AI request failed");

      const data = await res.json();
      console.log("🤖 AI reply:", data);

      const reply =
        data.reply || data.response || "Sorry, I didn’t get that properly.";

      speakText(reply, lang);

      // Execute any action received from backend
      if (data.action) {
        await executeAIAction(data.action);
        if (data.action.action === "navigate" && data.action.target) {
          navigate(data.action.target);
          toast.success(`🧭 Navigated to ${data.action.target}`);
        }
      }
    } catch (err) {
      console.error("🚨 AI request failed:", err);
      speakText("I’m having trouble connecting to the AI assistant.", lang);
    }
  };

  // 🎙 Continuous speech recognition setup
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recog = new SpeechRecognition();
    recog.lang = forcedLang || navigator.language || "en-IN";
    recog.continuous = true;
    recog.interimResults = false;

    recog.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim();
      console.log("🎙 Heard:", transcript);

      // Stop any current audio before processing new command
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      speechSynthesis.cancel();

      sendToAI(transcript);
    };

    recog.onerror = (e) => console.error("Speech error:", e.error);
    recog.onend = () => {
      if (listening) recog.start(); // Restart listening automatically
    };

    recog.start();
    recognitionRef.current = recog;
    setListening(true);
    setActive(true);
    toast.success("🎤 Voice assistant activated");
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setListening(false);
    setActive(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    toast("🛑 Voice assistant stopped");
  };

  const handleClick = () => {
    if (active) stopListening();
    else startListening();
  };

  // 🧹 Cleanup on component unmount
 useEffect(() => {
  return () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    fetch(`${API_BASE}/api/ai/chat/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }).catch(() => {});
  };
}, []);



  // 🎨 Floating mic button UI
  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-[9999]
        flex items-center justify-center
        w-14 h-14 rounded-full font-semibold
        transition-all duration-500 ease-out
        shadow-[0_0_25px_rgba(255,102,0,0.4)]
        border border-transparent
        ${
          active
            ? "bg-black text-[#ff6600] border border-[#ff6600]/60 shadow-[0_0_30px_rgba(255,102,0,0.4)]"
            : "bg-gradient-to-br from-[#ff6600] to-[#ff8533] text-black"
        }
        hover:bg-black hover:text-[#ff8533]
        hover:shadow-[0_0_40px_rgba(255,136,0,0.8)]
        active:scale-95
        group
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-6 h-6 transition-transform duration-300 ${
          active ? "scale-110 text-[#ff8533]" : "group-hover:scale-110"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 1.5a3 3 0 00-3 3v7a3 3 0 006 0v-7a3 3 0 00-3-3zM19.5 10.5a7.5 7.5 0 01-15 0M12 21v-3"
        />
      </svg>
      <span
        className={`absolute inset-0 rounded-full border transition-all duration-500 ${
          active
            ? "border-[#ff6600]/70 animate-pulse"
            : "border-transparent group-hover:border-[#ff6600]/50"
        }`}
      />
    </button>
  );
}