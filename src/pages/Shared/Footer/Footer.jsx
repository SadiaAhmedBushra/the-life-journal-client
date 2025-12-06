import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-indigo-300 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10 text-center lg:text-left">
        
        <div className="space-y-4">
          <Logo />
          <p>
            A platform to share, reflect, and grow through meaningful life
            lessons and personal wisdom.
          </p>

          <div className="flex justify-center lg:justify-start space-x-4 mt-6">
            {[FaFacebookF, FaLinkedinIn, FaXTwitter].map(
              (Icon, i) => (
                <button
                  key={i}
                  className="p-3 rounded-full btn-primary transition-colors"
                  aria-label="Social Link"
                >
                  <Icon className="w-5 h-5 text-white" />
                </button>
              )
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="hover:underline text-muted">Home</Link></li>
            <li><Link to="/public-lessons" className="hover:underline text-muted">Public Lessons</Link></li>
            <li><Link to="/pricing" className="hover:underline text-muted">Pricing</Link></li>
            <li><Link to="/dashboard" className="hover:underline text-muted">Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <ul className="space-y-3">
            <li><Link to="/terms" className="hover:underline text-muted">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:underline text-muted">Privacy Policy</Link></li>
            <li><Link to="/help" className="hover:underline text-muted">Help Center</Link></li>
            <li><Link to="/blog" className="hover:underline text-muted">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-4 text-muted">
            <li className="flex items-center justify-center md:justify-start gap-3">
              <FaMapMarkerAlt className="text-primary" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <FaPhoneAlt className="text-primary" />
              <span>+880 1234 567 890</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <FaEnvelope className="text-primary" />
              <span>support@thelifejournal.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 flex justify-center">
        <div className="text-center max-w-md w-full">
          <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
          <p className="text-white mb-4">
            Get the latest life lessons, tips, and updates straight to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Your email"
              className="btn rounded-full border border-[#818CF8] px-5"
              required
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 border-t border-primary pt-6 text-center text-muted text-sm">
        &copy; {new Date().getFullYear()} The Life Journal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
