import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import '../styles/global.css'; // Правильный путь к глобальным стилям

const BurgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = (event) => {
    event.stopPropagation(); // Останавливает дальнейшую обработку клика
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="burgerMenuContainer">
      <Menu
        isOpen={menuOpen}
        onStateChange={handleStateChange}
        left
        width={'70%'}
        customBurgerIcon={false} // Отключаем встроенную иконку бургера
        customCrossIcon={false}  // Отключаем встроенную иконку закрытия
      >
        <Link to="/" className="burgerMenuItem" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/categories" className="burgerMenuItem" onClick={closeMenu}>
          Poses
        </Link>
        <Link to="/tips" className="burgerMenuItem" onClick={closeMenu}>
          Tips & Tricks
        </Link>
        <Link to="/favorites" className="burgerMenuItem" onClick={closeMenu}>
          Favorites
        </Link>
      </Menu>
      <div
        className="burgerIcon"
        onClick={(event) => {
          event.preventDefault(); // Предотвращаем действие по умолчанию
          toggleMenu(event);
        }}
      >
        <img src="/images/app/burger.svg" alt="Menu" className="burgerIconSvg" />
      </div>
    </div>
  );
};

export default BurgerMenu;
