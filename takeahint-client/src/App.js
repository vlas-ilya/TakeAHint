import "./App.css";

import MainMenu from "./components/MainMenu/MainMenu";
import React from "react";
import Router from "./Router";

export default function App() {
  return (
    <div className="App">
      <MainMenu />
      <Router />
    </div>
  );
}
