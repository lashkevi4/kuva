import React from 'react';
import { Link } from 'react-router-dom';
import GoogleSignIn from './GoogleSignIn'; // Импортируем компонент GoogleSignIn
import './StartScreen.css';
import BurgerMenu from './BurgerMenu';

function StartScreen() {
  return (
    <div className="container">
      <div className="menu-container">
        <BurgerMenu />
      </div>
      <h1 className="titleSmall">— T H E —</h1>
      <h2 className="titleLarge">POSING</h2>
      <p className="description">Your story, my lens, a timeless masterpiece awaits</p>
      <img src="/images/app/start-screen.png" alt="Posing App" className="image" />
      <Link to="/categories" className="button">Poses</Link>
      <Link to="/tips" className="button">Tips & Tricks</Link>
      <Link to="/favorites" className="button">Favorites</Link>
      <GoogleSignIn />
    </div>
  );
}

export default StartScreen;
