import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartItems from "../Cart/cart";

const CustomHeader = ({ searchTerm, setSearchTerm, onLogout }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Shop Name */}
        <div className="text-2xl font-bold text-gray-800">ElectroShop</div>

        {/* Center: Search Bar */}
        <div className="w-full md:w-1/2">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            className="text-gray-700 hover:text-indigo-500 transition-colors duration-200 text-xl"
            onClick={toggleCart}
          >
            <FaShoppingCart />
          </button>

          {/* Account/Logout Button */}
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {isCartOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "1050px",
            height: "60vh",
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "-2px 0px 5px rgba(0,0,0,0.1)",
            overflowY: "auto",
          }}
        >
          <CartItems />
          <button onClick={toggleCart}>Close</button>
        </div>
      )}
    </header>
  );
};

export default CustomHeader;
