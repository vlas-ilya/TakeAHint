import { default as axios } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

export const reducer = createSlice({
  name: "answeringPage",
  initialState: {
    associations: [],
    answer: ""
  },
  reducers: {
    changeAnswer: (state, action) =>
      produce(state, draftState => {
        draftState.answer = action.payload;
      }),
    answeringPageChangeAssociations: (state, action) =>
      produce(state, draftState => {
        draftState.associations = action.payload;
      })
  }
});

export const {
  answeringPageChangeAssociations,
  changeAnswer
} = reducer.actions;

export const sendAnswer = () => async (dispatch, getState) => {
  const state = getState();
  const answer = state.answeringPage.answer;

  await axios.post(`/game/${state.loginPage.gameId}/command`, {
    type: "ANSWER",
    word: answer,
    player: {
      login: state.loginPage.login,
      id: state.application.playerId
    }
  });
};

export const selectAssociations = state => state.answeringPage.associations;
export const selectAnswer = state => state.answeringPage.answer;

export default reducer.reducer;
