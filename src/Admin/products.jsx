import React, { useEffect, useState } from "react";
import AdminAddProduct from "./AdminAddProduct";
import ProductCard from "./Card";
import EditProductModal from "./edit";
import CustomHeader from "../Customer/products/header";
// import ProductCard from "../Customer/card/product_card";
const apiUrl = "https://electroshop-backend.onrender.com/api";

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}/products/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data); // Initially show all
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  // Filter products when searchTerm changes
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const toggleAddModal = () => setShowAddModal((prev) => !prev);
  const toggleEditModal = () => setShowEditModal((prev) => !prev);

  const handleProductCreated = () => {
    toggleAddModal();
    setRefresh((prev) => !prev); // reload product list
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const res = await fetch(`${apiUrl}/products/${productId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        setRefresh((prev) => !prev);
      } else {
        alert("Failed to delete product.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting product.");
    }
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
    setRefresh((prev) => !prev);
  };

  const handleLogout = async () => {
    if (!refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.reload();
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/users/logout/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (res.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.reload();
      } else {
        const data = await res.json();
        alert(data.error || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed, please try again.");
    }
  };

  return (
    <div className="admin-products-container">
      <button onClick={toggleAddModal} className="add-product-btn">
        {showAddModal ? "Close" : "Add Product"}
      </button>

      {showAddModal && <AdminAddProduct onSuccess={handleProductCreated} />}

      {showEditModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={toggleEditModal}
          onSuccess={handleEditSuccess}
        />
      )}

      <div className="flex gap-48 flex-wrap">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              userrole="admin"
              handleDelete={handleDeleteClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminProductPage;
