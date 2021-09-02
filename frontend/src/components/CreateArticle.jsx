import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function CreateArticle(props) {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = function (data, e) {
    e.target.reset();

    const fd = new FormData();

    fd.append("title", data.title);
    fd.append("content", data.content);
    fd.append("image", data.image[0]);
    fd.append("attachment", data.attachment);

    axios
      .post("http://localhost:4200/api/post/article", fd, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then(function (res) {
        alert(res.data.message);
        props.setArticle1(props.article1 + 1);
      })
      .catch(function (error) {
        return error;
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-signin"
      id="formCreateArticle"
    >
      <h2 className="h3 mb-3 fw-normal">Partager un nouvel article</h2>

      <div className="form-floating mb-2">
        <input
          type="text"
          className="form-control formTitle"
          name="title"
          {...register("title", { required: true, minLength: 2 })}
        />
        {errors.title && (
          <p className="text-center text-danger mt-1">
            Le titre ne peut pas être vide !
          </p>
        )}{" "}
        <label htmlFor="floatingInput">Titre de votre post</label>
      </div>

      <div className="form-floating">
        <textarea
          type="text"
          className="form-control formContent"
          name="content"
          {...register("content", { required: true, minLength: 2 })}
        />
        {errors.content && (
          <p className="text-center text-danger mt-1">
            Le contenu ne peut pas être vide!
          </p>
        )}{" "}
        <label htmlFor="floatingInput">Contenu</label>
      </div>

      <div className="mt-2">
        <input className="form-control" type="file" {...register("image")} />
      </div>

      <div className="form-floating mb-2 mt-2">
        <input
          type="text"
          className="form-control formAttachment"
          name="attachment"
          {...register("attachment")}
        />
        <label htmlFor="floatingInput">Lien de l'article</label>
      </div>

      <button
        className="w-100 btn btn-lg btn-primary mb-5 btnArticle"
        type="submit"
      >
        Poster{" "}
      </button>
    </form>
  );
}
