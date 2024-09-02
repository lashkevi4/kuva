import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categoriesTips } from '../categoriesTips';
import { slide as Menu } from 'react-burger-menu';
import BackButton from './BackButton';
import '../styles/global.css';  // Используем глобальные стили

function TipsScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="main-container">

      <div className="header">
        <BackButton />
        <div className="iconButton">
          <img
            src="/images/app/burger.svg"
            alt="menu"
            className="iconImage"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>

      <h1 className="title">Tips & Tricks</h1> {/* заголовок страницы */}

      <Menu
        isOpen={menuOpen}
        onStateChange={handleStateChange}
        width={'70%'} /* Определяем ширину выезжающего меню */
        customBurgerIcon={false}
        customCrossIcon={false}
      >
        <Link to="/" onClick={closeMenu} className="menu-item">
          Home
        </Link>
        <Link to="/categories" onClick={closeMenu} className="menu-item">
          Poses
        </Link>
        <Link to="/tips" onClick={closeMenu} className="menu-item">
          Tips & Tricks
        </Link>
        <Link to="/favorites" onClick={closeMenu} className="menu-item">
          Favorites
        </Link>
      </Menu>

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
