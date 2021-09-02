import React, { useState } from "react";
//import components
import CreateArticle from "../components/CreateArticle";
import GetArticles from "../components/GetArticles";

export default function Articles() {
  const [articles, setArticles] = useState(0);

  return (
    <div>
      <CreateArticle article1={articles} setArticle1={setArticles} />
      <GetArticles article1={articles} />
    </div>
  );
}
