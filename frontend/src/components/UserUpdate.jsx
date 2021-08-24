import React, { useEffect, useState } from "react";
import UserDelete from "./UserDelete";

export default function UserUpdate() {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(
    function () {
      fetch("http://localhost:4200/api/users/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (result) {
          console.log(result);
          setFirstName(result.firstName);
          setLastName(result.lastName);
          setBio(result.bio);
        })
        .catch(function (error) {
          return error;
        });
    },
    [token]
  );

  const submit = async function (e) {
    e.preventDefault();

    const data = { firstName, lastName, bio };

    await fetch("http://localhost:4200/api/users/userUpdate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (result) {
        console.log(result);
        alert(JSON.stringify(result.message));
      })
      .catch(function (error) {
        return error;
      });
  };

  return (
    <form onSubmit={submit} className="form-signin" id="formUser">
      <div className="mb-3 text-left">
        <label htmlFor="formFile" className="form-label">
          <strong>Avatar</strong>
        </label>
        <input className="form-control" type="file" id="formFile" />
      </div>
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
        <label htmlFor="floatingInput">Prénom</label>
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
        <label htmlFor="floatingInput">Nom</label>
      </div>

      <div className="form-floating mb-2">
        <textarea
          type="text"
          className="form-control formBio"
          id="floatingInput"
          placeholder="Bio"
          value={bio}
          onChange={function (e) {
            setBio(e.target.value);
          }}
        />
        <label htmlFor="floatingPassword">Votre bio</label>
      </div>
      <div className="d-flex justify-content-evenly">
        <button className="btn btn-lg btn-primary mt-3 btnUser" type="submit">
          Modifier{" "}
        </button>
        <UserDelete />
      </div>
    </form>
  );
}
