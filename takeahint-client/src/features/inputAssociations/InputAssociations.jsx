import React, { useState } from 'react';
import {
  changeAssociation,
  invalidAssociation,
  saveAssociation,
  selectAssociation,
  selectNotReady,
  selectValidAssociation,
} from './reducer';
import { useDispatch, useSelector } from 'react-redux';

import FormButton from '../../components/FormButton/FormButton';
import FormInput from '../../components/FormInput/FormInput';
import GamePage from '../../components/GamePage/GamePage';
import List from '../../components/List/List';
import ListItem from '../../components/List/ListItem';

export default function InputAssociations() {
  const [input, setInput] = useState(false);
  const association = useSelector(selectAssociation);
  const valid = useSelector(selectValidAssociation);
  const notReady = useSelector(selectNotReady);
  const dispatch = useDispatch();

  const _saveAssociation = () => {
    if (association) {
      setInput(true);
      dispatch(saveAssociation());
    } else {
      dispatch(invalidAssociation());
    }
  };

  return (
    <GamePage
      forMaster={
        <>
          <h2>Вы ведущий</h2>
          <p>Ваша команда придумывает подсказки</p>
          {notReady && notReady.length > 0 && (
            <List title="Не придумали подсказку" readonly>
              {notReady.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </List>
          )}
        </>
      }
      forObserver={
        <>
          <h2>Команда придумывает подсказки</h2>
          {notReady && notReady.length > 0 && (
            <List title="Не придумали подсказку" readonly>
              {notReady.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </List>
          )}
        </>
      }
    >
      <h2>Подсказки</h2>
      {!input ? (
        <>
          <FormInput
            name="association"
            label="Введите подсказку"
            value={association}
            validMessage={valid ? '' : 'Необходимо ввести подсказку'}
            onEnter={_saveAssociation}
            onChange={(value) => dispatch(changeAssociation(value))}
          />
          <FormButton onClick={_saveAssociation}>Сохранить</FormButton>
          <p>Напишите подсказку в одно слово, можно использовать любую часть речи, символы, цифры и так далее</p>
          <p>
            Нельзя использовать придуманные слова. Если несколько игроков напишут одно и то же слово, то оно убирается
            из списка подсказок
          </p>
        </>
      ) : (
        <>
          Ваша подсказка <strong>{association}</strong>
          <p>Дождитесь, когда остальные игроки введут подсказки</p>
        </>
      )}
    </GamePage>
  );
}
