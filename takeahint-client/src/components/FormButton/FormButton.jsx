import './form-button.scss';

import React from 'react';

export default function FormButton({ onClick, children, ...props }) {
  return (
    <div className="form-button">
      <button {...props} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
