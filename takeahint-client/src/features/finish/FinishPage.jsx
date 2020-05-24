import './styles.scss';

import React, { useEffect, useState } from 'react';
import { changeIsGaming, changePage, selectIsGaming, selectPage } from '../../app/redux/reducer';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../components/Form/Form';
import FormButton from '../../components/FormButton/FormButton';
import List from '../../components/List/List';
import ListItem from '../../components/List/ListItem';
import Page from '../../components/Page/Page';
import Player from './Player';
import Word from './Word';
import { default as axios } from 'axios';
import constants from '../../utils/constansts';
import { getParam } from '../../utils/url.utils';

export default function FinishPage() {
  const [statistic, setStatistic] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    let id = getParam('id');
    if (id) {
      (async () => {
        dispatch(changeIsGaming(false));
        constants.pages.finish && dispatch(changePage(constants.pages.finish));
        const statistic = await axios.get(`/game/statistic/${id}`);
        if (statistic && statistic.data) {
          setStatistic(statistic.data);
        }
      })();
    }
  }, [dispatch]);

  if (!(statistic && 'countOfWinRounds' in statistic)) {
    return <Page className="finish" />;
  }

  const countOfLosingRounds = statistic.words.length - statistic.countOfSkippedRounds - statistic.countOfWinRounds;

  return (
    <Page className="finish">
      <Form>
        <h2>Статистика игры</h2>
        <div className="statistic">
          Угадано/Неугадано/Пропущено/Всего:{' '}
          <strong>
            {statistic.countOfWinRounds}/{countOfLosingRounds}/{statistic.countOfSkippedRounds}/{statistic.words.length}
          </strong>
        </div>
        <List title="Слова" readonly>
          {statistic.words.map((word) => (
            <ListItem key={word.value}>
              <Word {...word} />
            </ListItem>
          ))}
        </List>
        <List title="Игроки" readonly>
          {statistic.players.map((player) => (
            <ListItem key={player.id}>
              <Player {...player} />
            </ListItem>
          ))}
        </List>
        <FormButton onClick={() => (window.location.href = '/')}>Сыграть еще раз</FormButton>
      </Form>
    </Page>
  );
}
