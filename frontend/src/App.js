// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* Pages */
import BuyBikes from "./components/BuyBikes";
import SellBike from "./components/SellBike";
import BikeDetails from "./components/BikeDetails";
import CompareBikes from "./components/CompareBikes";
import Services from "./components/Services";
import Auth from "./components/Auth";
import BuyerDashboard from "./components/BuyerDashboard";
import SellerDashboard from "./components/SellerDashboard";
import PromotionPage from "./components/PromotionPage";
import WishlistPage from "./components/Wishlist";
import NotFound from "./components/NotFound";
import TwinTiresLanding from "./TwinTiresLanding";
import VoiceAssistant from "./components/VoiceAssistant";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  return (
    <>
      {/* Voice assistant stays visible across pages */}
      <VoiceAssistant />

      {/* App routes */}
      <Routes>
        <Route path="/" element={<TwinTiresLanding />} />
        <Route path="/buy" element={<BuyBikes />} />
        <Route path="/sell" element={<SellBike />} />
        <Route path="/compare" element={<CompareBikes />} />
        <Route path="/bike/:id" element={<BikeDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
        <Route path="/dashboard/seller" element={<SellerDashboard />} />
        <Route path="/promotions" element={<PromotionPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}
