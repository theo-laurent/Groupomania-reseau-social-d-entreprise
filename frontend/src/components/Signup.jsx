import React, { useState } from "react";

//import css personnel
import "../styles/Signup.css";

// import bootstrap
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function signupUser(credentials) {
  return fetch("http://localhost:4200/api/users/signup", {
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

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    signupUser({
      firstName,
      lastName,
      email,
      password,
      bio,
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Inscrivez vous</h2>
        <Form.Group>
          <Form.Label htmlFor="prénom">Prénom</Form.Label>
          <Form.Control
            type="text"
            name="prénom"
            value={firstName}
            onChange={function (e) {
              setFirstName(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="nom">Nom</Form.Label>
          <Form.Control
            type="text"
            name="nom"
            value={lastName}
            onChange={function (e) {
              setLastName(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={function (e) {
              setEmail(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Mot de passe</Form.Label>
          <Form.Control
            type="text"
            name="password"
            value={password}
            onChange={function (e) {
              setPassword(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="bio">Bio</Form.Label>
          <Form.Control
            type="text"
            name="bio"
            value={bio}
            onChange={function (e) {
              setBio(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          S'inscrire
        </Button>
      </Form>
    </Container>
  );
}
