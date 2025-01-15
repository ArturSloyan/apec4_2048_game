import React, { useState } from "react";
import '../styles/loginRegisterStyle.css';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
console.log("hi");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        setMessageColor("green");
        // Redirect or handle successful login logic here
      } else if (response.status === 401) {
        setMessage(result.message || "Invalid credentials. Please try again.");
        setMessageColor("red");
      } else {
        setMessage(result.message || "Failed to login. Please try again.");
        setMessageColor("red");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
      setMessageColor("red");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Passwort</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Login</button>
      </form>
      <p id="message" style={{ color: messageColor }}>
        {message}
      </p>
    </div>
  );
}

export default Login;
