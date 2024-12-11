import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";

const App = () => (
  <div>
    <Navbar />
    <Routes>
      <Route path="*" element={<Home />}></Route>
      <Route path="/gamepage" element={<GamePage />}></Route>
    </Routes>
  </div>
);

export default App;
