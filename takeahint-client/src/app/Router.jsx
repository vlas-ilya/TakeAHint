import { constants, selectPage } from './reducer';

import Answering from '../features/answering/Answering';
import ChooseWord from '../features/chooseWord/ChooseWord';
import FilterAssociations from '../features/filterAssociations/FilterAssociations';
import FinishPage from '../features/finish/FinishPage';
import InputAssociations from '../features/inputAssociations/InputAssociations';
import Login from '../features/login/Login';
import React from 'react';
import WaitingPlayers from '../features/waitingPlayers/WaitingPlayers';
import { useSelector } from 'react-redux';

export default function Router() {
  const page = useSelector(selectPage);

  if (window.location.pathname.startsWith('/finish')) {
    return <FinishPage />;
  }

  switch (page) {
    case constants.pages.login:
      return <Login />;
    case constants.pages.waitingPlayers:
      return <WaitingPlayers />;
    case constants.pages.chooseWord:
      return <ChooseWord />;
    case constants.pages.inputAssociations:
      return <InputAssociations />;
    case constants.pages.filterAssociations:
      return <FilterAssociations />;
    case constants.pages.answering:
      return <Answering />;
    default:
      return null;
  }
}
