import './styles.scss';

import { done, selectAssociations, toggleAssociation } from './reducer';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../components/Form/Form';
import FormButton from '../../components/FormButton/FormButton';
import List from '../../components/List/List';
import ListItem from '../../components/List/ListItem';
import Page from '../../components/Page/Page';
import React from 'react';
import classNames from 'classnames';
import { selectIsMaster } from '../../app/reducer';
import { selectLogin } from '../login/reducer';

export default function FilterAssociations() {
  const isMaster = useSelector(selectIsMaster);
  const login = useSelector(selectLogin);
  const associations = useSelector(selectAssociations);
  const dispatch = useDispatch();

  return (
    <Page className="associations">
      <Form>
        {!isMaster && !login ? (
          <>
            <h2>Команда придумывает ассоциации</h2>
          </>
        ) : !isMaster ? (
          <>
            <h2>Уберите неподходящие ассоциации</h2>
            <List title="Список ассоциаций">
              {associations.map((item) => (
                <ListItem
                  key={item.id}
                  onClick={() => item.valid && dispatch(toggleAssociation(item.id))}
                  className={classNames('associations_item', {
                    selected: !item.valid || !item.markedAsValid,
                  })}
                >
                  <div>
                    {item.value}
                    {!item.valid && <span className="deleted">Удалена</span>}
                    {!item.markedAsValid && <span className="deleted">Будет удалена</span>}
                  </div>
                </ListItem>
              ))}
            </List>
            <FormButton onClick={() => dispatch(done())}>Сохранить</FormButton>
            <p>Отметьте ассоциации, которые не подходят по правилам</p>
            <p>
              Ассоциация должна быть в одно слово, можно использовать любую часть речи, символы, цифры и так далее.
              Нельзя использовать придуманные слова.
            </p>
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
