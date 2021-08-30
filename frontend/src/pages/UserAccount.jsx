import React from "react";

//import components
import UserProfil from "../components/UserProfil";
import UserUpdate from "../components/UserUpdate";
import UserArticles from "../components/UserArticles";

export default function UserAccount() {
  return (
    <>
      <UserProfil />
      <UserUpdate />
      <UserArticles />
    </>
  );
}
