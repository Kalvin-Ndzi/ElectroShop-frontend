import React from "react";
import { Link } from "react-router-dom";

const AdminNavBar = () => {
  return (
    <nav className="bg-gray-900 text-white w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 py-4 text-base md:text-lg">
          <li>
            <Link
              to="/admin/products"
              className="actve hover:text-indigo-400 transition-colors duration-200"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/testimonials"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              to="/admin/messages"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Messages
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavBar;
