import React, { useState } from "react";
import '../styles/loginRegisterStyle.css';

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordagain: "",
  });

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

    const { username, email, password, passwordagain } = formData;

    if (password !== passwordagain) {
      setMessage("Passwords do not match.");
      setMessageColor("red");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("User registered successfully!");
        setMessageColor("green");
      } else if (response.status === 409) {
        setMessage(result.message || "Username already exists.");
        setMessageColor("red");
      } else if (response.status === 410) {
        setMessage(result.message || "E-Mail-Address already exists.");
        setMessageColor("red");
      } else {
        setMessage(result.message || "Failed to register. Please try again.");
        setMessageColor("red");
      }
    } catch (error) {
      setMessage("Es gab einen Fehler: " + error.message);
      setMessageColor("red");
    }
  };

  return (
    <div className="container">
      <h1>Registrieren</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Benutzername</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />

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

        <label htmlFor="passwordagain">Passwort erneut eingeben</label>
        <input
          type="password"
          id="passwordagain"
          name="passwordagain"
          value={formData.passwordagain}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Registrieren</button>
      </form>
      <p id="message" style={{ color: messageColor }}>
        {message}
      </p>
    </div>
  );
}

export default Register;
