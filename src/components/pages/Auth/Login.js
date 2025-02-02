import React, { useState } from "react";
import './Login.css'
import { Link} from "react-router-dom";
import axiosInstance from "../../../utils/api";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
  
    // Use toast.promise to wrap the login process
    toast.promise(
      axiosInstance.post("/api/user/auth/", {
        username: email,
        password,
      }),
      {
        pending: "Logging in...",
        success: "Login successful! Redirecting...",
        error: (err) => {
          // Handle specific error based on the response status
          if (err.response && err.response.status === 401) {
            return "Invalid email or password";
          }
          return err.response?.data?.message || "Login failed, please try again";
        },
      }
    )
    .then((response) => {
      if (response.data && response.data.response.accessToken) {
        localStorage.setItem("accessToken", response.data.response.accessToken);
        console.log("Access token set in localStorage");
        window.location.href = '/';
      } else {
        setError("Login failed: Access token not received");
        console.error("Login Error: No Access token");
      }
    })
    .catch((err) => {
      console.error("Login Error:", err);
      setError("An error occurred during login.");
    });
  };

  return (
    <div className="Login">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <div className="line"></div>
        {error && <div className="error-message">{error}</div>}
        <div className="input-container">
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
        </div>
        <div className="input-container">
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
        </div>
        <button className="submit" type="submit">Login</button>
        <div className="button-active"></div>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}