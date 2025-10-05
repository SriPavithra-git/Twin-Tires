import React from "react";
import { Link } from "react-router-dom";

const FooterContainer = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 py-10 max-w-6xl mx-auto">
    {children}
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-[#0d0d0d] text-white border-t border-[#ff6600]/10 mt-16">
      {/* Top Grid */}
      <FooterContainer>
        {/* About Section */}
        <div>
          <h3 className="text-[#ffa500] font-bold text-xl mb-3">Twin Tires</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Trusted two-wheeler marketplace. Explore, compare, buy, and sell
            bikes, scooters, and EVs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[#ffa500] font-semibold text-lg mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link
                to="#services"
                className="hover:text-[#ffb84d] transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="#about"
                className="hover:text-[#ffb84d] transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="#contact"
                className="hover:text-[#ffb84d] transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                className="hover:text-[#ffb84d] transition-colors"
              >
                Explore Bikes
              </Link>
            </li>
            <li>
              <Link
                to="/buy-sell"
                className="hover:text-[#ffb84d] transition-colors"
              >
                Buy / Sell
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-[#ffa500] font-semibold text-lg mb-3">
            Services
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Buy & Sell Bikes</li>
            <li>Compare Vehicles</li>
            <li>Upcoming Launches</li>
            <li>Find Dealers</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#ffa500] font-semibold text-lg mb-3">Contact</h3>
          <p className="text-gray-300 text-sm mb-2">
            Email:{" "}
            <a
              href="mailto:support@twintires.com"
              className="text-[#ffb84d] hover:text-[#ff8533] transition"
            >
              support@twintires.com
            </a>
          </p>
          <p className="text-gray-300 text-sm mb-3">Phone: +91 96663 38612</p>
          <div className="flex gap-3">
            <a href="#" className="hover:scale-110 transition-transform">
              <img
                src="/facebook.png"
                alt="Facebook"
                className="w-5 h-5 opacity-80 hover:opacity-100"
              />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <img
                src="/twitter.png"
                alt="Twitter"
                className="w-5 h-5 opacity-80 hover:opacity-100"
              />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <img
                src="/instagram.png"
                alt="Instagram"
                className="w-5 h-5 opacity-80 hover:opacity-100"
              />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <img
                src="/linkedin.png"
                alt="LinkedIn"
                className="w-5 h-5 opacity-80 hover:opacity-100"
              />
            </a>
          </div>
        </div>
      </FooterContainer>

      {/* Bottom Strip */}
      <div className="bg-[#151515] border-t border-[#ff6600]/10 py-4">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#ffb84d] font-medium">Twin Tires</span> | All
          Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
