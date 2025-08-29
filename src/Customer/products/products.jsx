import React, { useEffect, useState } from "react";
import CustomHeader from "./header";
import ProductCard from "../card/product_card";
import NavBar from "../Account/nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = "https://electroshop-backend.onrender.com/api";

const Products = ({ userRole = "buyer" }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const token = accessToken ? `Bearer ${accessToken}` : null;

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/products`, {
          headers: {
            "content-type": "application/json",
            Authorization: token,
          },
        });

        if (!res.ok) throw new Error(`HTTP error ${res.status}`);

        const data = await res.json();
        setProducts(data);
        setLoading(false);
        setFilteredProducts(data);
      } catch (err) {
        setLoading(false);
        console.error("Failed to fetch products:", err);
        setError("Something went wrong while loading products.");
      }
    };

    if (token) fetchProducts();
  }, [token]);

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch(`${apiUrl}/cart/`, {
          headers: {
            "content-type": "application/json",
            Authorization: token,
          },
        });
        const data = await res.json();
        setCart(data);
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
        setError("Something went wrong while loading cart items.");
      }
    };

    if (token) fetchCartItems();
  }, [token]);

  // Filter products based on searchTerm
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

  const handleAddToCart = (product) => {
    const postProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/cart/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ product: product.id }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to add product to cart.");
        }

        // Optionally refresh cart or show success message here
        toast.success("Product added to cart.");
      } catch (error) {
        console.error("Add to cart error:", error.message);
        setError(error.message || "Failed to add product to cart.");
      } finally {
        console.log("hello world");
      }
    };

    postProduct();
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("i am running");
    try {
      await fetch(`${apiUrl}/logout/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.clear();
    window.location.href = "/";
  };
  console.log(cart);
  console.log(refreshToken);
  return (
    <div className="products-page p-4 md:p-8">
      {/* Custom header with search and logout */}
      <CustomHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onLogout={handleLogout}
      />
      <NavBar />
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Available Products
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            userrole={userRole}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
      {loading ? <p>Loading Products.....</p> : ""}
    </div>
  );
};

export default Products;
