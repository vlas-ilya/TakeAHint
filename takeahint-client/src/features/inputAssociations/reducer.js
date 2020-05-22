import { default as axios } from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import produce from 'immer';

export const reducer = createSlice({
  name: 'inputAssociations',
  initialState: {
    association: '',
    valid: true,
    notReady: [],
  },
  reducers: {
    changeAssociation: (state, action) =>
      state.association === action.payload
        ? state
        : produce(state, (draftState) => {
            draftState.association = action.payload;
          }),

    saveNotReady: (state, action) =>
      state.notReady === action.payload
        ? state
        : produce(state, (draftState) => {
            draftState.notReady = action.payload;
          }),

    invalidAssociation: (state) => ({
      ...state,
      valid: false,
    }),
  },
});

export const { changeAssociation, invalidAssociation, saveNotReady } = reducer.actions;

export const saveAssociation = () => async (dispatch, getState) => {
  const state = getState();

  await axios.post(`/game/${state.login.gameId}/command`, {
    type: 'INPUT_ASSOCIATION',
    association: state.inputAssociations.association,
    player: {
      login: state.login.login,
      id: state.application.playerId,
    },
  });
};

export const selectAssociation = (state) => state.inputAssociations.association;
export const selectValidAssociation = (state) => state.inputAssociations.valid;
export const selectNotReady = (state) => state.inputAssociations.notReady;

export default reducer.reducer;
