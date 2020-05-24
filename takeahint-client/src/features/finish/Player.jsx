import React from 'react';

export default function Player({
  login,
  losingCount,
  skipCount,
  winCount,
  badAssociationsCount,
  goodAssociationsCount,
}) {
  return (
    <div className="player">
      <div className="login">{login}</div>
      <div className="associations">
        Подсказки (Удачные/Удаленные):{' '}
        <strong>
          {goodAssociationsCount}/{badAssociationsCount}
        </strong>
      </div>
      <div className="master">
        Слова (Угадано/Неугадано/Пропущено{' '}
        <strong>
          {winCount}/{losingCount}/{skipCount}
        </strong>
      </div>
    </div>
  );
}
