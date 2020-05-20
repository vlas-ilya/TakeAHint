import answeringPage from "../features/answering/reducer";
import application from "./reducer";
import chooseWordPage from "../features/chooseWord/reducer";
import { configureStore } from "@reduxjs/toolkit";
import filterAssociationsPage from "../features/filterAssociations/reducer";
import inputAssociationsPage from "../features/inputAssociations/reducer";
import loginPage from "../features/login/reducer";
import waitingPlayersPage from "../features/waitingPlayers/reducer";

export default configureStore({
  reducer: {
    application,
    loginPage,
    waitingPlayersPage,
    chooseWordPage,
    inputAssociationsPage,
    filterAssociationsPage,
    answeringPage
  }
});
