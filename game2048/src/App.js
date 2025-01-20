import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load username from localStorage and only set if it's not null/undefined
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (name) => {
    if (name) {
      localStorage.setItem("username", name);
      setUsername(name);
      navigate('/'); // Redirect to home page after successful login
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  return (
    <div>
      <Navbar username={username} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gamepage" element={<GamePage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
      </Routes>
    </div>
  );
}

export default App;