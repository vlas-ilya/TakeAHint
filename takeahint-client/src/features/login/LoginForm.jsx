import Form from "../../components/Form/Form";
import FormButton from "../../components/FormButton/FormButton";
import FormInput from "../../components/FormInput/FormInput";
import React from "react";

export default function LoginForm({
  gameId,
  onGameIdChange,
  login,
  onLoginChange,
  onLogin
}) {
  return (
    <Form className="small">
      <div>
        <FormInput
          name="gameId"
          label="Номер комнаты"
          value={gameId}
          onChange={onGameIdChange}
        />

        <FormInput
          name="login"
          label="Логин"
          value={login}
          onChange={onLoginChange}
        />

        <FormButton onClick={onLogin}>Подключиться</FormButton>

        <FormButton className="grey" onClick={onLogin}>
          Read only
        </FormButton>

        <p>
          В режиме игры <strong>Read only</strong> на экране будет отображаться
          только статистика и текущий статус игры
        </p>
      </div>
    </Form>
  );
}
