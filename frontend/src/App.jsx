import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import TwinTiresLanding from "./components/TwinTiresLanding.jsx";
import BuyBikes from "./components/BuyBikes.jsx";
import SellBike from "./components/SellBike.jsx";
import BikeDetails from "./components/BikeDetails.jsx";
import CompareBikes from "./components/CompareBikes.jsx";
import Services from "./components/Services.jsx";
import PromotionPage from "./components/PromotionPage.jsx";
import Wishlist from "./components/Wishlist.jsx";
import BuyerDashboard from "./components/BuyerDashboard.jsx";
import SellerDashboard from "./components/SellerDashboard.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Auth from "./components/Auth.jsx";
import NotFound from "./components/NotFound.jsx";
import VoiceAssistant from "./components/VoiceAssistant.jsx";

export default function App() {
  return (
    <>
      <VoiceAssistant />
      <Suspense fallback={<div className="p-6">Loading…</div>}>
        <Routes>
          <Route path="/" element={<TwinTiresLanding />} />
          <Route path="/buy" element={<BuyBikes />} />
          <Route path="/sell" element={<SellBike />} />
          <Route path="/bike/:id" element={<BikeDetails />} />
          <Route path="/compare" element={<CompareBikes />} />
          <Route path="/services" element={<Services />} />
          <Route path="/promotions" element={<PromotionPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
          <Route path="/dashboard/seller" element={<SellerDashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
