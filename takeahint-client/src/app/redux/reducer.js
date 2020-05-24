import { answeringChangeAssociations, changeAnswer } from '../../features/answering/reducer';
import { changeAssociation, saveNotReady } from '../../features/inputAssociations/reducer';
import { changeGameIdValid, changeLoginValid } from '../../features/login/reducer';
import { changeWords, saveNotVoted } from '../../features/chooseWord/reducer';
import { getParam, setParam } from '../../utils/url.utils';

import { default as axios } from 'axios';
import { change } from '../../utils/redux.utils';
import { changeAssociations } from '../../features/filterAssociations/reducer';
import { changePlayers } from '../../features/waitingPlayers/reducer';
import constants from '../../utils/constansts';
import { createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';

export const application = createSlice({
  name: 'application',
  initialState: {
    page: constants.pages.login,
    playerId: '',
    word: '',
    isMaster: false,
    isGaming: false,
    alert: '',
    countOfWin: 0,
    countOfRounds: 0,
    master: '',
    modal: '',
  },
  reducers: {
    changeWord: change('word'),
    changePlayerId: change('playerId'),
    changePage: change('page'),
    changeIsMaster: change('isMaster'),
    changeCountOfWin: change('countOfWin'),
    changeCountOfRounds: change('countOfRounds'),
    changeIsGaming: change('isGaming'),
    changeAlert: change('alert'),
    changeMaster: change('master'),
    changeModal: change('modal'),
  },
});

export const {
  changePage,
  changePlayerId,
  changeIsMaster,
  changeWord,
  changeCountOfWin,
  changeCountOfRounds,
  changeIsGaming,
  changeAlert,
  changeMaster,
  changeModal,
} = application.actions;

export const checkAnswer = (correct) => async (dispatch, getState, state = getState()) => {
  dispatch(changeModal(''));

  await axios.post(`/game/${state.login.gameId}/command`, {
    type: 'CHECKED_ANSWER',
    correct,
  });
};

export const connect = (readonly) => (dispatch, getState, state = getState()) => {
  const payload = {
    gameId: state.login.gameId,
    login: readonly ? '' : state.login.login,
  };

  dispatch(changeGameIdValid(payload.gameId));
  dispatch(changeLoginValid(readonly || payload.login));

  if (!(payload.gameId && (readonly || payload.login))) {
    return;
  }

  const protocol = window.location.protocol.startsWith('https') ? 'wss' : 'ws';
  const host = window.location.host.endsWith('3000')
    ? window.location.host.replace('3000', '8080')
    : window.location.host;
  const socket = io(`${protocol}://${host}`);

  setParam('gameId', payload.gameId);
  setParam('player', payload.login);
  const id = getParam('userId', localStorage.getItem(`${state.login.gameId}/${state.login.login}`));

  if (id) {
    payload.id = id;
  }

  socket.emit('connection', payload);

  let connectInterval = 0;

  socket.on('connected', (response) => {
    clearInterval(connectInterval);
    payload.id = response.id;
    dispatch(changePage(constants.pages.waitingPlayers));
    dispatch(changePlayerId(response.id));
    setParam('userId', response.id);
    localStorage.setItem(`${state.login.gameId}/${state.login.login}`, response.id);
  });

  socket.on('disconnect', () => {
    socket.emit('connection', payload);
    connectInterval = setInterval(() => socket.open(), 1000);
    socket.open();
  });

  const addPlayer = (response) => {
    dispatch(changePlayers(response.players));
    return 'ADD_PLAYER';
  };

  const startGame = (response) => {
    dispatch(changeModal(''));
    dispatch(changeIsMaster(response.isMaster));
    dispatch(changeCountOfWin(response.countOfWin));
    dispatch(changeCountOfRounds(response.countOfRounds));
    dispatch(changeIsGaming(true));
    dispatch(changeMaster(response.master));
    return 'START_GAME';
  };

  const startChoiceWord = (response) => {
    dispatch(changePage(constants.pages.chooseWord));
    dispatch(changeWords(response.words));
    dispatch(changeWord(''));
    return 'START_CHOICE_WORD';
  };

  const voted = (response) => {
    dispatch(saveNotVoted(response.notVotedPlayers));
    return 'VOTED';
  };

  const startInputAssociation = (response) => {
    dispatch(changePage(constants.pages.inputAssociations));
    dispatch(changeWord(response.word));
    dispatch(changeAssociation(''));
    dispatch(saveNotReady(response.notReady));
    return 'START_INPUT_ASSOCIATION';
  };

  const startFilterAssociations = (response) => {
    dispatch(changePage(constants.pages.filterAssociations));
    dispatch(changeAssociations(response.associations));
    return 'START_FILTER_ASSOCIATIONS';
  };

  const startAnswering = (response) => {
    dispatch(changePage(constants.pages.answering));
    dispatch(changeAnswer(''));
    dispatch(answeringChangeAssociations(response.associations));
    dispatch(changeAlert(''));
    return 'START_ANSWERING';
  };

  const checkAnswer = (response) => {
    dispatch(changeWord(response.word));
    dispatch(changeAnswer(response.answer));
    dispatch(changeModal(constants.modals.checkAnswer));
    return 'CHECK_ANSWER';
  };

  const finish = (response) => {
    dispatch(changeModal(''));
    dispatch(changeAlert(response.result));
    return 'FINISH';
  };

  const showResult = (response) => {
    dispatch(changePage(constants.pages.finish));
    window.history.replaceState(undefined, undefined, `/finish?id=${response.id}`);
    return 'SHOW_RESULT';
  };

  socket.on('event', (response) => {
    switch (response.type) {
      case 'ADD_PLAYER':
        return addPlayer(response);
      case 'START_GAME':
        return startGame(response);
      case 'START_CHOICE_WORD':
        return startChoiceWord(response);
      case 'VOTED':
        return voted(response);
      case 'START_INPUT_ASSOCIATION':
        return startInputAssociation(response);
      case 'START_FILTER_ASSOCIATIONS':
        return startFilterAssociations(response);
      case 'START_ANSWERING':
        return startAnswering(response);
      case 'FINISH':
        return finish(response);
      case 'SHOW_RESULT':
        return showResult(response);
      case 'CHECK_ANSWER':
        return checkAnswer(response);
      case 'RECONNECT':
        return [
          addPlayer,
          startGame,
          voted,
          startChoiceWord,
          startInputAssociation,
          startFilterAssociations,
          startAnswering,
          finish,
          checkAnswer,
        ].find((item) => item(response) === response.state);
      default:
        console.log(response);
    }
  });
};

export const selectPage = (state) => state.application.page;
export const selectCurrentWord = (state) => state.application.word;
export const selectPlayerId = (state) => state.application.playerId;
export const selectIsMaster = (state) => state.application.isMaster;
export const selectCountOfWin = (state) => state.application.countOfWin;
export const selectCountOfRounds = (state) => state.application.countOfRounds;
export const selectIsGaming = (state) => state.application.isGaming;
export const selectAlert = (state) => state.application.alert;
export const selectMaster = (state) => state.application.master;
export const selectModal = (state) => state.application.modal;

export default application.reducer;
