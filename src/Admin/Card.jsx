import React from "react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card text-black w-80 ">
      <img
        src={"http://localhost:8000" + product.image}
        alt={product.title}
        className="product-image"
      />
      <h4>{product.title}</h4>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <div className="product-actions">
        <button className="edit-btn" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(product.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
