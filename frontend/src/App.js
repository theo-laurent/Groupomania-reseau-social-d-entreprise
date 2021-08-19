import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
//import components
import Routes from "./components/Routes.jsx";
import AuthApi from "./components/AuthApi.jsx";
//import css bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./app.css";
//import logo
import logo from "./assets/logo.png";
import Logout from "./components/Logout.jsx";

export default function App() {
  const [auth, setAuth] = useState(false);

  let navLink;
  if (auth === true) {
    navLink = (
      <Nav className="w-100 justify-content-between">
        <div>
          <Link to="/" className="nav-link">
            <img
              src={logo}
              alt="Le logo de l'entreprise Groupomania, il représente une sphère quadrillée"
            />
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <Link to="/articles" className="nav-link mx-4">
            Tous les articles
          </Link>
          <Link to="/user" className="nav-link mx-4">
            Mon compte
          </Link>
          <Logout />
        </div>
      </Nav>
    );
  } else {
    navLink = (
      <Nav className="w-100 justify-content-between">
        <div>
          <Link to="/" className="nav-link">
            <img
              src={logo}
              alt="Le logo de l'entreprise Groupomania, il représente une sphère quadrillée"
            />
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <Link to="/signup" className="nav-link mx-3">
            S'inscrire
          </Link>
          <Link to="/login" className="nav-link mx-3">
            Se connecter
          </Link>
        </div>
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
