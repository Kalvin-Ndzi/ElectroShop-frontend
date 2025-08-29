import React, { useState } from "react";
import "./form.css";
import { useNavigate } from "react-router-dom";

const apiUrl = "https://electroshop-backend.onrender.com/api";

const SignupForm = ({ handleCloseModal, role }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/users/register/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setMessage(data.error || "Signup failed");
        return;
      }

      setMessage("Signup successful!");
      setTimeout(() => {
        handleCloseModal();
        navigate(role === "admin" ? "/admin-dashboard" : "/products");
      }, 1500);
    } catch (error) {
      setLoading(false);
      setMessage("Registration failed. Please try again.");
      console.error("Registration Failed", error);
    }
  };

  return (
    <div className="inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div className="bg-gray-900 text-blue-400 p-8 rounded-lg shadow-lg ">
        <button onClick={handleCloseModal}>X</button>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Signup as {role}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-white text-blue-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-white text-blue-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-white text-blue-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Processing..." : "Signup"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-blue-400 text-sm text-center form-message">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
