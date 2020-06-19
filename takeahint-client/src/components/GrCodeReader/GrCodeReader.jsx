import React, { Suspense } from 'react';
import { changeAlert, changeModal } from '../../app/redux/reducer';
import { getParam, setParam, validUrl } from '../../utils/url.utils';

import { changeGameId } from '../../features/login/reducer';
import { useDispatch } from 'react-redux';

const QrReader = React.lazy(() => import('react-qr-reader'));

export default function GrCodeReader() {
  const dispatch = useDispatch();

  function handleScan(url) {
    if (url && validUrl(url) && url.includes(window.location.hostname)) {
      const gameId = getParam('gameId', '', url);
      setParam('gameId', gameId);
      dispatch(changeGameId(gameId));
      dispatch(changeModal(''));
      dispatch(changeAlert(`Вы перешли в комнату ${gameId}`));
    }
  }

  function handleError(ignored) {}

  const styles = {
    height: 300,
    width: 300,
  };

  return (
    <div>
      <Suspense fallback={<div style={styles} />}>
        <QrReader style={styles} onError={handleError} onScan={handleScan} />
      </Suspense>
    </div>
  );
}
