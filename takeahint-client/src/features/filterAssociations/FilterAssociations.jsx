import "./styles.css";

import { done, selectAssociations, toggleAssociation } from "./reducer";
import { selectCurrentWord, selectIsMaster } from "../../app/reducer";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import classNames from "classnames";

export default function FilterAssociations() {
  const isMaster = useSelector(selectIsMaster);
  const word = useSelector(selectCurrentWord);
  const associations = useSelector(selectAssociations);
  const dispatch = useDispatch();

  return (
    <div className="associations">
      Filter Associations
      <div>
        {!isMaster && (
          <>
            <div>Word: {word}</div>
            {associations.map(item => (
              <div
                key={item.id}
                onClick={() => dispatch(toggleAssociation(item.id))}
                className={classNames("associations_item", {
                  "associations_item--invalid": !item.valid,
                  "associations_item--markedAsInvalid": !item.markedAsValid
                })}
              >
                {item.value}
              </div>
            ))}
            <button onClick={() => dispatch(done())}>Done</button>
          </>
        )}
      </div>
    </div>
  );
}
