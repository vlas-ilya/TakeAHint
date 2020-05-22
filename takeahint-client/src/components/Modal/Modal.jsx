import './styles.scss';

import React from 'react';
import classNames from 'classnames';

export default function Modal({ show, actions, title, className, noPadding, children }) {
  if (!show) {
    return false;
  }

  return (
    <div className="modal-back">
      <div className={classNames('modal', className)}>
        {title && (
          <div className="modal-title">
            <h2>{title}</h2>
          </div>
        )}
        <div className={classNames('modal-body', { 'no-padding': noPadding })}>{children}</div>
        <div className="modal-actions">{actions}</div>
      </div>
    </div>
  );
}
