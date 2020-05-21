import "./styles.scss";

import {
  selectCountOfRounds,
  selectCountOfWin,
  selectCurrentWord,
  selectIsGaming,
  selectIsMaster,
  selectMaster
} from "../../app/reducer";

import React from "react";
import { selectLogin } from "../../features/login/reducer";
import { useSelector } from "react-redux";

export default function MainMenu() {
  const isMaster = useSelector(selectIsMaster);
  const countOfWin = useSelector(selectCountOfWin);
  const countOfRounds = useSelector(selectCountOfRounds);
  const login = useSelector(selectLogin);
  const word = useSelector(selectCurrentWord);
  const master = useSelector(selectMaster);
  const isGaming = useSelector(selectIsGaming);

  return (
    <div className="main-menu-block">
      <div className="main-menu">
        {isGaming && (
          <>
            <div className="word">
              {word ? <span>{word}</span> : <span>Намек понял</span>}
            </div>
            <div className="rounds">
              <div>
                <strong>{login}</strong>
              </div>
              <div>
                Побед: <strong>{countOfWin}</strong>
              </div>
              <div>
                Осталось игр: <strong>{countOfRounds + 1}</strong>
              </div>
              <div>
                {isMaster ? (
                  <strong>Вы ведущий</strong>
                ) : master ? (
                  <span>
                    Ведущий: <strong>{master}</strong>
                  </span>
                ) : null}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
