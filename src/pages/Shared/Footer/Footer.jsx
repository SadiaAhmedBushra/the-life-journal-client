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
import { toast } from "react-toastify";

const Footer = () => {
  return (
    <footer className="bg-indigo-300 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10 text-center lg:text-left">
        {/* Brand */}
        <div className="space-y-4">
          <Logo />
          <p>
            A platform to share, reflect, and grow through meaningful life
            lessons and personal wisdom.
          </p>

          <div className="flex justify-center lg:justify-start space-x-4 mt-6">
            <button
              onClick={() => window.open("https://facebook.com", "_blank")}
              className="p-3 rounded-full btn-primary"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={() => window.open("https://linkedin.com", "_blank")}
              className="p-3 rounded-full btn-primary"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={() => window.open("https://x.com", "_blank")}
              className="p-3 rounded-full btn-primary"
              aria-label="X"
            >
              <FaXTwitter className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/" className="hover:underline text-muted">
                Home
              </Link>
            </li>
            <li>
              <Link to="/public-lessons" className="hover:underline text-muted">
                Public Lessons
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:underline text-muted">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:underline text-muted">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/terms-and-conditions" className="hover:underline text-muted">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline text-muted">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/help-center" className="hover:underline text-muted">
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-4 text-muted">
            <li className="flex items-center justify-center lg:justify-start gap-3">
              <FaMapMarkerAlt className="text-primary" />
              <a
                href="https://maps.google.com?q=Dhaka,Bangladesh"
                target="_blank"
                rel="noreferrer"
              >
                Dhaka, Bangladesh
              </a>
            </li>

            <li className="flex items-center justify-center lg:justify-start gap-3">
              <FaPhoneAlt className="text-primary" />
              <a href="tel:+8801234567890">+880 1234 567 890</a>
            </li>

            <li className="flex items-center justify-center lg:justify-start gap-3">
              <FaEnvelope className="text-primary" />
              <a href="mailto:support@thelifejournal.com">
                support@thelifejournal.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Subscribe */}
      <div className="mt-14 flex justify-center">
        <div className="text-center max-w-md w-full">
          <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
          <p className="text-white mb-4">
            Get the latest life lessons, tips, and updates straight to your
            inbox.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Subscribed successfully! 🎉");
              e.target.reset();
            }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
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
        © {new Date().getFullYear()} The Life Journal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
