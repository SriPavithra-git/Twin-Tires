import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
    rePassword: "",
  });

  const [role, setRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setDropdownOpen(false);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Validation
    if (!role) return toast.error("Please select a role (Buyer or Seller).");
    if (formData.password !== formData.rePassword)
      return toast.error("Passwords do not match!");

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.number,
      password: formData.password,
      role: role.toUpperCase(),
    };

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/register/user",
        payload
      );
      console.log("✅ Registered:", res.data);
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err) {
      console.error("❌ Registration failed:", err);
      toast.error(
        err.response?.data?.message ||
          "Registration failed. Email might already exist."
      );
    } finally {
      setLoading(false);
    }
  };

  // Loading Overlay
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0d0d0d]">
        <div className="text-2xl font-semibold text-[#ff6600] animate-pulse">
          Registering your account...
        </div>
      </div>
    );
  }

  return (
    <>
     

      {/* Background */}
      <div
        className="fixed inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/login-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Registration Card */}
      <div className="relative z-40 flex items-center justify-center min-h-screen pt-20 pb-10 px-4">
        <div className="w-full max-w-2xl bg-black/60 backdrop-blur-md rounded-2xl text-white p-10">
          <h2 className="text-3xl font-bold text-center text-[#ff6600] mb-2">
            Create Account
          </h2>
          <p className="text-center text-gray-300 mb-8">
            Join Twin Tires Marketplace
          </p>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={submitForm}
          >
            {/* Input Fields */}
            {[
              { name: "firstName", label: "First Name", type: "text" },
              { name: "lastName", label: "Last Name", type: "text" },
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
                <span>{role ? `Role: ${role}` : "Select Role"}</span>
                <span className="text-lg">&#9662;</span>
              </button>

              {dropdownOpen && (
                <div className="absolute z-20 mt-2 w-full rounded-md bg-[#1a1a1a] border border-gray-700 shadow-lg">
                  {["Buyer", "Seller"].map((r) => (
                    <div
                      key={r}
                      onClick={() => handleRoleSelect(r)}
                      className="cursor-pointer px-4 py-2 hover:bg-[#ff6600]/20 transition"
                    >
                      Register as {r}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
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

          {/* Login Link */}
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
