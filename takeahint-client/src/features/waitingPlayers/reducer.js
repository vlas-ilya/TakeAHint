import { default as axios } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

export const reducer = createSlice({
  name: "waitingPlayersPage",
  initialState: {
    players: []
  },
  reducers: {
    changePlayers: (state, action) =>
      produce(state, draftState => {
        draftState.players = action.payload;
      })
  }
});

export const { changePlayers } = reducer.actions;

export const start = () => async (dispatch, getState) => {
  const state = getState();
  await axios.post(`/game/${state.loginPage.gameId}/command`, {
    type: "CREATE"
  });
};

export const selectPlayers = state => state.waitingPlayersPage.players;

export default reducer.reducer;
