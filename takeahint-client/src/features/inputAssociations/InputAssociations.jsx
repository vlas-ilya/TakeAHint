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

import Form from '../../components/Form/Form';
import FormButton from '../../components/FormButton/FormButton';
import FormInput from '../../components/FormInput/FormInput';
import List from '../../components/List/List';
import ListItem from '../../components/List/ListItem';
import Page from '../../components/Page/Page';
import { selectIsMaster } from '../../app/reducer';
import { selectLogin } from '../login/reducer';

export default function InputAssociations() {
  const [input, setInput] = useState(false);
  const isMaster = useSelector(selectIsMaster);
  const login = useSelector(selectLogin);
  const association = useSelector(selectAssociation);
  const valid = useSelector(selectValidAssociation);
  const notReady = useSelector(selectNotReady);
  const dispatch = useDispatch();

  return (
    <Page>
      <Form>
        {!isMaster && !login ? (
          <>
            <h2>Команда придумывает ассоциации</h2>
            {notReady && notReady.length > 0 && (
              <List title="Не придумали ассоциацию">
                {notReady.map((item) => (
                  <ListItem key={item}>{item}</ListItem>
                ))}
              </List>
            )}
          </>
        ) : !isMaster ? (
          <>
            <h2>Ассоциации</h2>
            {!input ? (
              <>
                <FormInput
                  name="association"
                  label="Введите ассоциацию"
                  value={association}
                  validMessage={valid ? '' : 'Необходимо ввести ассоциацию'}
                  onChange={(value) => dispatch(changeAssociation(value))}
                />
                <FormButton
                  onClick={() => {
                    if (association) {
                      setInput(true);
                      dispatch(saveAssociation());
                    } else {
                      dispatch(invalidAssociation());
                    }
                  }}
                >
                  Сохранить
                </FormButton>
                <p>Напишите ассоциацию в одно слово, можно использовать любую часть речи, символы, цифры и так далее</p>
                <p>
                  Нельзя использовать придуманные слова. Если несколько игроков напишут одно и то же слово, то оно
                  убирается из списка подсказок
                </p>
              </>
            ) : (
              <>
                Ваша ассоциация <strong>{association}</strong>
                <p>Дождитесь когда остальные игроки введут ассоциации</p>
              </>
            )}
          </>
        ) : (
          <>
            <h2>Ваша команда придумывает ассоциации</h2>
          </>
        )}
      </Form>
    </Page>
  );
}
