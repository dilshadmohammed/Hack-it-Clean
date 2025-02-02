import React, { useState } from "react";
import './Register.css'
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/api";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.promise(
      new Promise((resolve, reject) => {
        if (password === cpassword) {
          axiosInstance.post("/api/user/register/", {
            username: email,
            password,
          })
          .then((response) => {
            if (response.data && response.data.message) {
              navigate("/login");
              resolve();  // Resolve the promise for success toast
            } else {
              reject(new Error("Registration Error: No confirmation message received"));
            }
          })
          .catch((err) => {
            let errorMessage = "Registration Failed, please try again";
    
            if (err.response) {
              if (err.response.status === 401) {
                errorMessage = "Invalid email or password";
              } else {
                errorMessage = err.response.data?.message || errorMessage;
              }
            }
    
            console.error("Registration Error:", err);
            reject(new Error(errorMessage));  // Reject with proper error
          });
        } else {
          reject(new Error("Confirm password should match"));  // Password mismatch
        }
      }),
      {
        pending: "Registering new user...",
        success: "Registration successful!",
        error: (err) => err.message,  // Dynamic error message
      }
    );
      
  };

  return (
    <div className="Register">
      <form className="register-box" onSubmit={handleSubmit}>
        <h1>SIGN UP</h1>
        <div className="line"></div>
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
        <div className="input-container">
          <label htmlFor="cpassword">Confirm password</label>
          <input                                             
            type="password"
            id="cpassword"
            name="cpassword"
            placeholder="Enter your password"
            required
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
        </div>
        <button className="submit" type="submit">Sign Up</button>
        <div className="button-active"></div>
        <p>
          Already hav an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}