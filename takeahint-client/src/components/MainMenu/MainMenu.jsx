import './styles.scss';

import React from 'react';
import constants from '../../utils/constansts';

export default function MainMenu({
  isMaster,
  countOfWin,
  countOfRounds,
  login,
  word,
  master,
  isGaming,
  onShowRules,
  onQrCode,
  gameId,
  showGameId,
  page,
}) {
  return (
    <div className="main-menu-block">
      <div className="main-menu">
        <div className="word">
          {showGameId ? <span>Комната: {gameId}</span> : word ? <span>Слово: {word}</span> : <span>Намек понял</span>}
        </div>
        <div className="rounds">
          {isGaming && (
            <>
              <div>
                <strong>{login}</strong>
              </div>
              <div>
                Побед: <strong>{countOfWin}</strong>
              </div>
              <div>
                Осталось раундов: <strong>{countOfRounds + 1}</strong>
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
            </>
          )}
        </div>
        <div className="menu">
          <div className="menu-item" role="button" onClick={onShowRules}>
            <span>Правила игры</span>
          </div>
          {!isGaming && page !== constants.pages.finish && (
            <div className="menu-item" role="button" onClick={onQrCode}>
              <span>QR код игры</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
