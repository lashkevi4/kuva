import React from 'react';
import { Link } from 'react-router-dom';
import { categoriesPoses } from '../categoriesPoses';
import './CategoryScreen.css';

function CategoryScreen() {
  return (
    <div className="container">
      <div className="header">
        <Link to="/" className="backButton">
          <img src="/images/app/back.svg" alt="Назад" className="backIcon" />
        </Link>
        <h1 className="title">Категории</h1>
      </div>
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
