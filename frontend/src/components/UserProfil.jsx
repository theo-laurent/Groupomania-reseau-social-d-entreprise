import React, { useEffect, useState } from "react";

export default function UserProfil() {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const [data, setData] = useState("");

  useEffect(
    function data() {
      fetch("http://localhost:4200/api/users/getuser", {
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
          setData(result);
        })
        .catch(function (error) {
          return error;
        });
    },
    [token]
  );

  return (
    <>
      <h2 className="text-center mt-3">Mon profil</h2>

      <div className="formGetArticles card flex-md-row mb-2">
        <div className="card-body d-flex flex-column align-items-start">
          <h3 className="mb-0">{data.firstName}</h3>
          <p className="mb-1 text-muted">{data.lastName}</p>
          <p className="card-footer mb-auto">{data.bio}</p>
        </div>
        <img
          src={data.imageUrl}
          className="card-img-right flex-auto d-none d-sm-block"
          alt="le profil d'un membre de Groupomania"
          style={{ height: 150, width: "55%", objectFit: "cover" }}
        />
      </div>
    </>
  );
}
