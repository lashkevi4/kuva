import React from 'react';
import { Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import './HeaderPage.css';

const HeaderPage = ({ title }) => {
  return (
    <div className="header-page">
      <Link to="/" className="back-button">
        <img src="/images/app/back.svg" alt="Back" className="back-icon" />
      </Link>
      <h1 className="page-title">{title}</h1>
      <BurgerMenu />
    </div>
  );
};

export default HeaderPage;
