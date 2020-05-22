import './styles.scss';

import React from 'react';

export default function List({ title, children }) {
  return (
    <div className="list">
      {title && <div className="list-title">{title}</div>}
      {children}
    </div>
  );
}
