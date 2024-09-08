import React from 'react';

function Modal({ onClose, children }) {
  // Обрабатываем клик на затемнённую область
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}> {/* Добавляем обработчик клика */}
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}

export default Modal;
