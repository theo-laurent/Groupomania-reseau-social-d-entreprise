import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
//import components
import Routes from "./components/Routes.jsx";
import AuthApi from "./components/AuthApi.jsx";
//import css bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./app.css";

export default function App() {
  const [auth, setAuth] = useState(false);

  let navLink;
  if (auth === true) {
    navLink = (
      <Nav>
        <Link to="/articles" className="nav-link">
          Tous les articles
        </Link>
        <Link className="nav-link">Mon compte</Link>
      </Nav>
    );
  } else {
    navLink = (
      <Nav className="mr-auto">
        <Link to="/" className="nav-link">
          Accueil
        </Link>
        <Link to="/signup" className="nav-link">
          S'inscrire
        </Link>
        <Link to="/login" className="nav-link">
          Se connecter
        </Link>
      </Nav>
    );
  }

  return (
    <React.Fragment>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>
          <Navbar sticky="top" bg="dark" variant="dark">
            {navLink}
          </Navbar>
          <Routes />
        </Router>
      </AuthApi.Provider>
    </React.Fragment>
  );
}
