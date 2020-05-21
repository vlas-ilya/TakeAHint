import { default as axios } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

export const reducer = createSlice({
  name: "inputAssociationsPage",
  initialState: {
    association: ""
  },
  reducers: {
    changeAssociation: (state, action) =>
      state.association === action.payload
        ? state
        : produce(state, draftState => {
            draftState.association = action.payload;
          })
  }
});

export const { changeAssociation } = reducer.actions;

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

export default reducer.reducer;
