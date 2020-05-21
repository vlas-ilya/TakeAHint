import {
  changeAnswer,
  selectAnswer,
  selectAssociations,
  sendAnswer,
  sendEmptyAnswer
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/Form/Form";
import FormButton from "../../components/FormButton/FormButton";
import FormInput from "../../components/FormInput/FormInput";
import List from "../../components/List/List";
import ListItem from "../../components/List/ListItem";
import Page from "../../components/Page/Page";
import React from "react";
import { selectIsMaster } from "../../app/reducer";

export default function Answering() {
  const associations = useSelector(selectAssociations);
  const answer = useSelector(selectAnswer);
  const isMaster = useSelector(selectIsMaster);
  const dispatch = useDispatch();

  return (
    <Page>
      <Form>
        {isMaster ? (
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
              onChange={value => dispatch(changeAnswer(value))}
            />

            <FormButton onClick={() => dispatch(sendAnswer())}>
              Ответить
            </FormButton>

            <FormButton
              className="grey"
              onClick={() => dispatch(sendEmptyAnswer())}
            >
              Пропустить
            </FormButton>

            <p>
              По списку ассоциаций, который подготовила для вас ваша команда,
              попробуйте догадаться какое слово было загаданно
            </p>
            <p>
              Введите ответ, соблюдая все правила орфографии, и нажмите{" "}
              <strong>Ответить</strong>
            </p>
          </>
        ) : (
          <>
            <h2>Ведущий отгадывает слово</h2>
            <List title="Список ассоциаций">
              {associations.map(item => (
                <ListItem key={item.id}>{item.value}</ListItem>
              ))}
            </List>
          </>
        )}
      </Form>
    </Page>
  );
}
