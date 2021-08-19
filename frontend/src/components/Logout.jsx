import React from "react";

export default function Logout() {
  function logout() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <a href="/#" className="nav-link mx-3" onClick={logout}>
      Se déconnecter
    </a>
  );
}
