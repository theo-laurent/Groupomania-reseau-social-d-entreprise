import React from "react";
import { useHistory } from "react-router-dom";
// import component
import Logout from "../Logout";

export default function UserDelete() {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const submit = async function (e) {
    e.preventDefault();
    if (
      window.confirm(
        "Voulez vous vraiment supprimer votre compte ? Cela supprimera également les articles que vous avez publiés."
      )
    ) {
      fetch("http://localhost:4200/api/users/userDelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (res) {
          localStorage.clear();
          window.location.reload();
          return res.json();
        })
        .catch(function (error) {
          return error;
        });
    } else {
    }
  };

  return (
    <button
      onClick={submit}
      className="w-100 btn btn-lg btn-danger mt-3 btnUser"
      type="submit"
    >
      Supprimer{" "}
    </button>
  );
}
