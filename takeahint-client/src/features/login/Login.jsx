import { changeGameId, changeLogin, selectGameId, selectGameIdValid, selectLogin, selectLoginValid } from './reducer';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';
import Page from '../../components/Page/Page';
import React from 'react';
import { connect } from '../../app/reducer';

export default function Login() {
  const login = useSelector(selectLogin);
  const loginValid = useSelector(selectLoginValid);
  const gameId = useSelector(selectGameId);
  const gameIdValid = useSelector(selectGameIdValid);
  const dispatch = useDispatch();

  return (
    <Page className="login-page">
      <LoginForm
        gameId={gameId}
        gameIdValid={gameIdValid}
        login={login}
        loginValid={loginValid}
        onGameIdChange={value => dispatch(changeGameId(value))}
        onLoginChange={value => dispatch(changeLogin(value))}
        onLogin={readonly => dispatch(connect(readonly))}
      />
    </Page>
  );
}
