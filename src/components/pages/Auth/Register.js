import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/api";
import toast from "react-hot-toast";

export default function Register({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.promise(
        axiosInstance.post("/api/user/register/", {
          username: email,
          password,
        })
        .then((response) => {
          if (response.data && response.data.message) {
            Promise.resolve();
            navigate("/login");
          } else {
            console.error("Login Error: No Access token");
          }
        })
        .catch((err) => {
          let errorMessage = "Login Failed, please try again";
      
          if (err.response) {
            if (err.response.status === 401) {
              errorMessage = "Invalid email or password";
            } else {
              errorMessage = err.response.data?.message || "Login Failed, please try again";
            }
          }
          
          console.error("Login Error:", err);
          return Promise.reject(new Error(errorMessage)); // Reject for toast error message
        }),
        {
          pending: "Registering new user...",
          success: "Registration successful!",
          error: (err) => err.message, // Dynamic error message
        }
      );
      
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="cpassword">Confirm password</label>
        <input                                              //confirm password
          type="password"
          id="cpassword"
          name="cpassword"
          placeholder="Enter your password"
          required
          value={cpassword}
          onChange={(e) => setCPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        <p>
          Already hav an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}