import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Moment from "react-moment";

export default function GetOneArticle() {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const idOfUser = storage.userId;
  const isAdmin = storage.isAdmin;
  const { id } = useParams();

  const [dataArticle, setDataArticle] = useState();

  useEffect(
    function () {
      fetch("http://localhost:4200/api/post/" + id, {
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
          setDataArticle(result[0]);
        })
        .catch(function (error) {
          return error;
        });
    },
    [token, id]
  );

  const history = useHistory();
  const handler = function () {
    history.push("/articles");
  };

  const deleteArticle = function (e) {
    e.preventDefault();
    if (isAdmin === 1 || idOfUser === dataArticle.userId) {
      if (
        window.confirm("Voulez vous vraiment supprimer cette publication ?")
      ) {
        fetch("http://localhost:4200/api/post/" + id, {
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
            handler();
          })
          .catch(function (error) {
            return error;
          });
      } else {
      }
    } else {
      alert(
        "Vous ne pouvez pas supprimer les publications d'autres utilisateurs !"
      );
    }
  };

  if (dataArticle === undefined) {
    return <div>Chargement . . .</div>;
  } else {
    return (
      <div className="card mt-5" style={{ "min-height": "200px" }}>
        <div className="card-header d-flex justify-content-between align-middle">
          <h6 className="align-items-center">
            {dataArticle.firstName + " " + dataArticle.lastName}
          </h6>
          <button
            onClick={deleteArticle}
            type="button"
            className="btn btn-outline-danger d-flex"
          >
            <i class="bi bi-trash-fill"></i>
          </button>
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{dataArticle.title}</h5>
          <p className="card-text">{dataArticle.content} </p>
          <a
            href={dataArticle.attachment}
            target="_blank"
            rel="noopener noreferrer"
            className="card-text"
          >
            {dataArticle.attachment}
          </a>
        </div>
        <div className="card-footer d-flex justify-content-center">
          <p className="mb-0">
            {" "}
            <Moment fromNow>{dataArticle.createdAt}</Moment>
          </p>
        </div>
      </div>
    );
  }
}
