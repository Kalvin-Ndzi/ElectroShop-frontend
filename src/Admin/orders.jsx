import React, { useEffect, useState } from "react";
import OrderCard from "../Customer/Orders/orderCard";
import AdminNavBar from "./adminNa";
const apiUrl = "https://electroshop-backend.onrender.com/api";

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${apiUrl}/orders/all_orders/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
        setFilteredOrders(data);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders by ID or customer (if email/name is available)
  useEffect(() => {
    if (!searchTerm) {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          String(order.id).includes(searchTerm) ||
          (order.customer_email &&
            order.customer_email
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  return (
    <div className="admin-orders-container p-4 ">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-1 grid-cols-2">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;
