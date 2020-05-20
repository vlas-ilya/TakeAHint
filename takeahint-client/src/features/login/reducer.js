import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const url = new URL(window.location.href);
const gameId = url.searchParams.get("gameId");
const player = url.searchParams.get("player");

export const reducer = createSlice({
  name: "loginPage",
  initialState: {
    gameId: gameId || "",
    login: player || ""
  },
  reducers: {
    changeGameId: (state, action) =>
      produce(state, draftState => {
        draftState.gameId = action.payload;
      }),

    changeLogin: (state, action) =>
      produce(state, draftState => {
        draftState.login = action.payload;
      })
  }
});

export const { changeGameId, changeLogin } = reducer.actions;

export const selectGameId = state => state.loginPage.gameId;
export const selectLogin = state => state.loginPage.login;

export default reducer.reducer;
