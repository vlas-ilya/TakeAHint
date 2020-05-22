import { default as axios } from 'axios';
import { change } from '../../utils/utils';
import { createSlice } from '@reduxjs/toolkit';

export const reducer = createSlice({
  name: 'waitingPlayers',
  initialState: {
    players: [],
  },
  reducers: {
    changePlayers: change('players'),
  },
});

export const { changePlayers } = reducer.actions;

export const start = () => async (dispatch, getState) => {
  const state = getState();
  await axios.post(`/game/${state.login.gameId}/command`, {
    type: 'CREATE',
  });
};

export const selectPlayers = state => state.waitingPlayers.players;

export default reducer.reducer;
