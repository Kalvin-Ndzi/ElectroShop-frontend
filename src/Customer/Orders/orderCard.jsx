// import React, { useState } from "react";
// import UserSelect from "autoprefixer/lib/hacks/user-select";

const OrderCard = ({ order }) => {

  return (
    <div className="bg-gray-900 text-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-200 w-1/2">
      <table className="w-full text-left text-sm">
        <tbody>
          <tr className="border-b border-gray-700">
            <th className="py-2 pr-4 text-indigo-400">Order ID</th>
            <td className="py-2">{order.id}</td>
          </tr>
          <tr className="border-b border-gray-700">
            <th className="py-2 pr-4 text-indigo-400">Total</th>
            <td className="py-2">
              {typeof order.total === "number"
                ? `$${order.total.toFixed(2)}`
                : "N/A"}
            </td>
          </tr>
          <tr className="border-b border-gray-700">
            <th className="py-2 pr-4 text-indigo-400">Status</th>
            <td className="py-2">{order.status || "Pending"}</td>
          </tr>
          <tr>
            <th className="py-2 pr-4 text-indigo-400">Date Ordered</th>
            <td className="py-2">
              {order.created_at
                ? new Date(order.order_date).toLocaleDateString()
                : "N/A"}
            </td>
          </tr>
        </tbody>
      </table>

      {/* ordered items */}
      {order.items && order.items.length > 0 && (
        <div className="mt-4">
          <h4 className="text-indigo-300 font-semibold mb-1">Items:</h4>
          <ul className="list-disc list-inside text-sm text-gray-300">
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.product_name} &times; {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
