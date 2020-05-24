import './styles.scss';

import React from 'react';
import classNames from 'classnames';
import close from '../../images/close.svg';

export default function Modal({ show, actions, title, className, noPadding, children, onClose, showCloseButton }) {
  if (!show) {
    return false;
  }

  return (
    <div className="modal-back" onClick={onClose}>
      <div
        className={classNames('modal', className, { 'show-close-button': showCloseButton })}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="modal-title">
            <h2>{title}</h2>
            <img className="close" role="button" onClick={onClose} src={close} alt="close" />
          </div>
        )}
        <div className={classNames('modal-body', { 'no-padding': noPadding })}>{children}</div>
        <div className="modal-actions">{actions}</div>
      </div>
    </div>
  );
}
