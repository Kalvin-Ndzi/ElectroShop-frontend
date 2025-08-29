import React, { useEffect, useState } from "react";
import TestimonialCard from "../Customer/Testimonials/testimonialCard";
const apiUrl = "https://electroshop-backend.onrender.com/api";

const AdminTestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${apiUrl}/products/reviews/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      if (Array.isArray(data)) {
        setTestimonials(data);
        setFilteredTestimonials(data);
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredTestimonials(testimonials);
    } else {
      const filtered = testimonials.filter((t) =>
        t.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTestimonials(filtered);
    }
  }, [searchTerm, testimonials]);

  return (
    <div className="admin-testimonials-container p-4">
      <h2 className="text-2xl font-bold mb-4">All Testimonials</h2>
      {filteredTestimonials.length === 0 ? (
        <p>No testimonials found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-3">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTestimonialPage;
