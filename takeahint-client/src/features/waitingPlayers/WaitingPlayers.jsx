import { selectPlayerId, selectPlayers } from "../../app/reduser";

import React from "react";
import { useSelector } from "react-redux";

export default function WaitingPlayers() {
  const players = useSelector(selectPlayers);
  const playerId = useSelector(selectPlayerId);

  return (
    <div>
      {players.map(item => (
        <div key={item.id}>
          {item.login}
          {playerId === item.id && <span>(you)</span>}
        </div>
      ))}
    </div>
  );
}
