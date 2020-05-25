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
        <div className="login">
          <strong>{login}</strong>
        </div>
        <div className="player-statistic">
          <div className="associations" title="Не удаленные/Удаленные">
            <strong>
              {goodAssociationsCount} / {badAssociationsCount}
            </strong>
          </div>
          <div className="master" title="Угадано/Не угадано/Пропущено">
            <strong>
              {winCount} / {losingCount} / {skipCount}
            </strong>
          </div>
        </div>
      </div>
    </ListItem>
  );
}
