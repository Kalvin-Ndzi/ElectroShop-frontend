import React, { useState } from "react";

const Testimonial = ({ addTestimonial, handleCloseModal }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const testimonialData = {
      message,
    };
    addTestimonial(testimonialData);
    handleCloseModal();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white">
        <label className="block mb-2 text-black">Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
        />
        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCloseModal}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Testimonial;
