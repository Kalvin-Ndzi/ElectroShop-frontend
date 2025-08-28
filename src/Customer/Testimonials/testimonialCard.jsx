import React from "react";
import "./testimonialCard.css"; 

const TestimonialCard = ({ testimonial }) => {

  return (
    <div className="testimonial-card w-72">
      <h3 className="text-4xl font-bold">{testimonial.customer.username || "Anonymous"}</h3>
      <p className="comment">
        "{testimonial.message || "No message provided."}"
      </p>
    </div>
  );
};

export default TestimonialCard;
