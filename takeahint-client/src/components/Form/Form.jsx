import './styles.scss';

import React from 'react';
import classNames from 'classnames';

export default function Form({ children, className }) {
  return <div className={classNames('form', className)}>{children}</div>;
}
