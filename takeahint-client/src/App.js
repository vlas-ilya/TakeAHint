import "./App.css";

import { constants, selectPage } from "./app/reduser";

import Login from "./features/login/Login";
import React from "react";
import WaitingPlayers from "./features/waitingPlayers/WaitingPlayers";
import { useSelector } from "react-redux";

export default function App() {
  const page = useSelector(selectPage);
  return (
    <div className="App">
      {page === constants.pages.login ? (
        <Login />
      ) : page === constants.pages.waitingPlayers ? (
        <WaitingPlayers />
      ) : null}
    </div>
  );
}
