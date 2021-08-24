import React from "react";
import UserArticles from "../components/UserArticles";
//import components
import UserUpdate from "../components/UserUpdate";

export default function UserAccount() {
  return (
    <>
      <h2 className="mt-2 mb-0 text-center">Mon profil</h2>
      <UserUpdate />
      {/*Le bouton Delete et son component UserDelete se trouve dans UserUpdate pour des soucis de mise en forme */}
      <h2 className="mt-3 mb-4 text-center">Mes articles</h2>
      <UserArticles />
    </>
  );
}
