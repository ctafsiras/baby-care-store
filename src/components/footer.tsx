import Image from "next/image";
import React from "react";
import Logo from "@/assets/Baby-Care-Store-Logo.png";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center mb-4 mx-auto">
            <Image
              className="w-auto h-auto"
              src={Logo}
              alt="Logo"
              width={64}
              height={64}
            />
            <h1 className="text-2xl font-bold">Baby Care Store</h1>
            <p className="text-gray-400 max-w-52 text-center">
              Premier online destination for top-quality baby care products
            </p>
          </div>
          <div className="flex flex-col mx-auto">
            <h4 className="text-lg font-bold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <Link className="text-gray-400 hover:text-white" href="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-white"
                  href="/privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white" href="/terms">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col max-w-52 mx-auto">
            <h4 className="text-lg font-bold mb-2">Contact Us</h4>
            <p>
              Email: <span className="text-gray-400">ctafsiras@gmail.com</span>
            </p>
            <p>
              Phone: <span className="text-gray-400">01983510532</span>
            </p>
            <p>
              Address:{" "}
              <span className="text-gray-400">Dhaka, 1216, Bangladesh</span>
            </p>
          </div>
          <div className="footer-social flex flex-col items-center mx-auto">
            <h4 className="text-lg font-bold mb-2">Follow Us</h4>
            <ul className="flex space-x-4">
              <li>
                <a
                  className="text-gray-400 hover:text-white"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
              </li>
              <li>
                <a
                  className="text-gray-400 hover:text-white"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter size={24} />
                </a>
              </li>
              <li>
                <a
                  className="text-gray-400 hover:text-white"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center mt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Baby Care Store. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
