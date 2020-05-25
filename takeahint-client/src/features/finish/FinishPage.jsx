import './styles.scss';

import React, { useEffect, useState } from 'react';
import { changeIsGaming, changePage, changeStatistic } from '../../app/redux/reducer';

import Form from '../../components/Form/Form';
import FormButton from '../../components/FormButton/FormButton';
import List from '../../components/List/List';
import Page from '../../components/Page/Page';
import Player from './Player';
import Word from './Word';
import { default as axios } from 'axios';
import constants from '../../utils/constansts';
import { getParam } from '../../utils/url.utils';
import { useDispatch } from 'react-redux';

export default function FinishPage() {
  const [statistic, setStatistic] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    let id = getParam('id');
    if (id) {
      (async () => {
        dispatch(changeIsGaming(false));
        dispatch(changePage(constants.pages.finish));
        const statistic = await axios.get(`/game/statistic/${id}`);
        if (statistic && statistic.data) {
          setStatistic(statistic.data);
          dispatch(changeStatistic(statistic.data));
        }
      })();
    }
  }, [dispatch]);

  if (!(statistic && 'countOfWinRounds' in statistic)) {
    return <Page className="finish" />;
  }

  return (
    <Page className="finish">
      <Form>
        <h2>Статистика игры</h2>
        <List title="Слова" readonly>
          {statistic.words.map((word) => (
            <Word key={word.value} {...word} />
          ))}
        </List>
        <List
          title={
            <div className="players-header">
              <div className="title">Игроки</div>
              <div className="players-statistic-header">
                <div title="Не удаленные/Удаленные">Подсказки (НУ / У)</div>
                <div title="Угадано/Не угадано/Пропущено">Слова (У / НУ / П)</div>
              </div>
            </div>
          }
          readonly
        >
          {statistic.players.map((player) => (
            <Player key={player.id} {...player} />
          ))}
        </List>
        <p className="right">
          <strong>Подсказки:</strong> Не удаленные/Удаленные
        </p>
        <p className="right">
          <strong>Слова:</strong> Угадано/Не угадано/Пропущено
        </p>
        <FormButton onClick={() => (window.location.href = '/')}>Сыграть еще раз</FormButton>
      </Form>
    </Page>
  );
}
