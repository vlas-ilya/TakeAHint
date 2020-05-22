import { default as axios } from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import produce from 'immer';

export const reducer = createSlice({
  name: 'answering',
  initialState: {
    associations: [],
    answer: '',
    valid: true,
  },
  reducers: {
    changeAnswer: (state, action) =>
      state.answer === action.payload
        ? state
        : produce(state, (draftState) => {
            draftState.answer = action.payload;
          }),
    answeringChangeAssociations: (state, action) =>
      produce(state, (draftState) => {
        draftState.associations = action.payload;
      }),

    invalidAnswer: (state) => ({
      ...state,
      valid: false,
    }),
  },
});

export const { answeringChangeAssociations, changeAnswer, invalidAnswer } = reducer.actions;

export const sendAnswer = () => async (dispatch, getState) => {
  const state = getState();
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

export const sendEmptyAnswer = () => async (dispatch, getState) => {
  const state = getState();

  await axios.post(`/game/${state.login.gameId}/command`, {
    type: 'ANSWER',
    player: {
      login: state.login.login,
      id: state.application.playerId,
    },
  });
};

export const selectAssociations = (state) => state.answering.associations;
export const selectAnswer = (state) => state.answering.answer;
export const selectValidAnswer = (state) => state.answering.valid;

export default reducer.reducer;
