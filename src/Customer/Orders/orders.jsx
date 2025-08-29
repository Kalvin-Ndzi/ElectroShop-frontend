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

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Date Ordered
              </th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">${order.total}</td>
                <td className="px-6 py-4 capitalize">{order.status}</td>
                <td className="px-6 py-4">
                  {new Date(order.order_date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading ? <p>Loading Products.....</p> : ""}
    </div>
  );
};

export default Orders;
