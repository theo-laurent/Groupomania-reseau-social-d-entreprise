import React, { useState } from "react";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState("");

  const submit = async function (e) {
    e.preventDefault();

    const storage = JSON.parse(localStorage.getItem("token"));
    let token = "Bearer " + storage.token;
    let userId = storage.userId;

    const data = { userId, title, content, attachment };

    await fetch("http://localhost:4200/api/post/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        return error;
      });
  };

  return (
    <form onSubmit={submit} className="post">
      <h3>Titre du post</h3>
      <input
        value={title}
        onChange={function (e) {
          setTitle(e.target.value);
        }}
      />
      <h4>Contenu</h4>
      <textarea
        value={content}
        onChange={function (e) {
          setContent(e.target.value);
        }}
      />
      <h4>Lien</h4>
      <input
        value={attachment}
        onChange={function (e) {
          setAttachment(e.target.value);
        }}
      />
      <button type="submit">Poster</button>
    </form>
  );
}

// titre, content, attachment
