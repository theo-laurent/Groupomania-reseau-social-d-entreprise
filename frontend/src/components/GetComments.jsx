import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";

export default function GetComments() {
  const storage = JSON.parse(localStorage.getItem("token"));
  let token = "Bearer " + storage.token;

  const { id } = useParams();
  const [result, setResult] = useState();

  useEffect(function fetchGetComment() {
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

  }, [token, id]);

  if (result === undefined) {
    return <div>Chargement . . .</div>;
  } else {
    return (
      <div>
        {result.map(function (result) {
          return (
            <div className="card mt-5 mb-5" style={{ width: "45%" }}>
              <div className="card-header d-flex justify-content-between align-middle">
                <h6 className="">{result.firstName + " " + result.lastName}</h6>
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
