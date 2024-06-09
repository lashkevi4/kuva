import React from 'react';
import { Link } from 'react-router-dom';

function HomeButton() {
  return (
    <div style={styles.container}>
      <Link to="/" style={styles.link}>
        <img src="/images/app/home.png" alt="Home" style={styles.icon} />
      </Link>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: '10px',
    left: '10px',
  },
  link: {
    textDecoration: 'none',
  },
  icon: {
    width: '30px',
    height: '30px',
  }
};

export default HomeButton;