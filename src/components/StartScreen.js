import React from 'react';
import { Link } from 'react-router-dom';
import './StartScreen.css';

function StartScreen() {
  return (
    <div className="container">
      <h1 className="titleSmall">— T H E —</h1>
      <h2 className="titleLarge">POSING</h2>
      <p className="description">Your story, my lens, a timeless masterpiece awaits</p>
      <img src="/images/app/start-screen.png" alt="Posing App" className="image" />
      <Link to="/categories" className="button">Poses</Link>
      <Link to="/tips" className="button">Tips & Tricks</Link>
    </div>
  );
}

export default StartScreen;
