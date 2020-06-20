import Form from '../../components/Form/Form';
import FormButton from '../../components/FormButton/FormButton';
import FormInput from '../../components/FormInput/FormInput';
import React from 'react';
import { generateCode } from '../../utils/generate.utils';

export default function LoginForm({
  gameId,
  gameIdValid,
  onGameIdChange,
  onQRCodeReader,
  login,
  loginValid,
  onLoginChange,
  onLogin,
}) {
  return (
    <Form className="small">
      <div>
        <FormInput
          name="gameId"
          label="Номер комнаты"
          validMessage={gameIdValid ? '' : 'Необходимо указать номер комнаты'}
          value={gameId}
          onEnter={() => onLogin()}
          onChange={onGameIdChange}
          onSync={() => onGameIdChange(generateCode())}
        />

        <FormInput
          name="login"
          label="Логин"
          validMessage={loginValid ? '' : 'Необходимо указать логин'}
          value={login}
          autoComplete={'on'}
          onEnter={() => onLogin()}
          onChange={onLoginChange}
        />

        <FormButton onClick={() => onLogin()}>Подключиться</FormButton>

        {window.navigator.mediaDevices && (
          <FormButton className="grey" onClick={() => onQRCodeReader()}>
            Подключиться по QR-коду
          </FormButton>
        )}

        <FormButton className="grey" onClick={() => onLogin(true)}>
          Readonly
        </FormButton>

        <p>
          В режиме игры <strong>Readonly</strong> на экране будет отображаться только статистика и текущий статус игры
        </p>
      </div>
    </Form>
  );
}
