// src/components/auth.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../lib/api"; // <-- your axios instance path

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("tt_user");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);

  // CALLS BACKEND and stores backend response (with id)
  const login = async ({ email, password }) => {
  const res = await fetch("http://localhost:8080/login/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Invalid login");
  const data = await res.json();

  if (!data || !data.id) throw new Error(data?.message || "Invalid login");

  const normalized = {
    id: data.id,
    name: data.name,
    role: String(data.role || "").toLowerCase(),
    message: data.message,
    email,
  };

  setUser(normalized);
  localStorage.setItem("tt_user", JSON.stringify(normalized));
  return normalized;
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem("tt_user");
  };

  const value = useMemo(() => ({
    isAuthenticated: !!user,
    user,
    login,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  return ctx ?? { isAuthenticated: false, user: null, login: async () => {}, logout: () => {} };
}
