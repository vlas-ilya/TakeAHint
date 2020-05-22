import './styles.scss';

import { selectPlayers, start } from './reducer';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../components/Form/Form';
import FormButton from '../../components/FormButton/FormButton';
import List from '../../components/List/List';
import ListItem from '../../components/List/ListItem';
import Page from '../../components/Page/Page';
import React from 'react';
import classNames from 'classnames';
import { selectPlayerId } from '../../app/reducer';

export default function WaitingPlayers() {
  const players = useSelector(selectPlayers);
  const playerId = useSelector(selectPlayerId);
  const dispatch = useDispatch();

  return (
    <Page className="waiting-players">
      <Form>
        <h2>Дождитесь всех игроков</h2>
        <List>
          {players.map((item) => (
            <ListItem key={item.id} className={classNames({ you: playerId === item.id })}>
              {item.login || 'Наблюдатель'}
            </ListItem>
          ))}
        </List>

        <FormButton onClick={() => players.filter((player) => player.login).length >= 3 && dispatch(start())}>
          Играть
        </FormButton>

        <p>Для начала игры необходимо минимум 3 игрока</p>
      </Form>
    </Page>
  );
}
