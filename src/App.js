import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/Homepage/Homepage";
import Booking from "./components/pages/Booking/Booking";
import Auth from "./components/pages/Auth/Login";
import Status from "./components/pages/Status/Status";
import Types from "./components/pages/Types/Types";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/status" element={<Status />} />
            <Route path="/types" element={<Types />} />
          </Routes>
        <Footer />
      </Router>
    </div>
  );
}
