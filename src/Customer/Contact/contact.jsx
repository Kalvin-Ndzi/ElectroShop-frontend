import React, { useState } from "react";
import CustomHeader from "../products/header";
import NavBar from "../Account/nav";
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");
const token = accessToken ? `Bearer ${accessToken}` : null;
const apiUrl = "https://electroshop-backend.onrender.com/api";


const Message = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/products/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert("Error: " + (data.error || "Failed to send message"));
        return;
      }

      alert("Message sent successfully!");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message");
    }
  };

  return (
    <>
      <CustomHeader />
      <NavBar />
      <form
        onSubmit={handleSubmit}
        className="ml-auto mr-auto mt-1 mb-2 bg-gray-900 p-4"
      >
        <label className="text-white">Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-white w-full h-32 mb-4 text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Message;
