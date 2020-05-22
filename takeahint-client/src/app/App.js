import "../styles/App.scss";

import {
  changeModal,
  checkAnswer,
  constants,
  selectCountOfRounds,
  selectCountOfWin,
  selectCurrentWord,
  selectIsGaming,
  selectIsMaster,
  selectMaster,
  selectModal
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";

import AlertBlock from "../components/AlertBlock/AlertBlock";
import CheckAnswer from "../components/CheckAnswer/CheckAnswer";
import FormButton from "../components/FormButton/FormButton";
import GrCode from "../components/QrCode/GrCode";
import MainMenu from "../components/MainMenu/MainMenu";
import Modal from "../components/modal/Modal";
import React from "react";
import Router from "./Router";
import Rules from "../components/Rules/Rules";
import { selectAnswer } from "../features/answering/reducer";
import { selectLogin } from "../features/login/reducer";

export default function App() {
  const isMaster = useSelector(selectIsMaster);
  const countOfWin = useSelector(selectCountOfWin);
  const countOfRounds = useSelector(selectCountOfRounds);
  const login = useSelector(selectLogin);
  const word = useSelector(selectCurrentWord);
  const answer = useSelector(selectAnswer);
  const master = useSelector(selectMaster);
  const isGaming = useSelector(selectIsGaming);
  const modal = useSelector(selectModal);
  const dispatch = useDispatch();

  return (
    <div className="take-a-hint">
      <AlertBlock />
      <MainMenu
        isMaster={isMaster}
        countOfWin={countOfWin}
        countOfRounds={countOfRounds}
        login={login}
        word={word}
        master={master}
        isGaming={isGaming}
        onShowRules={() => dispatch(changeModal(constants.modals.rules))}
        onQrCode={() => dispatch(changeModal(constants.modals.qrCode))}
      />
      <Router />
      {modal === constants.modals.rules && (
        <Modal
          id="rules"
          title="Правила игры"
          body={<Rules />}
          actions={[
            <FormButton
              key="close"
              className="grey"
              onClick={() => dispatch(changeModal(""))}
            >
              Закрыть
            </FormButton>
          ]}
        />
      )}
      {modal === constants.modals.qrCode && (
        <Modal
          id="qrCode"
          className="width-auto"
          noPadding
          body={<GrCode noBorder />}
          actions={[
            <FormButton
              key="close"
              className="grey"
              onClick={() => dispatch(changeModal(""))}
            >
              Закрыть
            </FormButton>
          ]}
        />
      )}

      {modal === constants.modals.checkAnswer && (
        <Modal
          title="Проверка ответа"
          id="checkAnswer"
          body={
            <CheckAnswer
              answer={answer}
              word={word}
              master={master}
              isMaster={isMaster}
            />
          }
          actions={[
            <FormButton
              key="correct"
              onClick={() => dispatch(checkAnswer(true))}
            >
              Верно
            </FormButton>,
            <FormButton
              key="incorrect"
              className="grey"
              onClick={() => dispatch(checkAnswer(false))}
            >
              Не верно
            </FormButton>
          ]}
        />
      )}
    </div>
  );
}
