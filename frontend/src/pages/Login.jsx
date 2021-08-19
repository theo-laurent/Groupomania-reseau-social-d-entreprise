import React, { useState } from "react";
import AuthApi from "../components/AuthApi";

export default function Login() {
  localStorage.clear();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Auth = React.useContext(AuthApi);

  const submit = function (e) {
    e.preventDefault();
    const data = { email, password };

    fetch("http://localhost:4200/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (result) {
        console.log(result);
        localStorage.setItem("token", JSON.stringify(result));
        let storage = JSON.parse(localStorage.getItem("token"));
        if (storage.token === undefined) {
          Auth.setAuth(false);
          alert(JSON.stringify(result.message));
        } else {
          Auth.setAuth(true);
        }
      })
      .catch(function (error) {
        return error;
      });
  };

  return (
    <form onSubmit={submit} className="form-signin">
      <h1 className="h3 mb-3 fw-normal">Veuillez vous connecter</h1>
      <div className="form-floating mb-2">
        <input
          autoFocus
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          value={email}
          onChange={function (e) {
            setEmail(e.target.value);
          }}
        />
        <label for="floatingInput">Adresse email</label>
      </div>

      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          value={password}
          onChange={function (e) {
            setPassword(e.target.value);
          }}
        />
        <label for="floatingPassword">Mot de passe</label>
      </div>

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Se connecter{" "}
      </button>
    </form>
  );
}
