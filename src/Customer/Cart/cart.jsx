import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import NavBar from "../Account/nav";
import CustomHeader from "../products/header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartItems = ({ toggleCart }) => {
  const [myCartItems, setMyCartItems] = useState([]);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const token = accessToken ? `Bearer ${accessToken}` : null;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/cart/cart/item/", {
          headers: {
            "content-type": "application/json",
            Authorization: token,
          },
        });
        const data = await res.json();
        setMyCartItems(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Something went wrong while loading products.");
      }
    };
    fetchCartItems();
  }, []);

  const deleteCartItem = async (itemId) => {
    try {
      const res = await fetch("http://localhost:8000/api/cart/cart/item/", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          item_id: itemId,
        }),
      });
      if (res.ok) {
        toast.warning("Product added to cart.");
        setMyCartItems(myCartItems.filter((item) => item.id !== itemId));
        console.log("Item Deleted Sucessfully");
      } else {
        console.log("Erro Deleting Item: ", res.status);
      }
    } catch (error) {
      console.error("Failed to delete  Item from cart");
    }
  };

const updateCartItem = async (item) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/cart/cart/item/${item.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          product: item.product.id,
          quantity: item.quantity,
        }),
      }
    );

    if (res.ok) {
      const updatedItem = await res.json();

      setMyCartItems((prev) =>
        prev.map((i) => (i.id === updatedItem.id ? updatedItem : i))
      );

      console.log("Item updated successfully");
    } else {
      console.error("Error updating item:", res.status);
    }
  } catch (error) {
    console.error("Failed to update item:", error);
  }
};
const placeOrder = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const token = accessToken ? `Bearer ${accessToken}` : null;

  try {
    const response = await fetch("http://localhost:8000/api/cart/from-cart/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.ok) {
      //something here
      setMyCartItems(myCartItems);
      toast.success("Product Orderd Sucess.");
      const data = await response.json();
      console.log("Order placed successfully!", data);
      // I will update state here to clear cart UI or show confirmation
    } else {
      console.error("Failed to place order:", response.status);
    }
  } catch (error) {
    console.error("Error placing order:", error);
  }
};


  return (
    <div>
      {/* <CustomHeader /> */}
      {/* <NavBar /> */}
      <h2>Cart Items</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="ml-16 mr-80">
        {myCartItems.map((item) => (
          <CartCard
            key={item.id}
            item={item}
            deleteCartItem={deleteCartItem}
            updateCartItem={updateCartItem}
          />
        ))}
        {myCartItems.length > 0 ? (
          <button onClick={() => {placeOrder(); toggleCart()}}>Order Items</button>
        ) : (
          <p className="text-black">You do not have any Items in Your Cart</p>
        )}
      </div>
    </div>
  );
};

export default CartItems;
