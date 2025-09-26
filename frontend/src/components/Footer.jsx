import React from "react";
import "../TwinTiresLanding.css";

export default function Footer() {
  return (
    <footer className="tt-footer">
      <div>© {new Date().getFullYear()} Twin Tires</div>
      <div className="muted">Contact: support@twintires.com</div>
    </footer>
  );
}
