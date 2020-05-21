import React, { useState } from "react";
import {
  changeAssociation,
  saveAssociation,
  selectAssociation
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/Form/Form";
import FormButton from "../../components/FormButton/FormButton";
import FormInput from "../../components/FormInput/FormInput";
import Page from "../../components/Page/Page";
import { selectIsMaster } from "../../app/reducer";

export default function InputAssociations() {
  const [input, setInput] = useState(false);
  const isMaster = useSelector(selectIsMaster);

  const association = useSelector(selectAssociation);
  const dispatch = useDispatch();

  return (
    <Page>
      <Form>
        {!isMaster ? (
          <>
            <h2>Ассоциации</h2>
            {!input ? (
              <>
                <FormInput
                  name="association"
                  label="Введите ассоциацию"
                  value={association}
                  onChange={value => dispatch(changeAssociation(value))}
                />
                <FormButton
                  onClick={() => {
                    setInput(true);
                    dispatch(saveAssociation());
                  }}
                >
                  Сохранить
                </FormButton>
                <p>
                  Напишите ассоциацию в одно слово, можно использовать любую
                  часть речи, символы, цифры и так далее
                </p>
                <p>
                  Нельзя использовать придуманные слова. Если несколько игроков
                  напишут одно и то же слово, то оно убирается из списка
                  подсказок
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
