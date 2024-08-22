import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categoriesPoses } from '../categoriesPoses';
import { slide as Menu } from 'react-burger-menu';
import './CategoryScreen.css';

function CategoryScreen() {
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

        <div className="backButtonContainer">
          <Link to="/" className="backButton">
            <img src="/images/app/back.svg" alt="back" className="backIcon" />
          </Link>
        </div>

        <div className="burgerButtonContainer">
          <img
            src="/images/app/burger.svg"
            alt="menu"
            className="burgerIcon"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

      </div>


      <h1 className="title">Categories</h1>

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

      <div className="grid">
        {categoriesPoses.map(category => (
          <Link to={`/pose-preview/${category.id}`} key={category.id} className="item">
            <img src={`/images/app/${category.icon}`} alt={category.name} className="icon" />
            <span className="text">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryScreen;
