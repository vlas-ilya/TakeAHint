import './App.scss';

import {
  changeModal,
  checkAnswer,
  selectCountOfRounds,
  selectCountOfWin,
  selectCurrentWord,
  selectIsGaming,
  selectIsMaster,
  selectMaster,
  selectModal,
  selectPage,
} from './redux/reducer';
import { selectGameId, selectLogin } from '../features/login/reducer';
import { useDispatch, useSelector } from 'react-redux';

import AlertBlock from '../components/AlertBlock/AlertBlock';
import CheckAnswer from '../components/CheckAnswer/CheckAnswer';
import Footer from '../components/Footer/Footer';
import FormButton from '../components/FormButton/FormButton';
import GrCode from '../components/QrCode/GrCode';
import MainMenu from '../components/MainMenu/MainMenu';
import Modal from '../components/Modal/Modal';
import React from 'react';
import Router from './Router';
import Rules from '../components/Rules/Rules';
import constants from '../utils/constansts';
import { selectAnswer } from '../features/answering/reducer';

export default function App() {
  const answer = useSelector(selectAnswer);
  const countOfRounds = useSelector(selectCountOfRounds);
  const countOfWin = useSelector(selectCountOfWin);
  const dispatch = useDispatch();
  const gameId = useSelector(selectGameId);
  const isGaming = useSelector(selectIsGaming);
  const isMaster = useSelector(selectIsMaster);
  const login = useSelector(selectLogin);
  const master = useSelector(selectMaster);
  const modal = useSelector(selectModal);
  const page = useSelector(selectPage);
  const word = useSelector(selectCurrentWord);

  const menu = {
    countOfRounds,
    countOfWin,
    gameId,
    isGaming,
    isMaster,
    login,
    master,
    word,
  };

  return (
    <div className="take-a-hint">
      <AlertBlock />

      <MainMenu
        {...menu}
        showGameId={page === constants.pages.waitingPlayers}
        onShowRules={() => dispatch(changeModal(constants.modals.rules))}
        onQrCode={() => dispatch(changeModal(constants.modals.qrCode))}
      />

      <Router />

      <Footer />

      <Modal
        id="rules"
        show={modal === constants.modals.rules}
        title="Правила игры"
        className={'big-margin'}
        actions={[
          <FormButton key="close" className="grey" onClick={() => dispatch(changeModal(''))}>
            Закрыть
          </FormButton>,
        ]}
      >
        <Rules />
      </Modal>

      <Modal
        id="qrCode"
        show={modal === constants.modals.qrCode}
        className="width-auto"
        noPadding
        actions={[
          <FormButton key="close" className="grey" onClick={() => dispatch(changeModal(''))}>
            Закрыть
          </FormButton>,
        ]}
      >
        <GrCode noBorder gameId={gameId} />
      </Modal>

      <Modal
        id="checkAnswer"
        show={modal === constants.modals.checkAnswer}
        title="Проверка ответа"
        actions={[
          <FormButton key="correct" onClick={() => dispatch(checkAnswer(true))}>
            Верно
          </FormButton>,
          <FormButton key="incorrect" className="grey" onClick={() => dispatch(checkAnswer(false))}>
            Не верно
          </FormButton>,
        ]}
      >
        <CheckAnswer answer={answer} word={word} master={master} isMaster={isMaster} />
      </Modal>
    </div>
  );
}
