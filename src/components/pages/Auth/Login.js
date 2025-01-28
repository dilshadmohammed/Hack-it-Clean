import React from "react"

export default function Login() {
  return (
    <div class="login-container">
      <div class="login-box">
          <h1>Login</h1>
              <label for="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />

              <label for="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" required />

              <button type="submit">Login</button>
          <p>Don't have an account? <a href="#">Sign up</a></p>
      </div>
    </div>
  );
}
