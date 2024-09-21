import React from 'react';

function Modal({ onClose, children }) {
  // обрабатываем клик на затемнённую область, чтобы закрыть модальное окно
  const handleOverlayClick = (event) => {
    // проверяем, что клик был именно по фону, а не по содержимому модального окна
    if (event.target === event.currentTarget) {
      onClose(); // вызываем функцию закрытия модального окна
    }
  };

  return (

    <div className="modal-overlay" onClick={handleOverlayClick}> {/* обработчик клика на затемнённую область */}

      <div className="modal-content">
        {children} {/* отображаем содержимое модального окна */}
      </div>

    </div>

  );
}

export default Modal;
