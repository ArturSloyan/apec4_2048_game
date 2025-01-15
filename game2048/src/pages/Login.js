import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import '../styles/loginRegisterStyle.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");

  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("username", result.username); // Save username to localStorage
        onLogin(result.username); // Notify parent of successful login
        navigate("/"); // Redirect to homepage
        
        // Reload the page to reflect changes immediately
        window.location.reload();
      }
      else {
        setMessage(result.message || "Login failed.");
        setMessageColor("red");
      }
      console.log(localStorage.username);
    } catch (error) {
      setMessage("Error: " + error.message);
      setMessageColor("red");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
