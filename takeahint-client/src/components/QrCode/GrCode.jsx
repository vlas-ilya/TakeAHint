import './styles.scss';

import React, { useEffect, useState } from 'react';

import Form from '../Form/Form';
import { default as axios } from 'axios';

const cache = (() => {
  let oldImageUrl = '';
  let oldDataUrl = '';

  return async imageUrl => {
    if (oldImageUrl !== imageUrl) {
      oldDataUrl = await axios.get(imageUrl);
      oldImageUrl = imageUrl;
    }
    return oldDataUrl;
  };
})();

export default function GrCode({ noBorder }) {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    const url = new URL(window.location.href);
    const gameId = url.searchParams.get('gameId');
    url.search = '';
    url.searchParams.set('gameId', gameId);
    const imageUrl = '/qr/qrCode.png?params=' + encodeURI(url.href);
    (async () => {
      const dataUrl = await cache(imageUrl);
      if (dataUrl && dataUrl.data) {
        setDataUrl(dataUrl.data);
      }
    })();
  }, []);

  if (noBorder) {
    return <>{dataUrl && <img src={dataUrl} alt="QR Code" />}</>;
  }

  return <Form className="qr-code small">{dataUrl && <img src={dataUrl} alt="QR Code" />}</Form>;
}
