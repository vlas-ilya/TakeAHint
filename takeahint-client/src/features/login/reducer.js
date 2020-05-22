import { createSlice } from '@reduxjs/toolkit';
import { generateCode } from '../../utils/utils';
import { getParam } from '../../utils/url.utils';
import produce from 'immer';

export const reducer = createSlice({
  name: 'login',
  initialState: {
    gameId: getParam('gameId', generateCode()),
    login: getParam('player', ''),
    gameIdValid: true,
    loginValid: true,
  },
  reducers: {
    changeGameId: (state, action) =>
      produce(state, draftState => {
        draftState.gameId = action.payload;
      }),

    changeLogin: (state, action) =>
      produce(state, draftState => {
        draftState.login = action.payload;
      }),

    changeGameIdValid: (state, action) =>
      state.gameIdValid === action.payload
        ? state
        : produce(state, draftState => {
            draftState.gameIdValid = action.payload;
          }),

    changeLoginValid: (state, action) =>
      state.loginValid === action.payload
        ? state
        : produce(state, draftState => {
            draftState.loginValid = action.payload;
          }),
  },
});

export const { changeGameId, changeLogin, changeGameIdValid, changeLoginValid } = reducer.actions;

export const selectGameId = state => state.login.gameId;
export const selectGameIdValid = state => state.login.gameIdValid;
export const selectLogin = state => state.login.login;
export const selectLoginValid = state => state.login.loginValid;

export default reducer.reducer;
