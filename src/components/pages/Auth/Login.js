import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}
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
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </form>
    </div>
  );
}