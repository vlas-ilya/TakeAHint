import { answeringPageChangeAssociations } from "../features/answering/reducer";
import { changeAssociations } from "../features/filterAssociations/reducer";
import { changePlayers } from "../features/waitingPlayers/reducer";
import { changeWords } from "../features/chooseWord/reducer";
import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";
import produce from "immer";

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
    isMaster: false
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
          })
  }
});

export const {
  changePage,
  changePlayerId,
  changeIsMaster,
  changeWord
} = application.actions;

export const connect = () => (dispatch, getState) => {
  const state = getState();
  const socket = io("ws://localhost:3003", {
    query: {
      token: "123"
    }
  });
  const payload = {
    gameId: state.loginPage.gameId,
    login: state.loginPage.login
  };
  const id = localStorage.getItem(
    `${state.loginPage.gameId}/${state.loginPage.login}`
  );
  if (id) {
    payload.id = id;
  }
  socket.emit("connection", payload);

  socket.on("connected", response => {
    dispatch(changePage(constants.pages.waitingPlayers));
    dispatch(changePlayerId(response.id));
    localStorage.setItem(
      `${state.loginPage.gameId}/${state.loginPage.login}`,
      response.id
    );
  });

  socket.on("event", response => {
    if (response.type === "ADD_PLAYER") {
      dispatch(changePlayers(response.players));
    } else if (response.type === "START_GAME") {
      dispatch(changeIsMaster(response.isMaster));
    } else if (response.type === "START_CHOICE_WORD") {
      dispatch(changePage(constants.pages.chooseWord));
      dispatch(changeWords(response.words));
    } else if (response.type === "START_INPUT_ASSOCIATION") {
      dispatch(changePage(constants.pages.inputAssociations));
      dispatch(changeWord(response.word));
    } else if (response.type === "START_FILTER_ASSOCIATIONS") {
      dispatch(changePage(constants.pages.filterAssociations));
      dispatch(changeAssociations(response.associations));
    } else if (response.type === "START_ANSWERING") {
      dispatch(changePage(constants.pages.answering));
      dispatch(answeringPageChangeAssociations(response.associations));
    } else if (response.type === "FINISH") {
      alert(response.result);
    } else if (response.type === "RECONNECT") {
      [
        () => {
          dispatch(changePlayers(response.players));
          return "ADD_PLAYER";
        },
        () => {
          dispatch(changePage(constants.pages.chooseWord));
          dispatch(changeWords(response.words));
          dispatch(changeIsMaster(response.isMaster));
          return "START_CHOICE_WORD";
        },
        () => {
          dispatch(changePage(constants.pages.inputAssociations));
          dispatch(changeWord(response.word));
          return "START_INPUT_ASSOCIATION";
        },
        () => {
          dispatch(changePage(constants.pages.filterAssociations));
          dispatch(changeAssociations(response.associations));
          return "START_FILTER_ASSOCIATIONS";
        },
        () => {
          dispatch(changePage(constants.pages.answering));
          dispatch(answeringPageChangeAssociations(response.associations));
          return "START_ANSWERING";
        }
      ].find(item => item() === response.state);
    } else {
      console.log(response);
    }
  });
};

export const selectPage = state => state.application.page;
export const selectCurrentWord = state => state.application.word;
export const selectPlayerId = state => state.application.playerId;
export const selectIsMaster = state => state.application.isMaster;

export default application.reducer;
