import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/')} className="iconButton"> {/*Используем глобальный класс для кнопки*/}
      <img src="/images/app/back.svg" alt="back" className="iconImage" /> {/*Используем глобальный класс для изображения*/}
    </button>
  );
}

export default BackButton;
