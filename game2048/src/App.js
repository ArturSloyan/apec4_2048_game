import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import Register from "./pages/Register";

const App = () => (
  <div>
    <Navbar />
    <Routes>
      <Route path="*" element={<Home />}></Route>
      <Route path="/gamepage" element={<GamePage />}></Route>
      <Route path="/register" element={ <Register/>} ></Route>
    </Routes>
  </div>
);

export default App;