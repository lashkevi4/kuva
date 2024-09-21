import React from 'react';
import { Link } from 'react-router-dom';
import { categoriesTips } from '../categoriesTips';
import '../styles/global.css';
import BurgerMenu from './BurgerMenu';

function TipsScreen() {
  return (
    <div className="main-container">

      <div className="header">
        <BurgerMenu />
      </div>

      {/* заголовок страницы */}
      <h1 className="title">Tips & Tricks</h1>

      {/* применяем стили для сетки */}
      <div className="tips-grid">

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
