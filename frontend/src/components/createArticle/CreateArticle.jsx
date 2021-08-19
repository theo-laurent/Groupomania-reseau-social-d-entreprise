import React, { useState } from "react";
import "./createArticle.css";

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
        alert("Post bien publié");
        return res.json();
      })
      .catch(function (error) {
        return error;
      });
  };

  return (
    <form onSubmit={submit} className="form-signin formCreateArticle">
      <h2 className="h3 mb-3 fw-normal">Partager un nouvel article</h2>
      <div className="form-floating mb-2">
        <input
          type="text"
          className="form-control formTitle"
          value={title}
          onChange={function (e) {
            setTitle(e.target.value);
          }}
        />
        <label for="floatingInput">Titre de votre post</label>
      </div>
      <div className="form-floating mb-2">
        <textarea
          type="text"
          className="form-control formContent"
          value={content}
          onChange={function (e) {
            setContent(e.target.value);
          }}
        />
        <label for="floatingInput">Contenu</label>
      </div>
      <div className="form-floating mb-2">
        <input
          type="text"
          className="form-control formAttachment"
          value={attachment}
          onChange={function (e) {
            setAttachment(e.target.value);
          }}
        />
        <label for="floatingInput">Lien de l'article</label>
      </div>

      <button className="w-100 btn btn-lg btn-primary mb-5 btnArticle" type="submit">
        Poster{" "}
      </button>
    </form>
  );
}

// titre, content, attachment
