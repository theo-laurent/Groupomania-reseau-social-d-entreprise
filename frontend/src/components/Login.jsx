import React, { useState } from "react";
import PropTypes from "prop-types";

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
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    loginUser({
      email,
      password,
    });
  }

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <h2>Se connecter</h2>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={function (e) {
              setEmail(e.target.value);
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Mot de passe:
          <input
            type="password"
            name="password"
            value={password}
            onChange={function (e) {
              setPassword(e.target.value);
            }}
          />
        </label>
      </div>
      <button type="submit">Se connecter</button>
    </form>
  );
}

Login.prototype = {
  onConnect: PropTypes.func.isRequired,
};
