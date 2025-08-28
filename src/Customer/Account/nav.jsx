import React from "react";
import { Link } from "react-router-dom";
import './actie.css'

const NavBar = () => {
  return (
    <nav className="bg-gray-900 text-white w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 py-4 text-base md:text-lg">
          <li>
            <Link
              to="/home/products"
              className="actve hover:text-indigo-400 transition-colors duration-200"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/home/orders"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/home/testimonials"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              to="/home/contact"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/home/cart"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
