// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import DevErrorBoundary from "./DevErrorBoundary.jsx";
import { AuthProvider } from "./components/auth"; // ✅ add this import
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DevErrorBoundary>
      <AuthProvider> {/* ✅ wrap your app so useAuth() works */}
        <BrowserRouter>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </BrowserRouter>
      </AuthProvider>
    </DevErrorBoundary>
  </React.StrictMode>
);
