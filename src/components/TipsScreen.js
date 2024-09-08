import React from 'react';
import { Link } from 'react-router-dom';
import { categoriesTips } from '../categoriesTips';
import '../styles/global.css';
import BurgerMenu from './BurgerMenu'; // Подключаем бургер-меню

function TipsScreen() {
  return (
    <div className="main-container">
      <div className="header">
        <BurgerMenu /> {/* Подключаем бургер-меню */}
      </div>

      <h1 className="title">Tips & Tricks</h1> {/* заголовок страницы */}

      <div className="tips-grid"> {/* Применяем стили для сетки */}
        {categoriesTips.map(category => (
          <Link to={`/tips/${category.id}/1`} key={category.id} className="tips-item">
            <img src={`/images/app/${category.icon}`} alt={category.name} className="tips-icon" />
            <span className="tips-text">{category.name}</span> {/* название категории */}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TipsScreen;
