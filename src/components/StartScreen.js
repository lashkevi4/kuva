import React from 'react';
import { Link } from 'react-router-dom';

function StartScreen() {
  return (
    <div style={styles.container}>
      <img src="/images/app/start-screen.webp" alt="App Presentation" style={styles.image} />
      <nav style={styles.nav}>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <Link to="/categories" style={styles.link}>Позы</Link>
          </li>
          <li style={styles.li}>
            <Link to="/tips" style={styles.link}>Советы и хитрости</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px'
  },
  image: {
    width: '100%',
    maxWidth: '300px',
    margin: '0 auto',
    display: 'block'
  },
  nav: {
    marginTop: '20px'
  },
  ul: {
    listStyleType: 'none',
    padding: 0
  },
  li: {
    margin: '10px 0',
    padding: '10px',
    border: '1px solid #000',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    fontSize: '18px',
    fontWeight: 'bold'
  }
};

export default StartScreen;