// import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./Account/nav";
import Products from "./products/products";
import Orders from "./Orders/orders";
import Testimonials from "./Testimonials/testimonials";
import Contact from "./Contact/contact";
import CartItems from "./Cart/cart";
import CustomHeader from "./products/header";

const Home = () => {
  const userRole = localStorage.getItem("userRole");
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="my-app bg-white">
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home/products" />} />
          <Route
            path="products"
            element={<Products userRole={userRole} handleLogout={handleLogout}/>}
          />
          <Route
            path="orders"
            element={
              userRole === "buyer" ? (
                <Orders />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route path="testimonials" element={<Testimonials handleLogout={handleLogout}/>} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<CartItems />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
