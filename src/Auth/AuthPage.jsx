import React, { useState, useEffect } from "react";
import SignupForm from "./form/signup_form/form";
import LoginForm from "./form/login_form/login";

// import "../Auth/home.css";

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
    <div className="content mx-auto p-4 md:p-8 max-w-4xl">
      <div className="admin-auth mb-4">
        <button
          onClick={() => {
            setRole("admin");
            setShowSignupModal(true);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register as Admin
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold">
          Welcome To ElectroShop
        </h1>
        <p className="hero text-lg md:text-xl">
          Sign up to shop great electronic devices to boost your productivity
        </p>
      </div>

      <div className="mb-4">
        <button
          onClick={() => {
            setRole("buyer");
            setShowSignupModal(true);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up as Buyer
        </button>
      </div>

      <div className="login text-center">
        <span>
          Already have an account?
          <span className="login-link text-blue-500 hover:text-blue-700 cursor-pointer">
            <button onClick={() => setShowLoginModal(true)}>Login</button>{" "}
            instead
          </span>
        </span>
      </div>

      {(showLoginModal || showSignupModal) && (
        <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex items-center justify-center p-4 md:p-8">
          <div
            role="dialog"
            aria-modal="true"
            className="bg-gray-900 p-4 md:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto"
          >
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
