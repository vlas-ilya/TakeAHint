import './styles.scss';

import React from 'react';
import classNames from 'classnames';

export default function List({ title, children, readonly }) {
  return (
    <div className={classNames('list', { readonly })}>
      {title && <div className="list-title">{title}</div>}
      {children}
    </div>
  );
}
