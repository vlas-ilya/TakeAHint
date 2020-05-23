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
          <List title="Список подсказок">
            {associations.map((item) => (
              <ListItem key={item.id}>{item.value}</ListItem>
            ))}
          </List>
          <FormInput
            label="Введите ответ"
            name="answer"
            value={answer}
            validMessage={valid ? '' : 'Необходимо ввести ответ'}
            onChange={(value) => dispatch(changeAnswer(value))}
          />

          <div className="actions">
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
          </div>

          <p>По подсказкам, подготовленными для вас вашей командой, попробуйте догадаться, какое слово было загадано</p>
          <p>
            Если вы не можете угадать слово, не рискуйте и нажмите <strong>Пропустить</strong>, чтобы не терять
            дополнительно раунд в случае ошибки
          </p>
        </>
      }
    >
      <h2>Ведущий отгадывает слово</h2>
      <List title="Список подсказок">
        {associations.map((item) => (
          <ListItem key={item.id}>{item.value}</ListItem>
        ))}
      </List>
    </GamePage>
  );
}
