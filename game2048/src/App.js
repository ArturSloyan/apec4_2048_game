import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import HelloComponent from "./components/HelloComponent";

const App = () => (
  <div>
    <Navbar />
    <Routes>
      <Route path="*" element={<Home />}></Route>
      <Route path="/login" element={<HelloComponent />}></Route>
    </Routes>
  </div>
);

export default App;
