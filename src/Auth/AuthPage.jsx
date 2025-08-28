import React, { useState, useEffect } from "react";
import SignupForm from "./form/signup_form/form";
import LoginForm from "./form/login_form/login";

import "../Auth/home.css";

const AuthPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [role, setRole] = useState("");

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow =
      showLoginModal || showSignupModal ? "hidden" : "auto";
  }, [showLoginModal, showSignupModal]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleCloseModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="content">
      <div className="admin-auth">
        <button
          onClick={() => {
            setRole("admin");
            setShowSignupModal(true);
          }}
        >
          Register as Admin
        </button>
      </div>

      <div>
        <h1>Welcome To ElectroShop</h1>
        <p className="hero">
          Sign up to shop great electronic devices to boost your productivity
        </p>
      </div>

      <div>
        <button
          onClick={() => {
            setRole("buyer");
            setShowSignupModal(true);
          }}
        >
          Sign Up as Buyer
        </button>
      </div>

      <div className="login">
        <span>
          Already have an account?
          <span className="login-link">
            <button onClick={() => setShowLoginModal(true)}>Login</button>{" "}
            instead
          </span>
        </span>
      </div>

      {(showLoginModal || showSignupModal) && (
        <div className="modal-overlay">
          <div role="dialog" aria-modal="true">
            {showLoginModal && (
              <LoginForm handleCloseModal={handleCloseModal} />
            )}
            {showSignupModal && (
              <SignupForm role={role} handleCloseModal={handleCloseModal} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
