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
import Register from "./components/pages/Auth/Register";

export default function App() {

  return (
    <div className="app">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={<Home />} />
            <Route
              path="/booking"
              element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/status"
              element={
                <ProtectedRoute>
                  <Status />
                </ProtectedRoute>
              }
            />
            <Route
              path="/types"
              element={
                <ProtectedRoute>
                  <Types />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}