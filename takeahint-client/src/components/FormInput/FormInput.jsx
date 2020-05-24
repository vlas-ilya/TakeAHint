import './form-input.scss';

import React from 'react';
import classNames from 'classnames';

export default function FormInput({ name, label, validMessage, value, onChange, onEnter, ...props }) {
  return (
    <div
      className={classNames('form-input', {
        filled: value,
        invalid: validMessage,
      })}
    >
      <label htmlFor={name}>{!validMessage ? label : <span className="validMessage">{validMessage}</span>}</label>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onKeyPress={(e) => {
          if (onEnter && e.key === 'Enter') {
            onEnter(e);
          }
        }}
        onChange={(e) => onChange(e.target.value, e)}
        {...props}
      />
    </div>
  );
}
