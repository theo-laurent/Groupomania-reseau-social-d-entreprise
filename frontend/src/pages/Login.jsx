import React from "react";
import AuthApi from "../components/AuthApi";
import { useForm } from "react-hook-form";

export default function Login() {
  localStorage.clear();

  const Auth = React.useContext(AuthApi);
  const { register, handleSubmit } = useForm();

  const onSubmit = function (data) {
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
    <form onSubmit={handleSubmit(onSubmit)} className="form-signin">
      <h1 className="h3 mb-3 fw-normal">Veuillez vous connecter</h1>
      <div className="form-floating mb-2">
        <input
          autoFocus
          required
          type="email"
          className="form-control"
          name="email"
          {...register("email")}
        />
        <label htmlFor="floatingInput">Adresse email</label>
      </div>

      <div className="form-floating">
        <input
          required
          type="password"
          className="form-control"
          name="password"
          {...register("password")}
        />
        <label htmlFor="floatingPassword">Mot de passe</label>
      </div>

      <button className="mt-2 w-100 btn btn-lg btn-primary" type="submit">
        Se connecter{" "}
      </button>
    </form>
  );
}
