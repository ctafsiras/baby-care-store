import Image from "next/image";
import React from "react";
import Logo from "@/assets/Baby-Care-Store-Logo.png";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center mb-4">
            <Image src={Logo} alt="Logo" width={64} height={64} />
            <h1 className="text-2xl font-bold">Baby Care Store</h1>
            <p className="text-gray-400 max-w-52 text-center">
              Premier online destination for top-quality baby care products
            </p>
          </div>
          <div className="footer-links flex flex-col">
            <h4 className="text-lg font-bold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <a className="text-gray-400 hover:text-white" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white" href="#">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-contact flex flex-col">
            <h4 className="text-lg font-bold mb-2">Contact Us</h4>
            <p>
              Email:{" "}
              <span className="text-gray-400">
                support@baby-care-store.vercel.app
              </span>
            </p>
            <p>
              Phone: <span className="text-gray-400">(123) 456-7890</span>
            </p>
            <p>
              Address:{" "}
              <span className="text-gray-400">Dhaka, 1216, Bangladesh</span>
            </p>
          </div>
          <div className="footer-social flex flex-col items-center">
            <h4 className="text-lg font-bold mb-2">Follow Us</h4>
            <ul className="space-y-2">
              <li>
                <a
                  className="text-gray-400 hover:text-white"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="text-gray-400 hover:text-white"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  className="text-gray-400 hover:text-white"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
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
