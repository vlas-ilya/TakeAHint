import "./styles.scss";

import React, { useState } from "react";
import { chooseWord, selectWord, selectWords } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/Form/Form";
import FormButton from "../../components/FormButton/FormButton";
import List from "../../components/List/List";
import ListItem from "../../components/List/ListItem";
import Page from "../../components/Page/Page";
import classNames from "classnames";
import { selectIsMaster } from "../../app/reducer";

export default function ChooseWord() {
  const [choose, setChoose] = useState(false);
  const words = useSelector(selectWords);
  const isMaster = useSelector(selectIsMaster);
  const dispatch = useDispatch();

  return (
    <Page className="choose_word">
      <Form>
        {!isMaster ? (
          <>
            <h2>Выберите слово для текущей игры</h2>
            {!choose ? (
              <>
                <List title="Список слов">
                  {words.map(item => (
                    <ListItem
                      key={item.key}
                      className={classNames({
                        selected: item.selected
                      })}
                      onClick={() => dispatch(selectWord(item.key))}
                    >
                      {item.word}
                    </ListItem>
                  ))}
                </List>

                <FormButton
                  onClick={() => {
                    setChoose(true);
                    dispatch(chooseWord());
                  }}
                >
                  Выбрать
                </FormButton>
              </>
            ) : (
              <>
                Выбранное слово:{" "}
                <strong>{words.find(item => item.selected).word}</strong>
                <p>Дождитесь когда остальные игроки тоже сделают выбор</p>
              </>
            )}
          </>
        ) : (
          <>
            <h2>Ваша команда выберает слово для текущей игры</h2>
          </>
        )}
      </Form>
    </Page>
  );
}
