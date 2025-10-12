import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaPaperPlane, FaTimes } from "react-icons/fa";
import OpenAI from "openai";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm VahanaBot — your Smart Bike Buddy! Ask me anything about bikes, comparisons, EMI, or test rides.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Initialize OpenAI SDK
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // Scroll to bottom whenever messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle message sending
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are VahanaBot — a friendly, intelligent bike assistant for the Twin Tires app. Help users explore, compare, and buy two-wheelers. Provide short, helpful responses using a natural, engaging tone.",
          },
          ...messages,
          userMsg,
        ],
        temperature: 0.8,
      });

      const reply = response.choices[0].message.content;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("OpenAI error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Oops! I’m having a little trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-[110px] right-6 z-[9999]">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Chat with VahanaBot"
          title="Chat with VahanaBot"
          className="relative flex items-center justify-center w-14 h-14 rounded-full font-semibold
                     transition-all duration-500 ease-out
                     shadow-[0_0_25px_rgba(255,102,0,0.4)]
                     border border-transparent
                     bg-gradient-to-br from-[#ff6600] to-[#ff8533] text-black
                     hover:bg-black hover:text-[#ff8533]
                     hover:shadow-[0_0_40px_rgba(255,136,0,0.8)]
                     active:scale-95 group"
        >
          <FaComments className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          <span
            className="absolute inset-0 rounded-full border transition-all duration-500
                       border-transparent group-hover:border-[#ff6600]/50"
          />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="w-80 md:w-96 bg-[#0d0d0d] border border-[#222] rounded-2xl 
                     shadow-[0_0_25px_rgba(255,102,0,0.6)] overflow-hidden flex flex-col 
                     animate-slide-up"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black p-3 flex justify-between items-center">
            <span className="font-semibold">VahanaBot</span>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:scale-110 transition-all"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto max-h-[200px] space-y-3 custom-scroll">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  m.role === "assistant"
                    ? "bg-[#1b1b1b] text-gray-200"
                    : "bg-gradient-to-r from-[#ff6600] to-[#ff8533] text-black"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="text-gray-400 text-sm italic">
                VahanaBot is thinking...
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSend}
            className="border-t border-[#333] flex items-center p-2 bg-[#111]"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent outline-none text-gray-200 px-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2 rounded-full text-[#ff8533] hover:text-[#ff6600] 
                         hover:scale-110 transition-all duration-300 
                         disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message"
            >
              <FaPaperPlane className="text-xl" />
            </button>
          </form>

          {/* Styles */}
          <style>{`
            .custom-scroll::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scroll::-webkit-scrollbar-thumb {
              background-color: #ff6600;
              border-radius: 3px;
            }
            @keyframes slide-up {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            .animate-slide-up {
              animation: slide-up 0.3s ease-out;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
