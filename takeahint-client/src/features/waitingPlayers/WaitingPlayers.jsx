import { selectPlayers, start } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { selectPlayerId } from "../../app/reducer";

export default function WaitingPlayers() {
  const players = useSelector(selectPlayers);
  const playerId = useSelector(selectPlayerId);
  const dispatch = useDispatch();

  return (
    <div>
      {players.map(item => (
        <div key={item.id}>
          {item.login}
          {playerId === item.id && <span>(you)</span>}
        </div>
      ))}
      <div>
        <button onClick={() => dispatch(start())}>Start</button>
      </div>
    </div>
  );
}
