import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./Auth/AuthPage";
import LoginForm from "./Auth/form/login_form/login";
import Home from "./Customer/Home";
import AdminHome from "./Admin/AdminHome";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");
  const isAuthenticated = !!accessToken;

  return (
    <>
      {" "}
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AuthPage />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Protected Customer Routes */}
          <Route
            path="/home/*"
            element={
              isAuthenticated && userRole === "buyer" ? (
                <Home />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              isAuthenticated && userRole === "admin" ? (
                <AdminHome />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <ToastContainer position="bottom-right" autoClose={5000} theme="dark" />
    </>
  );
};

export default App;
