import "../styles/App.scss";

import AlertBlock from "../components/AlertBlock/AlertBlock";
import MainMenu from "../components/MainMenu/MainMenu";
import React from "react";
import Router from "./Router";

export default function App() {
  return (
    <div className="take-a-hint">
      <AlertBlock />
      <MainMenu />
      <Router />
    </div>
  );
}
