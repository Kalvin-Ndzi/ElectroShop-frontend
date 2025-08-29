import React, { useEffect, useState } from "react";
import NavBar from "../Account/nav";
import CustomHeader from "../products/header";
import handleLogout from "./logout";
import useSearch from "../products/useSearch";
const apiUrl = "https://electroshop-backend.onrender.com/api"; 

const Orders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [error, setError] = useState(null);
  const { searchTerm, setSearchTerm } = useSearch();
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const token = accessToken ? `Bearer ${accessToken}` : null;

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${apiUrl}/orders/myorders/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const data = await res.json();
        setMyOrders(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Failed to fetch orders:", err);
        setError("Something went wrong while loading Orders.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <CustomHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onLogout={handleLogout}
      />
      <NavBar />
      <div className="bg-[#2F15F5] rounded-lg shadow-md p-4 w-40 md:w-1/2 lg:w-1/3 xl:w-1/4 mt-4 mb-4 ml-32">
        <h3 className="text-lg font-bold text-white">Total Orders</h3>
        <p className="text-3xl font-bold  text-white">{myOrders.length}</p>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto shadow flex flex-col ml-32 mr-32 align-middle">
        <table className=" bg-white">
          <thead className=" bg-[#03000F] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date Ordered</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {myOrders.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              myOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-gray-200 hover:bg-gray-100 transition flex"
                >
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">${order.total}</td>
                  <td className="px-4 py-3 capitalize">{order.status}</td>
                  <td className="px-4 py-3">
                    {new Date(order.order_date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {loading ? <p>Loading Products.....</p> : ""}
    </div>
  );
};

export default Orders;
