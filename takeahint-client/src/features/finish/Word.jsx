import ListItem from '../../components/List/ListItem';
import React from 'react';
import classNames from 'classnames';

export default function Word({ value, status, associations }) {
  return (
    <ListItem>
      <div className="word-block">
        <div className="word">
          <div className="value">
            <strong>{value}</strong>
          </div>
          <div className="status">
            <span>{status === 'WIN' ? 'Угадано' : status === 'SKIP' ? 'Пропущено' : 'Не угадано'}</span>
          </div>
        </div>
        <div className="associations">
          <strong>Подсказки:</strong>{' '}
          {associations.map((association, index) => (
            <span
              title={association.player}
              className={classNames('association', { invalid: !association.good })}
              key={association.value}
            >
              {association.value}
              {index !== associations.length - 1 && ','}
            </span>
          ))}
        </div>
      </div>
    </ListItem>
  );
}
