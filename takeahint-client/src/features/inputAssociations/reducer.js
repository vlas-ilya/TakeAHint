import { default as axios } from 'axios';
import { change } from '../../utils/redux.utils';
import { createSlice } from '@reduxjs/toolkit';

export const reducer = createSlice({
  name: 'inputAssociations',
  initialState: {
    association: '',
    valid: true,
    notReady: [],
  },
  reducers: {
    changeAssociation: change('association'),
    saveNotReady: change('notReady'),
    invalidAssociation: change('notReady', false),
  },
});

export const { changeAssociation, invalidAssociation, saveNotReady } = reducer.actions;

export const saveAssociation = () => (dispatch, getState, state = getState()) =>
  axios.post(`/game/${state.login.gameId}/command`, {
    type: 'INPUT_ASSOCIATION',
    association: state.inputAssociations.association,
    player: {
      login: state.login.login,
      id: state.application.playerId,
    },
  });

export const selectAssociation = (state) => state.inputAssociations.association;
export const selectValidAssociation = (state) => state.inputAssociations.valid;
export const selectNotReady = (state) => state.inputAssociations.notReady;

export default reducer.reducer;
