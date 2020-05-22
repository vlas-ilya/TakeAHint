import './styles.scss';

import React from 'react';
import classNames from 'classnames';

export default function Modal({ actions, title, body, className, noPadding }) {
  return (
    <div className="modal-back">
      <div className={classNames('modal', className)}>
        {title && (
          <div className="modal-title">
            <h2>{title}</h2>
          </div>
        )}
        <div className={classNames('modal-body', { 'no-padding': noPadding })}>{body}</div>
        <div className="modal-actions">{actions}</div>
      </div>
    </div>
  );
}
