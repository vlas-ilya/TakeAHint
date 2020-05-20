import {
  changeGameId,
  changeLogin,
  connect,
  selectGameId,
  selectLogin
} from "../../app/reduser";
import { useDispatch, useSelector } from "react-redux";

import React from "react";

export default function Login() {
  const login = useSelector(selectLogin);
  const gameId = useSelector(selectGameId);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <label htmlFor="gameId">Game id:</label>
        <input
          name="gameId"
          type="text"
          value={gameId}
          onChange={e => dispatch(changeGameId(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="login">Login:</label>
        <input
          name="login"
          type="text"
          value={login}
          onChange={e => dispatch(changeLogin(e.target.value))}
        />
      </div>

      <div>
        <button onClick={() => dispatch(connect())}>Connect</button>
      </div>
    </div>
  );
}
