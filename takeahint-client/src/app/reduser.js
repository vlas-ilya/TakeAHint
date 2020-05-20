import { counterSlice } from "../features/counter/counterSlice";
import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";
import produce from "immer";

export const constants = {
  pages: {
    login: "LOGIN_PAGE",
    waitingPlayers: "WAITING_PLAYERS"
  }
};

export const application = createSlice({
  name: "application",
  initialState: {
    page: constants.pages.login,
    playerId: "",
    loginPage: {
      gameId: "",
      login: ""
    },
    players: []
  },
  reducers: {
    changeGameId: (state, action) =>
      produce(state, draftState => {
        draftState.loginPage.gameId = action.payload;
      }),

    changeLogin: (state, action) =>
      produce(state, draftState => {
        draftState.loginPage.login = action.payload;
      }),

    changePlayerId: (state, action) =>
      produce(state, draftState => {
        draftState.playerId = action.payload;
      }),

    changePage: (state, action) =>
      produce(state, draftState => {
        draftState.page = action.payload;
      }),

    changePlayers: (state, action) =>
      produce(state, draftState => {
        draftState.players = action.payload;
      })
  }
});

export const {
  changeGameId,
  changeLogin,
  changePage,
  changePlayerId,
  changePlayers
} = application.actions;
export const connect = () => (dispatch, getState) => {
  const state = getState();
  const socket = io("ws://localhost:3003", {
    query: {
      token: "123"
    }
  });

  socket.emit("connection", {
    gameId: state.application.loginPage.gameId,
    login: state.application.loginPage.login
  });

  socket.on("connected", response => {
    dispatch(changePage(constants.pages.waitingPlayers));
    dispatch(changePlayerId(response.id));
  });

  socket.on("event", response => {
    if (response.players) {
      dispatch(changePlayers(response.players));
    } else {
      console.log(response);
    }
  });
};

export const selectPage = state => state.application.page;
export const selectGameId = state => state.application.loginPage.gameId;
export const selectLogin = state => state.application.loginPage.login;
export const selectPlayers = state => state.application.players;
export const selectPlayerId = state => state.application.playerId;

export default application.reducer;
