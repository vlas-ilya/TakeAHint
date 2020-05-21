import { createSlice } from "@reduxjs/toolkit";
import { getParam } from "../../utils/url.utils";
import produce from "immer";

export const reducer = createSlice({
  name: "loginPage",
  initialState: {
    gameId: getParam("gameId", ""),
    login: getParam("player", "")
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
