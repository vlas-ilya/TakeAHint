import { default as axios } from 'axios';
import { change } from '../../utils/redux.utils';
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

export const start = () => (dispatch, getState, state = getState()) =>
  axios.post(`/game/${state.login.gameId}/command`, {
    type: 'CREATE',
  });

export const selectPlayers = (state) => state.waitingPlayers.players;

export default reducer.reducer;
