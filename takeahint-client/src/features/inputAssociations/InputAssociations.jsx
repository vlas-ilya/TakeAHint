import {
  changeAssociation,
  saveAssociation,
  selectAssociation
} from "./reducer";
import { selectCurrentWord, selectIsMaster } from "../../app/reducer";
import { useDispatch, useSelector } from "react-redux";

import React from "react";

export default function InputAssociations() {
  const isMaster = useSelector(selectIsMaster);
  const word = useSelector(selectCurrentWord);
  const association = useSelector(selectAssociation);
  const dispatch = useDispatch();

  return (
    <div>
      InputAssociations
      <div>
        {!isMaster && (
          <>
            <div>Word: {word}</div>
            <label htmlFor="association">Input association</label>
            <input
              name="association"
              type="text"
              value={association}
              onChange={e => dispatch(changeAssociation(e.target.value))}
            />
            <div>
              <button onClick={() => dispatch(saveAssociation())}>Save</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
