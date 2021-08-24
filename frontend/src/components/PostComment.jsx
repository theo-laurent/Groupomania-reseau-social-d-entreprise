import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function PostComment() {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const { id } = useParams();
  const nameUser = storage.firstName + " " + storage.lastName;
  const idOfUser = storage.userId;

  const [comment, setComment] = useState("");

  const commentArticle = function (e) {
    e.preventDefault();
    const data = { idOfUser, id, comment };

    fetch("http://localhost:4200/api/post/postComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        alert("Commentaire bien publié !");
        return res.json();
      })
      .catch(function (error) {
        return error;
      });
  };

  return (
    <form
      onSubmit={commentArticle}
      className="card mt-3"
      style={{ width: "45%" }}
    >
      <div className="card-header">
        <h6>{nameUser}</h6>
      </div>
      <div className="card-body">
        <textarea
          value={comment}
          className="form-control"
          style={{ height: "100px" }}
          onChange={function (e) {
            setComment(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="card-footer d-flex justify-content-end">
        <button onSubmit={commentArticle} className="btn btn-primary btn-sm">
          Commenter
        </button>
      </div>
    </form>
  );
}
