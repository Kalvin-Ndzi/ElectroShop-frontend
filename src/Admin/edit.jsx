import React, { useState, useEffect } from "react";
import "./styles.css";

const EditProductModal = ({ product, onClose, onSuccess }) => {
  const [title, setTitle] = useState(product.title || "");
  const [price, setPrice] = useState(product.price || "");
  const [description, setDescription] = useState(product.description || "");
  const [image, setImage] = useState(product.image || "");
  const accessToken = localStorage.getItem("accessToken");
  const product_id = product.id

  useEffect(() => {
    setTitle(product.title || "");
    setPrice(product.price || "");
    setDescription(product.description || "");
    setImage(product.image || "");
  }, [product]);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", parseFloat(price));
    formData.append("description", description);

    // Only append the image if it's a File (not just a string path)
    if (image instanceof File) {
      formData.append("image", image);
    }

    const res = await fetch(
      `http://127.0.0.1:8000/api/products/${product.id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Don't manually set Content-Type for FormData
        },
        body: formData,
      }
    );

    if (res.ok) {
      onSuccess();
    } else {
      const errData = await res.json();
      console.error(errData);
      alert("Failed to update product.");
    }
  } catch (err) {
    console.error(err);
    alert("Error updating product.");
  }
};


  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Edit Product</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              step="0.01"
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Image URL:
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
