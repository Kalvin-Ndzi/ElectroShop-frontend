import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminNavBar from "./adminNa";
import AdminProductPage from "./products";
import AdminOrderPage from "./orders";
import AdminTestimonialPage from "./AdminTest";
import Contact from "../Customer/Contact/contact";
import CartItems from "../Customer/Cart/cart";
import CustomHeader from "../Customer/products/header";
import AdminMessagePage from "./messages";

const AdminHome = () => {
  const userRole = localStorage.getItem("userRole");
  const [searchTerm, setSearchTerm] = useState("");

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
    <div>
      <CustomHeader />
      <AdminNavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/admin/products" />} />
        <Route
          path="products"
          element={<AdminProductPage searchTerm={searchTerm} />}
        />
        <Route path="orders" element={<AdminOrderPage />} />
        <Route path="testimonials" element={<AdminTestimonialPage />} />
        <Route path="messages" element={<AdminMessagePage />} />
        <Route path="cart" element={<CartItems />} />
      </Routes>
    </div>
  );
};

export default AdminHome;
