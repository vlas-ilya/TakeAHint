import './form-input.scss';

import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import sync from './sync.svg';

export default function FormInput({
  name,
  label,
  validMessage,
  value,
  onChange,
  onEnter,
  autoComplete = 'off',
  onSync,
  ...props
}) {
  const [syncClasses, setSyncClasses] = useState('sync');
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      setSyncClasses('sync rotation');
      const timer = setTimeout(() => {
        setSyncClasses('sync');
        setStartAnimation(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [startAnimation]);

  return (
    <div
      className={classNames('form-input', {
        filled: value,
        invalid: validMessage,
        sync: !!onSync,
      })}
    >
      <label htmlFor={name}>{!validMessage ? label : <span className="validMessage">{validMessage}</span>}</label>
      {onSync && (
        <img
          className={syncClasses}
          src={sync}
          alt=""
          onClick={() => {
            setStartAnimation(true);
            onSync();
          }}
        />
      )}
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        autoComplete={autoComplete}
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
