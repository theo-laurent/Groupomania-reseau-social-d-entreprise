import React, { useState } from "react";

// import css personnel
import "../styles/Login.css";

//import booststrap
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function loginUser(credentials) {
  return fetch("http://localhost:4200/api/users/login", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then(function (res) {
      return res.json();
    })
    .catch(function (error) {
      alert(error);
    });
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    loginUser({
      email,
      password,
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Se connecter</h2>
        <Form.Group>
          <Form.Label htmlFor="email">Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={function (e) {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Mot de passe:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={function (e) {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button type="submit">Se connecter</Button>
      </Form>
    </Container>
  );
}
