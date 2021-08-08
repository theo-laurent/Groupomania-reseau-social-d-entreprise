import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//import css personnel
import "../styles/App.css";

// import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";

//import components
import Login from "./Login";
import Signup from "./Signup";

export default function App() {
  return (
    <Router>
      <Container>
        <Card style={{ width: "70%" }} className="divApp m-auto mt-5">
          <Card.Body className="text-center">
            <Card.Title>Groupomania</Card.Title>
            <Card.Text>
              Bienvenue sur votre réseau social professionnel{" "}
              <strong>Groupomania</strong>. Si vous êtes déja inscrit vous
              pouvez vous dès à présent vous connecter, sinon n'hésitez pas à
              vous inscrire !
            </Card.Text>
            <Link to="/login" className="divApp_login m-2">
              Se connecter
            </Link>
            <Link to="/signup" className="divApp_signup m-2">
              S'inscrire
            </Link>
          </Card.Body>
        </Card>
      </Container>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
}
