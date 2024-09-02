import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categoriesPoses } from '../categoriesPoses';
import { slide as Menu } from 'react-burger-menu';
import '../styles/global.css';

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

        <div className="iconButton">

          <img
            src="/images/app/burger.svg"
            alt="menu"
            className="iconImage"
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

      <div className="category-grid">
        {categoriesPoses.map(category => (
          <Link to={`/pose-preview/${category.id}`} key={category.id} className="category-item">
            <img src={`/images/app/${category.icon}`} alt={category.name} className="category-icon" />
            <span className="category-text">{category.name}</span>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default CategoryScreen;
