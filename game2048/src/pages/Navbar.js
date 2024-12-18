import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/gamepage">Game 2048</NavLink>
          </li>
          <li>
            {/* TODO: no login page -> See App.js Route */}
            <NavLink>Login</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
