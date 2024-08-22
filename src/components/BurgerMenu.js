import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import './BurgerMenu.css';

const BurgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="burger-menu-container">
      <Menu
        isOpen={menuOpen}
        onStateChange={(state) => handleStateChange(state)}
        left
        width={'70%'} // Устанавливаем ширину меню на 70% экрана
      >
        <Link to="/" className="menu-item" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/categories" className="menu-item" onClick={closeMenu}>
          Poses
        </Link>
        <Link to="/tips" className="menu-item" onClick={closeMenu}>
          Tips & Tricks
        </Link>
        <Link to="/favorites" className="menu-item" onClick={closeMenu}>
          Favorites
        </Link>
      </Menu>
      <div className="burger-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <img src="/images/app/burger.svg" alt="Menu" className="burger-icon-svg" />
      </div>
    </div>
  );
};

export default BurgerMenu;
