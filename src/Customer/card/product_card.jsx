import React, { useState } from "react";
import ProductModal from "./product_modal";

const apiUrl = "https://electroshop-backend.onrender.com/api";
const ImageUrl = "https://electroshop-backend.onrender.com";

const ProductCard = ({
  product,
  handleAddToCart,
  MyCartItems,
  userrole,
  handleDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleViewDetails = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 10);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  const isProductInCart = MyCartItems?.some((item) => item.id === product.id);

  return (
    <div className="w-64 h-96 bg-white text-black font-bold mt-8 rounded-md p-3 shadow-md flex flex-col justify-between">
      <img
        src={"https://electroshop-backend.onrender.com" + product.image}
        alt="Product_Image"
        className="rounded-md h-28 w-full object-cover"
      />
      <div>
        <h2 className="text-lg mt-2 mb-2">{product.title}</h2>
        <p className="line-clamp-2 p-1 w-full text-sm text-gray-700">
          {product.description}
        </p>
        <p className="text-white bg-[#2F15F5] mt-1 p-1 w-20 flex rounded-3xl items-center justify-center text-sm">
          ${product.price}
        </p>
      </div>

      {userrole === "buyer" ? (
        <div>
          <button
            onClick={handleViewDetails}
            className="bg-[#03000F] hover:bg-indigo-700 text-white px-1 py-1 mt-2 rounded w-full transition"
          >
            View Details
          </button>
          <button
            onClick={() => {
              handleAddToCart(product);
            }}
            className="bg-[#03000F] hover:bg-indigo-700 text-white px-1 py-1 mt-2 rounded w-full transition"
          >
            Add To Cart
          </button>
          {isModalOpen && (
            <ProductModal
              product={product}
              handleCloseModal={handleCloseModal}
              handleAddToCart={handleAddToCart}
              isProductInCart={isProductInCart}
              isOpen={isOpen}
            />
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={() => handleDelete}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 mt-2 rounded w-full transition"
          >
            Delete Product
          </button>
          {isModalOpen && (
            <ProductModal
              product={product}
              handleCloseModal={handleCloseModal}
              handleAddToCart={handleAddToCart}
              isProductInCart={isProductInCart}
              isOpen={isOpen}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
