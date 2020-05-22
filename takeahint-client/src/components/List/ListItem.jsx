import React from 'react';
import classNames from 'classnames';

export default function ListItem({ children, className, ...props }) {
  return (
    <div className={classNames('list-item', className)} {...props}>
      {children}
    </div>
  );
}
