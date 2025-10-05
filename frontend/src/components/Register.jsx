import React, { useState } from "react";
import Navbar from "./Navbar";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    number: "",
    password: "",
    rePassword: "",
  });

  const [registeringAs, setRegisteringAs] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = (role) => {
    setRegisteringAs(role);
    setDropdownOpen(false);
  };

  const handleGoogleRegister = () => setRegisteringAs("Google User");

  // Overlay when registering
  if (registeringAs) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0d0d0d]">
        <div className="text-2xl font-semibold text-[#ff6600] animate-pulse">
          Registering as {registeringAs}...
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* Background Image */}
      <div
        className="fixed inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/login-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Centered Form */}
      <div className="relative z-40 flex items-center justify-center min-h-screen pt-20 pb-10 px-4">
        <div
          className="w-full max-w-2xl bg-black/60 backdrop-blur-md 
          rounded-2xl text-white p-10"
        >
          <h2 className="text-3xl font-bold text-center text-[#ff6600] mb-2">
            Create Account
          </h2>
          <p className="text-center text-gray-300 mb-8">
            Join Twin Tires Marketplace
          </p>

          {/* Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "firstName", label: "First Name", type: "text" },
              { name: "lastName", label: "Last Name", type: "text" },
              { name: "dob", label: "Date of Birth", type: "date" },
              { name: "email", label: "Email", type: "email" },
              { name: "number", label: "Phone Number", type: "tel" },
              { name: "password", label: "Password", type: "password" },
              { name: "rePassword", label: "Re-type Password", type: "password" },
            ].map((f, i) => (
              <div key={i} className="flex flex-col col-span-1">
                <label className="text-sm text-gray-400 mb-1">{f.label}</label>
                <input
                  name={f.name}
                  type={f.type}
                  value={formData[f.name]}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 rounded-md bg-[#1a1a1a] 
                    border border-gray-700 focus:ring-1 focus:ring-[#ff6600]
                    outline-none placeholder-gray-500"
                />
              </div>
            ))}

            {/* Role Dropdown */}
            <div className="relative col-span-1 md:col-span-2 mt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(!dropdownOpen);
                }}
                className="w-full flex items-center justify-between 
                bg-gradient-to-r from-[#ff6600] to-[#ff8533]
                text-black font-semibold px-4 py-2 rounded-md 
                hover:shadow-[0_0_18px_rgba(255,102,0,0.7)] 
                hover:brightness-110 transition-all duration-300"
              >
                <span>Select Role</span>
                <span className="text-lg">&#9662;</span>
              </button>

              {dropdownOpen && (
                <div className="absolute z-20 mt-2 w-full rounded-md bg-[#1a1a1a] border border-gray-700 shadow-lg">
                  {["Buyer", "Seller"].map((role) => (
                    <div
                      key={role}
                      onClick={() => handleRegister(role)}
                      className="cursor-pointer px-4 py-2 hover:bg-[#ff6600]/20 transition"
                    >
                      Register as {role}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 text-center mt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#ff6600] to-[#ff8533]
                text-black font-semibold px-8 py-2 rounded-md
                hover:shadow-[0_0_20px_rgba(255,102,0,0.9)]
                hover:brightness-110 transition-all duration-300"
              >
                Register
              </button>
            </div>
          </form>

          {/* OR Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 border-t border-gray-600" />
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-600" />
          </div>

          {/* Google Register */}
          <button
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3 
            bg-gradient-to-r from-[#ff6600] to-[#ff8533]
            rounded-md py-2 text-black font-semibold
            hover:shadow-[0_0_20px_rgba(255,102,0,0.9)] 
            hover:brightness-110 transition-all duration-300"
          >
            {/* Orange Google Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
              className="w-5 h-5 fill-[#ff6600]"
            >
              <path d="M488 261.8c0-17.8-1.6-35-4.7-51.8H249v98.2h134.1c-5.8 31.4-23.3 57.9-49.7 75.8v62.9h80.5c47.1-43.4 74.1-107.3 74.1-185.1zM249 492c67 0 123.2-22.3 164.3-60.6l-80.5-62.9c-22.3 15-50.7 23.9-83.8 23.9-64.4 0-119-43.5-138.4-101.8H28.8v64.2C69.8 443.3 152 492 249 492zM110.6 290.6c-4.6-13.8-7.2-28.5-7.2-43.6s2.6-29.8 7.2-43.6v-64.2H28.8C10.3 180.9 0 213.5 0 247s10.3 66.1 28.8 91.2l81.8-47.6zM249 102.2c36.5 0 69.2 12.6 95 37.4l71.1-71.1C372.2 29.2 316 0 249 0 152 0 69.8 48.7 28.8 124.8l81.8 47.6c19.4-58.3 74-101.8 138.4-101.8z" />
            </svg>
            Sign up with Google
          </button>

          {/* Already have an account */}
          <div className="text-center mt-6 text-gray-400 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-[#ff6600] hover:text-[#ff8533]">
              Login here
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
