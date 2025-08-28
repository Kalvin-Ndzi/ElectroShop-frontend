import React, { useState } from "react";

const CartCard = ({ item, deleteCartItem, updateCartItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-center">
        <img
          src={"http://localhost:8000" + item.product.image}
          alt="Product_Image"
          className="h-16 w-16 object-cover mr-4"
        />
        <div>
          <h2 className="text-lg font-bold text-black">{item.product.title}</h2>
          <p className="text-sm text-gray-600">{item.product.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-40 gap-4">
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-12 border text-center text-black"
        />
        <p className="text-lg font-bold text-blue-900">${item.product.price}</p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => deleteCartItem(item.id)}
        >
          Remove
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => updateCartItem({ ...item, quantity })}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default CartCard;
