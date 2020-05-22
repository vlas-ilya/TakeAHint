import './styles.scss';

import React from 'react';
import classNames from 'classnames';

export default function Page({ children, className }) {
  return <div className={classNames('page', className)}>{children}</div>;
}
