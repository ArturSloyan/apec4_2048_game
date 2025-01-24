import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ username, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/gamepage">Game Page</Link>
      </div>
      {!username ? (
        <div className="auth-links">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      ) : (
        <div className="username-container">
          <span>{username}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
