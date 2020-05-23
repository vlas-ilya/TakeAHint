import './styles.scss';

import React, { useState } from 'react';
import { chooseWord, selectNotVoted, selectWord, selectWords } from './reducer';
import { useDispatch, useSelector } from 'react-redux';

import FormButton from '../../components/FormButton/FormButton';
import GamePage from '../../components/GamePage/GamePage';
import List from '../../components/List/List';
import ListItem from '../../components/List/ListItem';
import classNames from 'classnames';

export default function ChooseWord() {
  const [choose, setChoose] = useState(false);
  const words = useSelector(selectWords);
  const notVoted = useSelector(selectNotVoted);
  const dispatch = useDispatch();

  return (
    <GamePage
      className="choose_word"
      forMaster={
        <>
          <h2>Ваша команда выбирает слово для текущего раунда</h2>
          {notVoted && notVoted.length > 0 && (
            <List title="Не выбрали слово">
              {notVoted.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </List>
          )}
        </>
      }
      forObserver={
        <>
          <h2>Команда выбирает слово для текущего раунда</h2>
          {notVoted && notVoted.length > 0 && (
            <List title="Не выбрали слово">
              {notVoted.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </List>
          )}
        </>
      }
    >
      <h2>Выберите слово для текущего раунда</h2>
      {!choose ? (
        <>
          <List title="Список слов">
            {words.map((item) => (
              <ListItem
                key={item.key}
                className={classNames({
                  selected: item.selected,
                })}
                onClick={() => dispatch(selectWord(item.key))}
              >
                {item.word}
              </ListItem>
            ))}
          </List>

          <FormButton
            onClick={() => {
              if (words.find((item) => item.selected)) {
                setChoose(true);
                dispatch(chooseWord());
              }
            }}
          >
            Выбрать
          </FormButton>
          <p>Слово будет выбрано голосованием</p>
        </>
      ) : (
        <>
          Выбранное слово: <strong>{words.find((item) => item.selected).word}</strong>
          <p>Дождитесь, когда остальные игроки тоже сделают выбор</p>
        </>
      )}
    </GamePage>
  );
}
