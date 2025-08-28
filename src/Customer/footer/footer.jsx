import React from "react";
import { Link } from 'react-router-dom'

const Footer = ({ navlinks }) => {
  return (
    <div>
      <div className="nav">
        <ul>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/testimonials">Testimonials</Link>
          </li>
          <li>
            <Link to="/Contact">Testimonials</Link>
          </li>
        </ul>
      </div>
      <div className="insight">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit voluptates aut, sapiente, animi ad dolor neque bl
      </div>
    </div>
  );
};

export default Footer