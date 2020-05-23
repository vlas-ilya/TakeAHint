import './styles.scss';

import React from 'react';

export default function Footer() {
  return (
    <div className="footer">
      <div className="content">
        <p>
          Неофициальная веб-весия игры <strong>«Намек понял»</strong>. Веб-версия нe связана с официальной версией
        </p>
        <p>
          <strong>Нравится сервис?</strong> Поддержите{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/vlas-ilya">
            <strong>автора</strong>
          </a>{' '}
          на{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://www.patreon.com/takeahint">
            <strong>Patreon</strong>
          </a>
        </p>
        <p>
          <strong>Понравилась игра?</strong> Поддержите авторов оригинальной игры,{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.google.com/search?q=%D0%BA%D1%83%D0%BF%D0%B8%D1%82%D1%8C+%D0%B8%D0%B3%D1%80%D1%83+%D0%BD%D0%B0%D0%BC%D0%B5%D0%BA+%D0%BF%D0%BE%D0%BD%D1%8F%D0%BB"
          >
            <strong>купив настольную версию</strong>
          </a>
        </p>
      </div>
    </div>
  );
}
