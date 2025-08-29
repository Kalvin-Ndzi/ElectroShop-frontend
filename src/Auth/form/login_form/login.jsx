import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../signup_form/form.css";
const apiUrl = "https://electroshop-backend.onrender.com/api";
const LOGIN_URL = `${apiUrl}/users/login/`;

const LoginForm = ({ handleCloseModal }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || !data.access || !data.refresh || !data.role) {
        setError(data.error || "Login failed");
        return;
      }

      // Store tokens and role
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("userRole", data.role);

      // close modal if used in one
      if (handleCloseModal) handleCloseModal();

      // Redirect based on role
      if (data.role === "admin") {
        navigate("/admin/products", { replace: true });
      } else {
        navigate("/home/products", { replace: true });
      }
    } catch (err) {
      setLoading(false);
      setError("Login error. Please try again.");
      console.error("Login Error", err);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex items-center justify-center p-4 md:p-8">
      <div className="bg-gray-900 p-4 md:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto relative">
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-white hover:text-gray-300"
        >
          X
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            required
            className="w-full p-2 md:p-3 rounded bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            required
            className="w-full p-2 md:p-3 rounded bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 md:p-3 bg-blue-500 hover:bg-blue-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && (
          <p className="mt-4 text-red-500 text-sm text-center form-message error">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
