import React from 'react';
import { useNavigate } from 'react-router-dom'; //подключаем хук useNavigate для управления маршрутизацией
import './BackButton.css';

function BackButton() {
  const navigate = useNavigate(); //хук для навигации

  return (
    <button onClick={() => navigate('/')} className="back-button"> {/*создаём кнопку, перенаправляет на start page*/}

      <img src="/images/app/back.svg" alt="back" className="back-icon" /> {/*добавляем изображение с иконкой "back"*/}

    </button>
  );
}

export default BackButton;
// экспортирую компонент, для использования в других частях приложения
