import "./styles.scss";

import React, { useEffect, useState } from "react";

import Form from "../Form/Form";
import { default as axios } from "axios";

export default function GrCode() {
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("player");
    const imageUrl = "/qr/qrCode.png?params=" + encodeURI(url.href);
    (async () => {
      const dataUrl = await axios.get(imageUrl);
      if (dataUrl && dataUrl.data) {
        setDataUrl(dataUrl.data);
      }
    })();
  });

  return (
    <Form className="qr-code small">
      {dataUrl && <img src={dataUrl} alt="QR Code" />}
    </Form>
  );
}
