import React from "react";
import { Link } from "react-router-dom";

const FooterContainer = ({ children }) => {
  return <div className="footer-container">{children}</div>;
};

const Footer = () => {
  return (
    <footer className="footer">
      <FooterContainer>
        {/* About Section */}
        <div className="footer-section-about">
          <h3>Twin Tires</h3>
          <p>
            Trusted two-wheeler marketplace. Explore, compare, buy, and sell bikes, scooters, and EVs.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="#services">Services</Link></li>
            <li><Link to="#about">About Us</Link></li>
            <li><Link to="#contact">Contact</Link></li>
            <li><Link to="/explore">Explore Bikes</Link></li>
            <li><Link to="/buy-sell">Buy / Sell</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section-services">
          <h3>Services</h3>
          <ul>
            <li>Buy & Sell Bikes</li>
            <li>Compare Vehicles</li>
            <li>Upcoming Launches</li>
            <li>Find Dealers</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section-contact-info">
          <h3>Contact</h3>
          <p>Email: <a href="mailto:support@twintires.com">support@twintires.com</a></p>
          <p>Phone: +91 96663 38612</p>
          <div className="social-icons">
            <a href="#"><img src="/facebook.png" alt="Facebook" /></a>
            <a href="#"><img src="/twitter.png" alt="Twitter" /></a>
            <a href="#"><img src="/instagram.png" alt="Instagram" /></a>
            <a href="#"><img src="/linkedin.png" alt="LinkedIn" /></a>
          </div>
        </div>
      </FooterContainer>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Twin Tires | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
