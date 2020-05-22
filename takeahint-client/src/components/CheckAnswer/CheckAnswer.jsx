import './styles.scss';

import React from 'react';

export default function CheckAnswer({ word, answer, master, isMaster }) {
  return (
    <div className="check-answer">
      {!isMaster && (
        <div>
          <strong>Ведущий:</strong> {master}
        </div>
      )}
      <div>
        <strong>{isMaster ? <>Ваш ответ:</> : <>Ответ ведущего:</>}</strong> {answer}
      </div>
      <div>
        <strong>Правильный ответ: </strong> {word}
      </div>
    </div>
  );
}
