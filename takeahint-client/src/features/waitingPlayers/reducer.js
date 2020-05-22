import { default as axios } from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import produce from 'immer';

export const reducer = createSlice({
  name: 'waitingPlayers',
  initialState: {
    players: [],
  },
  reducers: {
    changePlayers: (state, action) =>
      produce(state, (draftState) => {
        draftState.players = action.payload;
      }),
  },
});

export const { changePlayers } = reducer.actions;

export const start = () => async (dispatch, getState) => {
  const state = getState();
  await axios.post(`/game/${state.login.gameId}/command`, {
    type: 'CREATE',
  });
};

export const selectPlayers = (state) => state.waitingPlayers.players;

export default reducer.reducer;
