

import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ First email configuration
    const emailConfigs = [
      {
        serviceID: "service_j3r95tg", // first email service
        templateID: "template_4d9x18a",
        publicKey: "Pu9EBtlAT8wpEDgt9",
      },
      {
        serviceID: "service_vcrh657", // second email service
        templateID: "template_cu8vmrn",
        publicKey: "kx1HeE_EixOYtwni5",
      },
    ];

    try {
      // Send to both emails in parallel
      await Promise.all(
        emailConfigs.map((config) =>
          emailjs.send(config.serviceID, config.templateID, formData, config.publicKey)
        )
      );

      setStatus("✅ Message sent successfully to both addresses!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("❌ FAILED:", error);
      setStatus("❌ Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-[#ff6600] mb-4">
          Contact Us
        </h1>
        <p className="text-gray-400 mb-10">
          Have questions? We’d love to hear from you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-[#111] p-8 rounded-xl border border-[#222] max-w-lg mx-auto"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-[#1a1a1a] text-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-[#1a1a1a] text-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="bg-[#1a1a1a] text-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-b from-[#ff9a1a] to-[#ff6600] text-black font-semibold rounded-md py-3 hover:brightness-110 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 text-sm ${
              status.includes("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;