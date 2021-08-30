import React from "react";
import GetComments from "../components/GetComments";
import GetOneArticle from "../components/GetOneArticle";
import PostComment from "../components/PostComment";

export default function OneArticle() {
  return (
    <React.Fragment>
      <GetOneArticle />
      <GetComments />
      <PostComment />
    </React.Fragment>
  );
}
