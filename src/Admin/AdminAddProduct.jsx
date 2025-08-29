import React, { useState } from "react";
import "./adminModal.css";

const apiUrl = "https://electroshop-backend.onrender.com/api";

const AdminAddProduct = ({ onSuccess }) => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProductData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setProductData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("description", productData.description);

      // Convert price safely
      const priceValue = parseFloat(productData.price);
      if (isNaN(priceValue)) {
        setError("Price must be a valid number.");
        return;
      }
      formData.append("price", priceValue);

      // Only append image if it's a File (avoids bugs on edit or preloaded image)
      if (productData.image instanceof File) {
        formData.append("image", productData.image);
      } else {
        setError("Please select a valid image file.");
        return;
      }

      const res = await fetch(`${apiUrl}/products/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // I Learnt not to set Content-Type manually — let the browser handle it
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create product.");
      } else {
        setSuccess("Product created successfully!");
        setProductData({
          title: "",
          description: "",
          price: "",
          image: null,
        });

        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error("Create product error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add New Product</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={productData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <button type="submit">Create</button>
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
