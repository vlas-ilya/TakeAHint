import './styles.scss';

import React from 'react';

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
}) {
  return (
    <div className="main-menu-block">
      <div className="main-menu">
        <div className="word">
          {showGameId ? <span>{gameId}</span> : word ? <span>{word}</span> : <span>Намек понял</span>}
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
            </>
          )}
        </div>
        <div className="menu">
          <div className="menu-item" role="button" onClick={onShowRules}>
            <span>Правила игры</span>
          </div>
          <a
            className="menu-item"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.google.com/search?q=%D0%BA%D1%83%D0%BF%D0%B8%D1%82%D1%8C+%D0%B8%D0%B3%D1%80%D1%83+%D0%BD%D0%B0%D0%BC%D0%B5%D0%BA+%D0%BF%D0%BE%D0%BD%D1%8F%D0%BB"
          >
            <span>Купить игру</span>
          </a>
          {!isGaming && (
            <div className="menu-item" role="button" onClick={onQrCode}>
              <span>QR код игры</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
