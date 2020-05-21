import {
  changeGameId,
  changeLogin,
  selectGameId,
  selectLogin
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";

import GrCode from "../../components/QrCode/GrCode";
import LoginForm from "./LoginForm";
import Page from "../../components/Page/Page";
import React from "react";
import { connect } from "../../app/reducer";

export default function Login() {
  const login = useSelector(selectLogin);
  const gameId = useSelector(selectGameId);
  const dispatch = useDispatch();

  return (
    <Page className="login-page">
      <LoginForm
        gameId={gameId}
        login={login}
        onGameIdChange={value => dispatch(changeGameId(value))}
        onLoginChange={value => dispatch(changeLogin(value))}
        onLogin={() => dispatch(connect())}
      />
      <GrCode />
    </Page>
  );
}
