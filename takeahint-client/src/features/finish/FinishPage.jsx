import React, { useEffect, useState } from 'react';
import { changeIsGaming, changePage } from '../../app/redux/reducer';

import Form from '../../components/Form/Form';
import FormButton from '../../components/FormButton/FormButton';
import List from '../../components/List/List';
import ListItem from '../../components/List/ListItem';
import Page from '../../components/Page/Page';
import { default as axios } from 'axios';
import constants from '../../utils/constansts';
import { getParam } from '../../utils/url.utils';
import { useDispatch } from 'react-redux';

export default function FinishPage() {
  const [statistic, setStatistic] = useState({});
  const dispatch = useDispatch();

  dispatch(changeIsGaming(false));
  dispatch(changePage(constants.pages.finish));

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
            Угадано слов: <strong>{statistic.countOfWin}</strong>
          </h2>
          <List title="Слова" readonly>
            {statistic.words.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
          <List title="Игроки" readonly>
            {statistic.players.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
          <FormButton onClick={() => (window.location.href = '/')}>Сыграть еще раз</FormButton>
        </Form>
      )}
    </Page>
  );
}
