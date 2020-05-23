import Form from '../Form/Form';
import Page from '../Page/Page';
import React from 'react';
import { selectIsMaster } from '../../app/redux/reducer';
import { selectLogin } from '../../features/login/reducer';
import { useSelector } from 'react-redux';

export default function GamePage({ forMaster, forObserver, children, className }) {
  const isMaster = useSelector(selectIsMaster);
  const login = useSelector(selectLogin);

  if (!isMaster && !login) {
    return (
      <Page className={className}>
        <Form>{forObserver || children}</Form>
      </Page>
    );
  }

  if (!isMaster) {
    return (
      <Page className={className}>
        <Form>{children}</Form>
      </Page>
    );
  }

  return (
    <Page className={className}>
      <Form>{forMaster}</Form>
    </Page>
  );
}
