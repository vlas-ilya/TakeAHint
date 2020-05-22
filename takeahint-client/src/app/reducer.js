import {
  changeAssociation,
  saveNotReady
} from "../features/inputAssociations/reducer";
import { changeGameIdValid, changeLoginValid } from "../features/login/reducer";
import { changeWords, saveNotVoted } from "../features/chooseWord/reducer";

import { answeringChangeAssociations } from "../features/answering/reducer";
import { changeAssociations } from "../features/filterAssociations/reducer";
import { changePlayers } from "../features/waitingPlayers/reducer";
import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";
import produce from "immer";
import { setParam } from "../utils/url.utils";

export const constants = {
  pages: {
    login: "LOGIN_PAGE",
    waitingPlayers: "WAITING_PLAYERS",
    chooseWord: "CHOOSE_WORD",
    inputAssociations: "INPUT_ASSOCIATIONS",
    filterAssociations: "FILTER_ASSOCIATIONS",
    answering: "ANSWERING"
  }
};

export const application = createSlice({
  name: "application",
  initialState: {
    page: constants.pages.login,
    playerId: "",
    word: "",
    isMaster: false,
    isGaming: false,
    alert: "",
    countOfWin: 0,
    countOfRounds: 0,
    master: ""
  },
  reducers: {
    changeWord: (state, action) =>
      state.word === action.payload
        ? state
        : produce(state, draftState => {
            draftState.word = action.payload;
          }),

    changePlayerId: (state, action) =>
      state.playerId === action.payload
        ? state
        : produce(state, draftState => {
            draftState.playerId = action.payload;
          }),

    changePage: (state, action) =>
      state.page === action.payload
        ? state
        : produce(state, draftState => {
            draftState.page = action.payload;
          }),

    changeIsMaster: (state, action) =>
      state.isMaster === action.payload
        ? state
        : produce(state, draftState => {
            draftState.isMaster = action.payload;
          }),

    changeCountOfWin: (state, action) =>
      state.countOfWin === action.payload
        ? state
        : produce(state, draftState => {
            draftState.countOfWin = action.payload;
          }),

    changeCountOfRounds: (state, action) =>
      state.countOfRounds === action.payload
        ? state
        : produce(state, draftState => {
            draftState.countOfRounds = action.payload;
          }),

    changeIsGaming: (state, action) =>
      state.isGaming === action.payload
        ? state
        : produce(state, draftState => {
            draftState.isGaming = action.payload;
          }),

    changeAlert: (state, action) =>
      state.alert === action.payload
        ? state
        : produce(state, draftState => {
            draftState.alert = action.payload;
          }),

    changeMaster: (state, action) =>
      state.master === action.payload
        ? state
        : produce(state, draftState => {
            draftState.master = action.payload;
          })
  }
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
  changeMaster
} = application.actions;

export const connect = readonly => (dispatch, getState) => {
  const state = getState();

  const payload = {
    gameId: state.login.gameId,
    login: readonly ? "" : state.login.login
  };

  dispatch(changeGameIdValid(payload.gameId));
  dispatch(changeLoginValid(readonly || payload.login));

  if (!(payload.gameId && (readonly || payload.login))) {
    return;
  }

  const socket = io(`ws://${window.location.host.replace("3000", "80")}`);

  setParam("gameId", payload.gameId);
  setParam("player", payload.login);

  const id = localStorage.getItem(`${state.login.gameId}/${state.login.login}`);

  if (id) {
    payload.id = id;
  }

  socket.emit("connection", payload);

  socket.on("connected", response => {
    dispatch(changePage(constants.pages.waitingPlayers));
    dispatch(changePlayerId(response.id));
    localStorage.setItem(
      `${state.login.gameId}/${state.login.login}`,
      response.id
    );
  });

  const addPlayer = response => {
    dispatch(changePlayers(response.players));
    return "ADD_PLAYER";
  };

  const startGame = response => {
    dispatch(changeIsMaster(response.isMaster));
    dispatch(changeCountOfWin(response.countOfWin));
    dispatch(changeCountOfRounds(response.countOfRounds));
    dispatch(changeIsGaming(true));
    dispatch(changeMaster(response.master));
    return "START_GAME";
  };

  const startChoiceWord = response => {
    dispatch(changePage(constants.pages.chooseWord));
    dispatch(changeWords(response.words));
    dispatch(changeWord(""));
    return "START_CHOICE_WORD";
  };

  const voted = response => {
    dispatch(saveNotVoted(response.notVotedPlayers));
    return "VOTED";
  };

  const startInputAssociation = response => {
    dispatch(changePage(constants.pages.inputAssociations));
    dispatch(changeWord(response.word));
    dispatch(changeAssociation(""));
    dispatch(saveNotReady(response.notReady));
    return "START_INPUT_ASSOCIATION";
  };

  const startFilterAssociations = response => {
    dispatch(changePage(constants.pages.filterAssociations));
    dispatch(changeAssociations(response.associations));
    return "START_FILTER_ASSOCIATIONS";
  };

  const startAnswering = response => {
    dispatch(changePage(constants.pages.answering));
    dispatch(answeringChangeAssociations(response.associations));
    return "START_ANSWERING";
  };

  const finish = response => {
    dispatch(changeAlert(response.result));
    return "FINISH";
  };

  const showResult = response => {
    window.location = `/finish?id=${response.id}`;
    return "SHOW_RESULT";
  };

  socket.on("event", response => {
    switch (response.type) {
      case "ADD_PLAYER":
        return addPlayer(response);
      case "START_GAME":
        return startGame(response);
      case "START_CHOICE_WORD":
        return startChoiceWord(response);
      case "VOTED":
        return voted(response);
      case "START_INPUT_ASSOCIATION":
        return startInputAssociation(response);
      case "START_FILTER_ASSOCIATIONS":
        return startFilterAssociations(response);
      case "START_ANSWERING":
        return startAnswering(response);
      case "FINISH":
        return finish(response);
      case "SHOW_RESULT":
        return showResult(response);
      case "RECONNECT":
        return [
          addPlayer,
          startGame,
          voted,
          startChoiceWord,
          startInputAssociation,
          startFilterAssociations,
          startAnswering,
          finish
        ].find(item => item(response) === response.state);
      default:
        console.log(response);
    }
  });
};

export const selectPage = state => state.application.page;
export const selectCurrentWord = state => state.application.word;
export const selectPlayerId = state => state.application.playerId;
export const selectIsMaster = state => state.application.isMaster;
export const selectCountOfWin = state => state.application.countOfWin;
export const selectCountOfRounds = state => state.application.countOfRounds;
export const selectIsGaming = state => state.application.isGaming;
export const selectAlert = state => state.application.alert;
export const selectMaster = state => state.application.master;

export default application.reducer;
