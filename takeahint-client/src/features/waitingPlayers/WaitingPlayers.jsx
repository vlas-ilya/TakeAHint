import './styles.scss';

import { changePage, selectPlayerId } from '../../app/redux/reducer';
import { selectPlayers, start } from './reducer';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../components/Form/Form';
import FormButton from '../../components/FormButton/FormButton';
import List from '../../components/List/List';
import ListItem from '../../components/List/ListItem';
import Page from '../../components/Page/Page';
import React from 'react';
import classNames from 'classnames';
import constants from '../../utils/constansts';

export default function WaitingPlayers() {
  const players = useSelector(selectPlayers);
  const playerId = useSelector(selectPlayerId);
  const dispatch = useDispatch();

  return (
    <Page className="waiting-players">
      <Form>
        <h2>Дождитесь всех игроков</h2>
        <List readonly>
          {players.map((item) => (
            <ListItem key={item.id} className={classNames({ you: playerId === item.id })}>
              {item.login || 'Наблюдатель'}
            </ListItem>
          ))}
        </List>

        <div className="actions">
          <FormButton onClick={() => players.filter((player) => player.login).length >= 3 && dispatch(start())}>
            Играть
          </FormButton>

          <FormButton className="grey" onClick={() => dispatch(changePage(constants.pages.login))}>
            Выйти
          </FormButton>
        </div>

        <p>Для начала игры необходимо минимум 3 игрока</p>
      </Form>
    </Page>
  );
}
