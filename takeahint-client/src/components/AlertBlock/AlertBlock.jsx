import "./styles.scss";

import React, { useEffect, useState } from "react";

import { selectAlert } from "../../app/reducer";
import { useSelector } from "react-redux";

export default function AlertBlock() {
  const [classNames, setClassNames] = useState("alert");
  const alert = useSelector(selectAlert);

  useEffect(() => {
    if (alert) {
      setClassNames("alert show");
      const timer = setTimeout(() => {
        setClassNames("alert");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="alert-block">
      <div className={classNames}>{alert}</div>
    </div>
  );
}
