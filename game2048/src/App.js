import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate here
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Load username from localStorage (if logged in previously)
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login"); // Redirect to login page after logout
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
          element={<Login onLogin={(name) => setUsername(name)} />}
        />
      </Routes>
    </div>
  );
}

export default App;
