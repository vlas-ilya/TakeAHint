import "./styles.css";

import { chooseWord, selectWord, selectWords } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import classNames from "classnames";
import { selectIsMaster } from "../../app/reducer";

export default function ChooseWord() {
  const words = useSelector(selectWords);
  const isMaster = useSelector(selectIsMaster);
  const dispatch = useDispatch();

  return (
    <div className="choose_word">
      ChooseWord
      <div>
        {!isMaster && (
          <>
            <div>
              {words.map(item => (
                <div
                  key={item.key}
                  className={classNames("choose_word_item", {
                    "choose_word_item--selected": item.selected
                  })}
                  onClick={() => dispatch(selectWord(item.key))}
                >
                  {item.word}
                </div>
              ))}
            </div>
            <div>
              <button onClick={() => dispatch(chooseWord())}>Choose</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
