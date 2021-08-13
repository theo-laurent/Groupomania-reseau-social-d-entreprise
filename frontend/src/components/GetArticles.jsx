import React, { useState, useEffect } from "react";

export default function GetArticles() {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const [articles, setArticles] = useState();

  useEffect(() => {
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
  });

  return (
    <div>
      articles
      <div></div>
    </div>
  );
}
