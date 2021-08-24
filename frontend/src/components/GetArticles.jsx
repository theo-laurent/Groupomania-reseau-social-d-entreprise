import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

export default function GetArticles() {
  const storage = JSON.parse(localStorage.getItem("token"));
  const token = "Bearer " + storage.token;

  const [articles, setArticles] = useState();

  useEffect(
    function () {
      fetch("http://localhost:4200/api/post", {
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
          setArticles(result[0]);
        })
        .catch(function (error) {
          return error;
        });
    },
    [token]
  );

  if (articles === undefined) {
    return <div>Chargement ...</div>;
  } else {
    return articles.map(function (article) {
      return (
        <div className="card mb-5">
          <div className="card-header d-flex justify-content-between align-middle">
            <h6 className="">{article.firstName + " " + article.lastName}</h6>
            <Link to={`/article/${article.id}`}>
              <button type="button" className="btn btn-outline-primary d-flex">
                <i className="bi bi-plus-lg"></i>
              </button>
            </Link>
          </div>
          <div className="card-body text-center">
            <h5 className="card-title">{article.title}</h5>
            <p className="card-text">{article.content} </p>
            <a
              href={article.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="card-text"
            >
              {article.attachment}
            </a>
          </div>
          <div className="card-footer text-center">
            <p className="mb-0">
              <Moment fromNow>{article.createdAt}</Moment>
            </p>
          </div>
        </div>
      );
    });
  }
}
