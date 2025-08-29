import React from "react";
const apiUrl = "https://electroshop-backend.onrender.com/api";
const ImageUrl = "https://electroshop-backend.onrender.com";

const ProductModal = ({
  product,
  handleCloseModal,
  handleAddToCart,
  isProductInCart,
  isOpen,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "bg-black bg-opacity-60" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`bg-white w-full max-w-md max-h-md mx-4 p-6 rounded-sm shadow-xl transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <img
          src={ImageUrl + product.image}
          alt="Product_Image"
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-lg text-indigo-600 font-bold mb-4">
          ${product.price}
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
          >
            Close
          </button>
          {!isProductInCart && (
            <button
              onClick={() => {
                handleAddToCart(product);
                handleCloseModal();
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
            >
              Add to Cart
            </button>
          )}
          {isProductInCart && (
            <span className="text-green-600 font-medium self-center">
              Already in cart
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
