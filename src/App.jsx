import "./App.css";
import Navbar from "./components/Navbar";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
