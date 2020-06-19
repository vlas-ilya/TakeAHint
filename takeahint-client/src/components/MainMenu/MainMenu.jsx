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
  statistic,
}) {
  if (statistic && 'countOfWinRounds' in statistic) {
    const countOfLosingRounds = statistic.words.length - statistic.countOfSkippedRounds - statistic.countOfWinRounds;
    return (
      <div className="main-menu-block">
        <div className="main-menu">
          <div className="word">Игра закончена</div>
          <div className="rounds">
            <div>
              Угадано: <strong>{statistic.countOfWinRounds}</strong>
            </div>
            <div>
              Не&nbsp;угадано: <strong>{countOfLosingRounds}</strong>
            </div>
            <div>
              Пропущено: <strong>{statistic.countOfSkippedRounds}</strong>
            </div>
            <div>
              Всего: <strong>{statistic.words.length}</strong>
            </div>
          </div>
          <div className="menu">
            <div className="menu-item" role="button" onClick={onShowRules}>
              <span>Правила игры</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          {!isGaming && (
            <div className="menu-item" role="button" onClick={onQrCode}>
              <span>QR-код игры</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
