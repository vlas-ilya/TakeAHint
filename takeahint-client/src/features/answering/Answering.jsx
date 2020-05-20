import {
  changeAnswer,
  selectAnswer,
  selectAssociations,
  sendAnswer
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { selectIsMaster } from "../../app/reducer";

export default function Answering() {
  const associations = useSelector(selectAssociations);
  const answer = useSelector(selectAnswer);
  const isMaster = useSelector(selectIsMaster);
  const dispatch = useDispatch();

  return (
    <div>
      Answering
      {isMaster && (
        <>
          <div>
            {associations.map(item => (
              <div key={item.id}>{item.value}</div>
            ))}
          </div>
          <div>
            <label htmlFor="answer">Answer</label>
            <input
              name="answer"
              type="text"
              value={answer}
              onChange={e => dispatch(changeAnswer(e.target.value))}
            />
            <button onClick={() => dispatch(sendAnswer())}>Answer</button>
          </div>
        </>
      )}
    </div>
  );
}
