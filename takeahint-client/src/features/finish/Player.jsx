import ListItem from '../../components/List/ListItem';
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
    <ListItem>
      <div className="player">
        <div className="login">{login}</div>
        <div className="associations">
          Подсказки (Не удаленные/Удаленные):{' '}
          <strong>
            {goodAssociationsCount}/{badAssociationsCount}
          </strong>
        </div>
        <div className="master">
          Слова (Угадано/Не угадано/Пропущено):{' '}
          <strong>
            {winCount}/{losingCount}/{skipCount}
          </strong>
        </div>
      </div>
    </ListItem>
  );
}
