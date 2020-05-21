import { default as axios } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

export const reducer = createSlice({
  name: "inputAssociationsPage",
  initialState: {
    association: "",
    valid: true,
    notReady: []
  },
  reducers: {
    changeAssociation: (state, action) =>
      state.association === action.payload
        ? state
        : produce(state, draftState => {
            draftState.association = action.payload;
          }),

    saveNotReady: (state, action) =>
      produce(state, draftState => {
        draftState.notReady = action.payload;
      }),

    invalidAssociation: state => ({
      ...state,
      valid: false
    })
  }
});

export const {
  changeAssociation,
  invalidAssociation,
  saveNotReady
} = reducer.actions;

export const saveAssociation = () => async (dispatch, getState) => {
  const state = getState();

  await axios.post(`/game/${state.loginPage.gameId}/command`, {
    type: "INPUT_ASSOCIATION",
    association: state.inputAssociationsPage.association,
    player: {
      login: state.loginPage.login,
      id: state.application.playerId
    }
  });
};

export const selectAssociation = state =>
  state.inputAssociationsPage.association;
export const selectValidAssociation = state =>
  state.inputAssociationsPage.valid;
export const selectNotReady = state => state.inputAssociationsPage.notReady;

export default reducer.reducer;
