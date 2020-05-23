import './styles.scss';

import { done, selectAssociations, toggleAssociation } from './reducer';
import { useDispatch, useSelector } from 'react-redux';

import FormButton from '../../components/FormButton/FormButton';
import GamePage from '../../components/GamePage/GamePage';
import List from '../../components/List/List';
import ListItem from '../../components/List/ListItem';
import React from 'react';
import classNames from 'classnames';

export default function FilterAssociations() {
  const associations = useSelector(selectAssociations);
  const dispatch = useDispatch();

  return (
    <GamePage
      className="associations"
      forMaster={
        <>
          <h2>Ваша команда придумывает подсказки</h2>
        </>
      }
      forObserver={
        <>
          <h2>Команда придумывает подсказки</h2>
        </>
      }
    >
      <h2>Уберите неподходящие подсказки</h2>
      <List title="Список подсказок">
        {associations.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => item.valid && dispatch(toggleAssociation(item.id))}
            className={classNames('associations_item', {
              selected: !item.valid || !item.markedAsValid,
            })}
          >
            <div>
              {item.value}
              {!item.valid && <span className="deleted">Удалено</span>}
              {!item.markedAsValid && <span className="deleted">Будет удалено</span>}
            </div>
          </ListItem>
        ))}
      </List>
      <FormButton onClick={() => dispatch(done())}>Сохранить</FormButton>
      <p>Отметьте подсказки, которые не подходят по правилам</p>
      <p>
        Подсказка должна быть в одно слово, можно использовать любую часть речи, символы, цифры и так далее. Нельзя
        использовать придуманные слова
      </p>
    </GamePage>
  );
}
