import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/Homepage/Homepage";
import Booking from "./components/pages/Booking/Booking";
import Status from "./components/pages/Status/Status";
import Types from "./components/pages/Types/Types";
import Footer from "./components/Footer/Footer";
import Login from "./components/pages/Auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Initial token:", token);
    setIsAuthenticated(!!token);
    console.log("Initial isAuthenticated:", !!token); // Log the value of isAuthenticated
  }, []);

  return (
    <div className="app">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/booking"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/status"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Status />
              </ProtectedRoute>
            }
          />
          <Route
            path="/types"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Types />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}