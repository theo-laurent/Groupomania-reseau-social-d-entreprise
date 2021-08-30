import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";

export default function GetComments() {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const idOfUser = storage.userId;
  const isAdmin = storage.isAdmin;

  const { id } = useParams();
  const [result, setResult] = useState();

  useEffect(
    function fetchGetComment() {
      fetch("http://localhost:4200/api/post/getComment/" + id, {
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
          setResult(result);
        })
        .catch(function (error) {
          return error;
        });
    },
    [token, id]
  );

  console.log(idOfUser);

  const deleteComment = function (e) {
    e.preventDefault();
    if (isAdmin === 1 || idOfUser === result.userId) {
      if (window.confirm("Voulez vous vraiment supprimer ce commentaire ?")) {
        fetch("", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (result) {
            alert(JSON.stringify(result.message));
          })
          .catch(function (error) {
            return error;
          });
      } else {
      }
    } else {
      alert(
        "Vous ne pouvez pas supprimer les commentaires d'autres utilisateurs !"
      );
    }
  };

  if (result === undefined) {
    return <div>Chargement . . .</div>;
  } else {
    return (
      <div>
        {result.map(function (result, index) {
          return (
            <div
              key={`${result.id}-${index}`}
              className="card mt-5 mb-5"
              style={{ width: "45%" }}
            >
              <div className="card-header d-flex justify-content-between">
                <span className="d-flex align-items-center">
                  <img
                    src={result.imageUrl}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                    alt="la miniature de l'avatar de l'utilisateur"
                  />
                  <h6 className="">
                    {result.firstName + " " + result.lastName}
                  </h6>
                </span>
                <button
                  onClick={deleteComment}
                  type="button"
                  className="btn btn-outline-danger d-flex"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <div className="card-body text-center">
                <p className="card-text">{result.message} </p>
              </div>
              <div className="card-footer text-center">
                <p className="mb-0">
                  {" "}
                  <Moment fromNow>{result.createdAt}</Moment>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
