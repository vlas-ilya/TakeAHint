import {
  changeAnswer,
  invalidAnswer,
  selectAnswer,
  selectAssociations,
  selectValidAnswer,
  sendAnswer,
  sendEmptyAnswer,
} from './reducer';
import { useDispatch, useSelector } from 'react-redux';

import FormButton from '../../components/FormButton/FormButton';
import FormInput from '../../components/FormInput/FormInput';
import GamePage from '../../components/GamePage/GamePage';
import List from '../../components/List/List';
import ListItem from '../../components/List/ListItem';
import React from 'react';

export default function Answering() {
  const associations = useSelector(selectAssociations);
  const answer = useSelector(selectAnswer);
  const valid = useSelector(selectValidAnswer);
  const dispatch = useDispatch();

  return (
    <GamePage
      forMaster={
        <>
          <h2>Угадайте слово</h2>
          <List title="Список ассоциаций">
            {associations.map(item => (
              <ListItem key={item.id}>{item.value}</ListItem>
            ))}
          </List>
          <FormInput
            label="Введите ответ"
            name="answer"
            value={answer}
            validMessage={valid ? '' : 'Необходимо ввести ответ'}
            onChange={value => dispatch(changeAnswer(value))}
          />

          <FormButton
            onClick={() => {
              if (answer) {
                dispatch(sendAnswer());
              } else {
                dispatch(invalidAnswer());
              }
            }}
          >
            Ответить
          </FormButton>

          <FormButton className="grey" onClick={() => dispatch(sendEmptyAnswer())}>
            Пропустить
          </FormButton>

          <p>
            По списку ассоциаций, который подготовила для вас ваша команда, попробуйте догадаться какое слово было
            загаданно
          </p>
          <p>
            Введите ответ, соблюдая все правила орфографии, и нажмите <strong>Ответить</strong>
          </p>
        </>
      }
    >
      <h2>Ведущий отгадывает слово</h2>
      <List title="Список ассоциаций">
        {associations.map(item => (
          <ListItem key={item.id}>{item.value}</ListItem>
        ))}
      </List>
    </GamePage>
  );
}
