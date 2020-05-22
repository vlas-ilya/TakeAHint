import { default as axios } from 'axios';
import { change } from '../../utils/utils';
import { createSlice } from '@reduxjs/toolkit';

export const reducer = createSlice({
  name: 'filterAssociations',
  initialState: {
    associations: [],
  },
  reducers: {
    changeAssociations: change('associations'),
  },
});

export const { changeAssociations } = reducer.actions;

export const toggleAssociation = id => async (dispatch, getState) => {
  const state = getState();
  const association = state.filterAssociations.associations.find(item => item.id === id);
  if (!association) {
    return;
  }
  await axios.post(`/game/${state.login.gameId}/command`, {
    type: !association.markedAsValid ? 'MARK_AS_VALID' : 'MARK_AS_INVALID',
    id,
  });
};

export const done = () => async (dispatch, getState) => {
  const state = getState();

  await axios.post(`/game/${state.login.gameId}/command`, {
    type: 'GO_TO_ANSWER',
  });
};

export const selectAssociations = state => state.filterAssociations.associations;

export default reducer.reducer;
