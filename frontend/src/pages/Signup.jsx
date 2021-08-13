import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [redirect, setRedirect] = useState(false);

  const submit = async function (e) {
    e.preventDefault();

    const data = { firstName, lastName, email, password };

    await fetch("http://localhost:4200/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        return error;
      });
    alert("Vous êtes bien inscrit, vous pouvez à present vous connecter !");
    setRedirect(true);
  };

  if (redirect === true) {
    return <Redirect to="/login" />;
  }

  return (
    <form onSubmit={submit} className="form-signin">
      <h1 className="h3 mb-3 fw-normal">Inscrivez vous dès maintenant</h1>
      <div className="form-floating mb-2">
        <input
          autoFocus
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Martin"
          value={firstName}
          onChange={function (e) {
            setFirstName(e.target.value);
          }}
        />
        <label for="floatingInput">Prénom</label>
      </div>
      <div className="form-floating mb-2">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Dupont"
          value={lastName}
          onChange={function (e) {
            setLastName(e.target.value);
          }}
        />
        <label for="floatingInput">Nom</label>
      </div>
      <div className="form-floating mb-2">
        <input
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
      <div className="form-floating mb-2">
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

      <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
        S'inscrire{" "}
      </button>
    </form>
  );
}
