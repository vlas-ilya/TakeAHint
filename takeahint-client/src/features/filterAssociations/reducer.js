import { default as axios } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

export const reducer = createSlice({
  name: "filterAssociationsPage",
  initialState: {
    associations: []
  },
  reducers: {
    changeAssociations: (state, action) =>
      produce(state, draftState => {
        draftState.associations = action.payload;
      })
  }
});

export const { changeAssociations } = reducer.actions;

export const toggleAssociation = id => async (dispatch, getState) => {
  const state = getState();
  const association = state.filterAssociationsPage.associations.find(
    item => item.id === id
  );
  if (!association) {
    return;
  }
  await axios.post(`/game/${state.loginPage.gameId}/command`, {
    type: !association.markedAsValid ? "MARK_AS_VALID" : "MARK_AS_INVALID",
    id
  });
};

export const done = () => async (dispatch, getState) => {
  const state = getState();

  await axios.post(`/game/${state.loginPage.gameId}/command`, {
    type: "GO_TO_ANSWER"
  });
};

export const selectAssociations = state =>
  state.filterAssociationsPage.associations;

export default reducer.reducer;
