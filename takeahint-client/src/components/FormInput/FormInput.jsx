import "./form-input.scss";

import React from "react";
import classNames from "classnames";

export default function FormInput({
  name,
  label,
  validMessage,
  value,
  onChange
}) {
  return (
    <div
      className={classNames("form-input", {
        filled: value,
        invalid: validMessage
      })}
    >
      <label htmlFor={name}>
        {!validMessage ? (
          label
        ) : (
          <span className="validMessage">{validMessage}</span>
        )}
      </label>
      <input
        name={name}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value, e)}
      />
    </div>
  );
}
