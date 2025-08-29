import React, { useEffect, useState } from "react";
import TestimonialCard from "./testimonialCard";
import Testimonial from "./addTestimonialForm";
import NavBar from "../Account/nav";
import CustomHeader from "../products/header";
const apiUrl = "https://electroshop-backend.onrender.com/api";

const Testimonials = ({handleLogout}) => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [addTestimonialModal, setAddTestimonialModal] = useState(false);
  const [filterdTestimonials, setFilteredTestimonials] = useState([])

  const accessToken = localStorage.getItem("accessToken");
  const token = accessToken ? `Bearer ${accessToken}` : null;

  // Fetch products on mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${apiUrl}/products/reviews/`, {
          headers: {
            "content-type": "application/json",
            Authorization: token,
          },
        });
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setError("Something went wrong while loading testimonials.");
      }
    };

    fetchTestimonials();
  }, []);

  const addTestimonial = async (testimonialData) => {
    try {
      const res = await fetch(`${apiUrl}/products/reviews/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(testimonialData),
      });

      if (res.ok) {
        console.log("Testimonial Added Safely");
      } else {
        console.error("Error Adding testimonial", res.status);
      }
    } catch (error) {
      console.error("Error Adding Testimonial:", error);
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilteredTestimonials(testimonials);
    } else {
      const filtered = testimonials.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTestimonials(filtered);
    }
  }, [searchTerm, testimonials]);

  const handleAddTestimonial = () => {
    setAddTestimonialModal(true);
  };

  const handleCloseModal = () => {
    setAddTestimonialModal(false);
  };

  return (
    <div className="products-page">
      <CustomHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} onLogout={handleLogout}/>
      <NavBar />
      <h1>What People Say about us</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="product-grid flex flex-wrap">
        {filterdTestimonials?.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
      <button onClick={handleAddTestimonial}>Add Review</button>
      {addTestimonialModal && (
        <Testimonial
          addTestimonial={addTestimonial}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Testimonials;
