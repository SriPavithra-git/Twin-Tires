import React, { useState } from "react";
import Navbar from "./Navbar"; // adjust path if needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggingInAs, setLoggingInAs] = useState("");

  const handleLogin = (role) => {
    setLoggingInAs(role);
    setDropdownOpen(false);
  };

  const handleGoogleSignIn = () => {
    setLoggingInAs("Google User");
  };

  // Overlay when logging in
  const overlay = loggingInAs ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white text-2xl font-semibold">
      <div className="animate-pulse text-center">
        Logging in as {loggingInAs}...
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Dark strip under navbar */}
      <div className="fixed inset-x-0 top-0 h-16 bg-black z-30" />
      <Navbar />

      {/* Background with fixed image */}
      <div
        className="fixed inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('/login-banner.jpg')", // change path if needed
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Scrollable container — small movement allowed */}
    <div className="relative z-40 h-[90vh] pt-16 flex flex-col items-center justify-center text-white px-4 overflow-y-auto">
        <div className="w-full max-w-md bg-black/50 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-2 text-center text-[#ff6600]">
            Welcome Back
          </h2>
          <p className="text-gray-300 text-center mb-8">
            Login to Twin Tires Marketplace
          </p>

          {/* Email */}
          <div className="relative mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full border-b-2 border-gray-500 bg-transparent px-1 py-2 text-white focus:border-[#ff6600] outline-none"
            />
            <label className="absolute left-1 top-2 text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-[#ff6600] peer-valid:-top-4 peer-valid:text-sm peer-valid:text-[#ff6600]">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full border-b-2 border-gray-500 bg-transparent px-1 py-2 text-white focus:border-[#ff6600] outline-none"
            />
            <label className="absolute left-1 top-2 text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-[#ff6600] peer-valid:-top-4 peer-valid:text-sm peer-valid:text-[#ff6600]">
              Password
            </label>
          </div>

          {/* Dropdown */}
          <div className="relative mb-6">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between 
              bg-gradient-to-r from-[#ff6600] to-[#ff8533]
              text-black font-semibold px-4 py-2 rounded-md 
              shadow-[0_0_12px_rgba(255,102,0,0.6)] 
              hover:shadow-[0_0_20px_rgba(255,102,0,0.9)] 
              hover:brightness-110 transition-all duration-300"
            >
              <span>Login</span>
              <span className="text-lg">&#9662;</span>
            </button>

            {dropdownOpen && (
              <div className="absolute z-20 mt-2 w-full rounded-md bg-white text-black shadow-lg">
                <div
                  onClick={() => handleLogin("Buyer")}
                  className="cursor-pointer px-4 py-2 hover:bg-[#ff6600]/20 transition"
                >
                  Login as Buyer
                </div>
                <div
                  onClick={() => handleLogin("Seller")}
                  className="cursor-pointer px-4 py-2 hover:bg-[#ff6600]/20 transition"
                >
                  Login as Seller
                </div>
              </div>
            )}
          </div>

          {/* OR Separator */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-600" />
            <span className="mx-3 text-gray-400">OR</span>
            <hr className="flex-1 border-gray-600" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 
            bg-gradient-to-r from-[#ff6600] to-[#ff8533]
            rounded-md py-2 text-black font-semibold
            shadow-[0_0_12px_rgba(255,102,0,0.6)] 
            hover:shadow-[0_0_20px_rgba(255,102,0,0.9)] 
            hover:brightness-110 transition-all duration-300"
          >
            <img
              src='https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp'
              alt="Google Logo"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>

          {/* Links */}
          <div className="flex justify-between text-sm text-gray-400 mt-6">
            <a href="#" className="hover:text-[#ff6600] transition">
              Forgot Password?
            </a>
            <a href="/register" className="hover:text-[#ff6600] transition">
              Register Now
            </a>
          </div>
        </div>
      </div>

      {overlay}
    </>
  );
};

export default Login;
