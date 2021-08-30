import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import UserDelete from "./UserDelete";

export default function UserUpdate() {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async function (data) {
    const fd = new FormData();
    fd.append("image", data.image[0]);
    fd.append("firstName", data.firstName);
    fd.append("lastName", data.lastName);
    fd.append("bio", data.bio);

    axios
      .post("http://localhost:4200/api/users/userUpdate", fd, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then(function (res) {
        alert(res.data.message);
      })
      .catch(function (error) {
        return error;
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-signin"
      id="formUser"
    >
      <h2 className="text-center">Modifier mon profil</h2>

      <div className="mb-3 text-left">
        <label htmlFor="formFile" className="form-label">
          <strong>Avatar</strong>
        </label>
        <input
          className="form-control"
          type="file"
          name="image"
          {...register("image")}
        />
      </div>

      <div className="form-floating mb-2">
        <input
          autoFocus
          type="text"
          className="form-control"
          name="firstName"
          {...register("firstName", {
            minLength: 2,
            maxLength: 26,
            pattern: /[a-zA-ZÀ-ÿ]/,
          })}
        />
        {errors.firstName && (
          <p className="text-center text-danger mt-1">
            Le prénom ne doit contenir que des lettres !
          </p>
        )}{" "}
        <label htmlFor="floatingInput">Prénom</label>
      </div>

      <div className="form-floating mb-2">
        <input
          type="text"
          className="form-control"
          name="lastName"
          {...register("lastName", {
            minLength: 2,
            maxLength: 26,
            pattern: /[a-zA-ZÀ-ÿ]/,
          })}
        />
        {errors.lastName && (
          <p className="text-center text-danger mt-1">
            Le nom ne doit contenir que des lettres !
          </p>
        )}{" "}
        <label htmlFor="floatingInput">Nom</label>
      </div>

      <div className="form-floating mb-2">
        <textarea
          type="text"
          className="form-control formBio"
          name="bio"
          {...register("bio")}
        />
        <label htmlFor="floatingPassword">Votre bio</label>
      </div>

      <div className="d-lg-flex justify-content-evenly text-center mt-4 mb-3">
        <button className="btn btn-lg btn-primary btnUser mb-2" type="submit">
          Modifier{" "}
        </button>
        <UserDelete />
      </div>
    </form>
  );
}
