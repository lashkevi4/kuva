import React from 'react';
import { Link } from 'react-router-dom';
import { categoriesTips } from '../categoriesTips';
import BackButton from './BackButton';
import './TipsScreen.css';

function TipsScreen() {
  return (
    <div className="container">
      <div className="header">
        <BackButton />
        <h1 className="title">Советы и хитрости</h1>
      </div>
      <div className="grid">
        {categoriesTips.map(category => (
          <Link to={`/tips/${category.id}/1`} key={category.id} className="item">
            <img src={`/images/app/${category.icon}`} alt={category.name} className="icon" />
            <span className="text">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TipsScreen;
