import { default as axios } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

export const reducer = createSlice({
  name: "loginPage",
  initialState: {
    words: []
  },
  reducers: {
    changeWords: (state, action) =>
      produce(state, draftState => {
        draftState.words = action.payload.map((item, index) => ({
          key: index,
          word: item,
          selected: false
        }));
      }),

    selectWord: (state, action) =>
      produce(state, draftState => {
        draftState.words = state.words.map(item => ({
          ...item,
          selected: action.payload === item.key
        }));
      })
  }
});

export const { changeWords, selectWord } = reducer.actions;

export const chooseWord = () => async (dispatch, getState) => {
  const state = getState();
  const index = state.chooseWordPage.words.findIndex(item => item.selected);

  await axios.post(`/game/${state.loginPage.gameId}/command`, {
    type: "VOTE",
    index,
    player: {
      login: state.loginPage.login,
      id: state.application.playerId
    }
  });
};

export const selectWords = state => {
  return state.chooseWordPage.words;
};

export default reducer.reducer;
