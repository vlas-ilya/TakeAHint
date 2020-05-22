import { change } from '../../utils/utils';
import { createSlice } from '@reduxjs/toolkit';
import { generateCode } from '../../utils/generate.utils';
import { getParam } from '../../utils/url.utils';

export const reducer = createSlice({
  name: 'login',
  initialState: {
    gameId: getParam('gameId', generateCode()),
    login: getParam('player', ''),
    gameIdValid: true,
    loginValid: true,
  },
  reducers: {
    changeGameId: change('gameId'),
    changeLogin: change('login'),
    changeGameIdValid: change('gameIdValid'),
    changeLoginValid: change('loginValid'),
  },
});

export const { changeGameId, changeLogin, changeGameIdValid, changeLoginValid } = reducer.actions;

export const selectGameId = state => state.login.gameId;
export const selectGameIdValid = state => state.login.gameIdValid;
export const selectLogin = state => state.login.login;
export const selectLoginValid = state => state.login.loginValid;

export default reducer.reducer;
