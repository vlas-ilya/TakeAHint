import React, { useEffect, useState } from 'react';

import Form from '../../components/Form/Form';
import FormButton from '../../components/FormButton/FormButton';
import List from '../../components/List/List';
import ListItem from '../../components/List/ListItem';
import Page from '../../components/Page/Page';
import { default as axios } from 'axios';
import { changeIsGaming } from '../../app/redux/reducer';
import { getParam } from '../../utils/url.utils';
import { useDispatch } from 'react-redux';

export default function FinishPage() {
  const [statistic, setStatistic] = useState({});
  const dispatch = useDispatch();
  dispatch(changeIsGaming(true));

  useEffect(() => {
    let id = getParam('id');
    if (id) {
      (async () => {
        const statistic = await axios.get(`/game/statistic/${id}`);
        if (statistic && statistic.data) {
          setStatistic(statistic.data);
        }
      })();
    }
  });

  return (
    <Page>
      {statistic && 'countOfWin' in statistic && (
        <Form>
          <h1>Статистика игры</h1>
          <h2>
            Угаданно слов: <strong>{statistic.countOfWin}</strong>
          </h2>
          <List title="Слова">
            {statistic.words.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
          <List title="Игроки">
            {statistic.players.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
          <FormButton onClick={() => (window.location.pathname = '/')}>Сыграть еще раз</FormButton>
        </Form>
      )}
    </Page>
  );
}
