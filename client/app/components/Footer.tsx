import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 bg-amber-50 ">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-blue-400">Ilmo LMS</h3>
              <p className="dark:text-gray-400 text-black  mt-2">
                Empowering learners worldwide with cutting-edge educational
                technology and expert-led courses.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaEnvelope className="w-4 h-4 text-blue-400" />
                <span className="dark:text-gray-400 text-black ">
                  support@ilmo.com
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="w-4 h-4 text-blue-400" />
                <span className="dark:text-gray-400 text-black ">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="w-4 h-4 text-blue-400" />
                <span className="dark:text-gray-400 text-black ">
                  123 Education St, Learning City
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses"
                  className="dark:text-gray-400 text-black hover:text-blue-400 dark:hover:text-white transition-colors"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="dark:text-gray-400 text-black hover:text-blue-400 dark:hover:text-white transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/instructors"
                  className="dark:text-gray-400 text-black hover:text-blue-400 dark:hover:text-white transition-colors"
                >
                  Become an Instructor
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="dark:text-gray-400 text-black hover:text-blue-400 dark:hover:text-white transition-colors"
                >
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="dark:text-gray-400 text-black hover:text-blue-400 dark:hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4 ">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="dark:text-gray-400 text-black   hover:text-blue-400 dark:hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="dark:text-gray-400 text-black   hover:text-blue-400 dark:hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="dark:text-gray-400 text-black   hover:text-blue-400 dark:hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="dark:text-gray-400 text-black   hover:text-blue-400 dark:hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="dark:text-gray-400 text-black   hover:text-blue-400 dark:hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <div className="space-y-4">
              <p className="dark:text-gray-400 text-black  text-sm">
                Subscribe to our newsletter for the latest updates and course
                announcements.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 dark:bg-gray-800 bg-gray-200 border border-gray-400 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
              <div>
                <h5 className="text-sm font-semibold mb-2">Legal</h5>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/privacy"
                      className="dark:text-gray-400 text-black   hover:text-blue-400 dark:hover:text-white transition-colors text-sm"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="dark:text-gray-400 text-black   hover:text-blue-400 dark:hover:text-white transition-colors text-sm"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookies"
                      className="dark:text-gray-400 text-black   hover:text-blue-400 dark:hover:text-white transition-colors text-sm"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="dark:text-gray-400 text-black  text-sm">
              © {new Date().getFullYear()} Ilmo LMS. All rights reserved.
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="dark:text-gray-400 text-black  hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="dark:text-gray-400 text-black  hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="dark:text-gray-400 text-black  hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="dark:text-gray-400 text-black  hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </Link>
              <Link
                href="https://youtube.com"
                className="dark:text-gray-400 text-black  hover:text-red-400 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </Link>
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="dark:text-gray-400 text-black  hover:text-white transition-colors text-sm flex items-center space-x-1"
            >
              <span>Back to Top</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
