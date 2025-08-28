import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../signup_form/form.css";

const LOGIN_URL = "http://127.0.0.1:8000/api/users/login/";

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
    <div className="inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="border-2 bg-gray-900 text-blue-400 p-8 rounded-lg shadow-lg">
        <button onClick={handleCloseModal}>X</button>
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            required
            className="w-2/4 p-3 rounded bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            required
            className="w-36 p-3 rounded bg-white text-blue-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-white hover:bg-blue-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
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
