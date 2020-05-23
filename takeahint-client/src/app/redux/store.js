import answering from '../../features/answering/reducer';
import application from './reducer';
import chooseWord from '../../features/chooseWord/reducer';
import { configureStore } from '@reduxjs/toolkit';
import filterAssociations from '../../features/filterAssociations/reducer';
import inputAssociations from '../../features/inputAssociations/reducer';
import login from '../../features/login/reducer';
import waitingPlayers from '../../features/waitingPlayers/reducer';

export default configureStore({
  reducer: {
    application,
    login,
    waitingPlayers,
    chooseWord,
    inputAssociations,
    filterAssociations,
    answering,
  },
});
