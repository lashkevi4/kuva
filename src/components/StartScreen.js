import React from 'react';
import { Link } from 'react-router-dom';

function StartScreen() {
  return (
    <div style={styles.container}>
      <h1 style={styles.titleSmall}>— T H E —</h1>
      <h2 style={styles.titleLarge}>POSING</h2>
      <p style={styles.description}>Your story, my lens, a timeless masterpiece awaits</p>
      <img src="/images/app/start-screen.png" alt="Posing App" style={styles.image} />
      <Link to="/categories" style={styles.button}>Позы</Link>
      <Link to="/tips" style={styles.button}>Советы и хитрости</Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  titleSmall: {
    fontSize: '20px',
    margin: '10px 0',
    fontFamily: 'Georgia, serif',
    letterSpacing: '0.2em', // дефисы удлиняем
  },
  titleLarge: {
    fontSize: '36px',
    margin: '5px 0',
    fontFamily: 'Georgia, serif',
    letterSpacing: '0.05em',
  },
  description: {
    fontSize: '18px',
    margin: '10px 0 20px 0',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: '20px',
  },
  button: {
    display: 'block',
    padding: '10px 20px',
    margin: '20px auto', // увеличенное расстояние между кнопками
    width: '80%',
    maxWidth: '300px',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#000',
    backgroundColor: 'rgb(247, 243, 238)',
    border: '2px solid rgb(101, 98, 94)',
    borderRadius: '5px',
    fontFamily: 'Georgia, serif',
    fontSize: '30px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // добавление тени
  },
};

export default StartScreen;
