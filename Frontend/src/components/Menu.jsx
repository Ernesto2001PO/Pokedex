import React from "react";


import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useAuth } from "./../../hook/useAuth";
import Button from "react-bootstrap/Button";

function Menu() {
  const { isAuthenticated, logout } = useAuth(false);
  const nombre = localStorage.getItem("nombre");

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/">Proyecto</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-Navbar-nav" />
        <Navbar.Collapse id="basic-Navbar-nav">
          <Nav className="me-auto">
            <>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </>
            <NavLink to="/" className="nav-link">
              {nombre ? `Hola, ${nombre}` : "Bienvenido"}
            </NavLink>
            {location.pathname !== "/admin" && localStorage.getItem("es_admin") === "true" && (
              <NavLink to="/admin" className="nav-link">
                Admin
              </NavLink>
            )}

            <>
              {!isAuthenticated && location.pathname !== "/" && location.pathname !== "/register" && (
                <>
                  <NavLink to="/" className="nav-link">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </>
              )}
            </>

            <>
              {isAuthenticated && (
                <>
                  <Button variant="link" onClick={logout}>
                    Cerrar Sesión
                  </Button>
                </>
              )}
            </>  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
