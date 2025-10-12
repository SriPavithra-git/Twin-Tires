import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import VoiceAssistant from "./components/VoiceAssistant.jsx";
import {Toaster} from "react-hot-toast";
import ChatBot from "./components/ChatBot.jsx"
// components
import TwinTiresLanding from "./components/TwinTiresLanding.jsx";
import IntroAnimationPage from "./components/IntroAnimationPage.jsx";
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
import Logout from "./components/Logout.jsx";
import Register from "./components/Register.jsx";
import AccountPage from "./components/AccountPage.jsx";
import AddBike from "./components/AddBike.jsx";
import MyListings from "./components/MyListings.jsx";
import Cart from "./components/Cart.jsx";
import TestRide from "./components/TestRide.jsx";
import EditBike from "./components/EditBike.jsx";
import UsedBikeDetails from "./components/UsedBikeDetails.jsx";
import BuyNow from "./components/BuyNow.jsx";
import OrderSuccess from "./components/OrderSuccess.jsx";
import AccountOrders from "./components/AccountOrders.jsx";
import AccountAddresses from "./components/AccountAddresses.jsx";
import AccountDetails from "./components/AccountDetails.jsx";
import NotFound from "./components/NotFound.jsx";
import OrderDetails from "./components/OrderDetails";
import BrandsGrid from "./components/BrandsGrid.jsx";

import BikeServicing from "./components/BikeServicing.jsx";
import Accessories from "./components/Accessories.jsx"; 
import Insurence from "./components/Insurence.jsx";
import Contact from "./components/Contact.jsx";

import About from "./components/About";
import Upcoming from "./components/Upcoming";
import Dealers from "./components/Dealers";

export default function App() {
  return (
    <>
      
      <VoiceAssistant />
      <ChatBot/>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Suspense fallback={<div className="p-6 text-white">Loading…</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<IntroAnimationPage />} />
            <Route path="/home" element={<TwinTiresLanding />} />
            <Route path="/buy" element={<BuyBikes />} />
            <Route path="/sell" element={<SellBike />} />
            <Route path="/bike/:id" element={<BikeDetails />} />
            <Route path="/compare" element={<CompareBikes />} />
            <Route path="/services" element={<Services />} />
            <Route path="/promotions" element={<PromotionPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/add-bike" element={<AddBike />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/test-ride" element={<TestRide />} />
            <Route path="/edit-bike/:id" element={<EditBike />} />
            <Route path="/buy-now/:id" element={<BuyNow />} />
            <Route path="/buy-now/:type/:id" element={<BuyNow />} />
            <Route path="/used-bike/:id" element={<UsedBikeDetails />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/account/orders" element={<AccountOrders />} />
            <Route path="/account/addresses" element={<AccountAddresses />} />
            <Route path="/account/details" element={<AccountDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account/orders/:id" element={<OrderDetails />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/BrandsGrid" element={<BrandsGrid />} />
           
            <Route path="/account/orders/:id" element={<OrderDetails />} />
            <Route path="/bike-servicing" element={<BikeServicing />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/insurance" element={<Insurence />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/Contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
