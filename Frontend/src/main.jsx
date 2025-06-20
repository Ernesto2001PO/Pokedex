import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";

// pages
import Login from "./pages/Login"
import Home from "./pages/Home";
import Register from "./pages/Register";
import CrearEquipo from "./pages/CrearEquipo";
import AgregarPokemones from "./pages/AgregarPokemones";

// Pages Operaciones

// admin components



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/crearEquipo" element={<CrearEquipo />} />
        <Route path="/team/:id" element={<AgregarPokemones />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
