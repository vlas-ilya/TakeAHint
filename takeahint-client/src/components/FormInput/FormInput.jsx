import "./form-input.scss";

import React from "react";
import classNames from "classnames";

export default function FormInput({ name, label, value, onChange }) {
  return (
    <div className={classNames("form-input", { filled: value })}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value, e)}
      />
    </div>
  );
}
