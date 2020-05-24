import { default as axios } from 'axios';
import { change } from '../../utils/redux.utils';
import { createSlice } from '@reduxjs/toolkit';

export const reducer = createSlice({
  name: 'answering',
  initialState: {
    associations: [],
    answer: '',
    valid: true,
  },
  reducers: {
    changeAnswer: change('answer'),
    answeringChangeAssociations: change('associations'),
    invalidAnswer: change('valid', false),
  },
});

export const { answeringChangeAssociations, changeAnswer, invalidAnswer } = reducer.actions;

export const sendAnswer = () => async (dispatch, getState, state = getState()) => {
  const answer = state.answering.answer;

  await axios.post(`/game/${state.login.gameId}/command`, {
    type: 'ANSWER',
    word: answer,
    player: {
      login: state.login.login,
      id: state.application.playerId,
    },
  });
};

export const sendEmptyAnswer = () => (dispatch, getState, state = getState()) =>
  axios.post(`/game/${state.login.gameId}/command`, {
    type: 'ANSWER',
    player: {
      login: state.login.login,
      id: state.application.playerId,
    },
  });

export const selectAssociations = (state) => state.answering.associations;
export const selectAnswer = (state) => state.answering.answer;
export const selectValidAnswer = (state) => state.answering.valid;

export default reducer.reducer;
