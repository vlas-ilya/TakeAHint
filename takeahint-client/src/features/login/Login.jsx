import React, { useState } from 'react';
import { changeGameId, changeLogin, selectGameId, selectGameIdValid, selectLogin, selectLoginValid } from './reducer';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';
import Page from '../../components/Page/Page';
import { connect } from '../../app/redux/reducer';
import { setParam } from '../../utils/url.utils';

export default function Login() {
  const [loginChanged, setLoginChanged] = useState(false);
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
        onGameIdChange={(value) => {
          setParam('gameId', value);
          dispatch(changeGameId(value));
        }}
        onLoginChange={(value) => {
          setParam('player', value);
          setLoginChanged(true);
          dispatch(changeLogin(value));
        }}
        onLogin={(readonly) => {
          if (loginChanged) {
            setParam('userId', '');
          }
          dispatch(connect(readonly));
        }}
      />
    </Page>
  );
}
