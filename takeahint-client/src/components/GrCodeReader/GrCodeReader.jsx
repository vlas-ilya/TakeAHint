import React, { Suspense } from 'react';

import { validUrl } from '../../utils/url.utils';

const QrReader = React.lazy(() => import('react-qr-reader'));

export default function GrCodeReader() {
  function handleScan(data) {
    if (data && validUrl(data) && data.includes(window.location.hostname)) {
      window.location.href = data;
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
