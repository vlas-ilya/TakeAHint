import { default as axios } from 'axios';
import { change } from '../../utils/utils';
import { createSlice } from '@reduxjs/toolkit';

export const reducer = createSlice({
  name: 'chooseWord',
  initialState: {
    words: [],
    notVoted: [],
  },
  reducers: {
    changeWords: change('words', words =>
      words.map((item, index) => ({
        key: index,
        word: item,
        selected: false,
      })),
    ),

    saveNotVoted: change('notVoted'),

    selectWord: change('words', (key, { words }) =>
      words.map(item => ({
        ...item,
        selected: key === item.key,
      })),
    ),
  },
});

export const { changeWords, selectWord, saveNotVoted } = reducer.actions;

export const chooseWord = () => async (dispatch, getState) => {
  const state = getState();
  const index = state.chooseWord.words.findIndex(item => item.selected);

  await axios.post(`/game/${state.login.gameId}/command`, {
    type: 'VOTE',
    index,
    player: {
      login: state.login.login,
      id: state.application.playerId,
    },
  });
};

export const selectWords = state => state.chooseWord.words;
export const selectNotVoted = state => state.chooseWord.notVoted;

export default reducer.reducer;
