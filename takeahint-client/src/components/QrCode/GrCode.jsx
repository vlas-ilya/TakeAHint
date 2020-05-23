import './styles.scss';

import React, { useEffect, useState } from 'react';

import Form from '../Form/Form';
import { default as axios } from 'axios';

const cache = (() => {
  let oldImageUrl = '';
  let oldDataUrl = '';

  return async (imageUrl) => {
    if (oldImageUrl !== imageUrl) {
      oldDataUrl = await axios.get(imageUrl);
      oldImageUrl = imageUrl;
    }
    return oldDataUrl;
  };
})();

export default function GrCode({ noBorder, gameId }) {
  const [dataUrl, setDataUrl] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const url = new URL(window.location.href);
    url.search = '';
    url.searchParams.set('gameId', gameId);
    const imageUrl = '/qr/qrCode.png?params=' + encodeURI(url.href);
    (async () => {
      const dataUrl = await cache(imageUrl);
      if (dataUrl && dataUrl.data) {
        setDataUrl(dataUrl.data);
        setUrl(decodeURI(url.href));
      }
    })();
  }, [gameId]);

  if (noBorder) {
    return (
      <div className="qr-code">
        {dataUrl && <img src={dataUrl} alt="QR Code" />} {url && <div className="url">{url}</div>}
      </div>
    );
  }

  return (
    <Form className="qr-code small">
      {dataUrl && <img src={dataUrl} alt="QR Code" />} {url && <div>{url}</div>}
    </Form>
  );
}
