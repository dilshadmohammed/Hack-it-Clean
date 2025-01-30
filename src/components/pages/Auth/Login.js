import React, { useState } from "react";
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post("/api/user/auth/", {
        username:email,
        password,
      });

        console.log("Login Data:", response.data.response);
      if (response.data && response.data.response.accessToken) {
        await localStorage.setItem("accessToken", response.data.response.accessToken);
        console.log("Access token set in localStorage");
        onLogin();
        navigate("/");
      } else {
        setError("Login failed: Access token not received");
        console.error("Login Error: No Access token");
      }
    } catch (err) {
      if(err.response && err.response.status === 401){
          setError("Invalid email or password");
      } else {
          setError(err.response?.data?.message || "Login Failed, please try again");
          console.error("Login Error:", err);
      }
    }
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
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
}