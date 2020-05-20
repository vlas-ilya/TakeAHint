import {
  selectCountOfRounds,
  selectCountOfWin,
  selectIsGaming,
  selectIsMaster
} from "../../app/reducer";

import React from "react";
import { selectLogin } from "../../features/login/reducer";
import { useSelector } from "react-redux";

export default function MainMenu() {
  const isMaster = useSelector(selectIsMaster);
  const countOfWin = useSelector(selectCountOfWin);
  const countOfRounds = useSelector(selectCountOfRounds);
  const login = useSelector(selectLogin);
  const isGaming = useSelector(selectIsGaming);

  return (
    <div>
      {isGaming && (
        <>
          {isMaster && <div>Master</div>}
          <div>Count of win {countOfWin}</div>
          <div>Count of rounds {countOfRounds + 1}</div>
          <div>Login {login}</div>
        </>
      )}
    </div>
  );
}
