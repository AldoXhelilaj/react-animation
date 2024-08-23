import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "./components/Header";
import { Router, Routes, Route } from "react-router-dom";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import ServiceDetail from "./pages/ServiceDetail";

function App() {
  return (
    <>
        <Header />
        <Routes>
          <Route path="/" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
        </Routes>
      <footer className="bg-primary-red text-secondary-gray  font-[600] p-4 text-center">
        <p>© 2023 Crispy Bacon. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
