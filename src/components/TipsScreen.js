import React from 'react';
import { Link } from 'react-router-dom';
import { tips } from '../data';
import BackButton from './BackButton';

function TipsScreen() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <BackButton />
        <h1 style={styles.title}>Советы и хитрости</h1>
      </div>
      <ul style={styles.ul}>
        {tips.map(tip => (
          <li key={tip.id} style={styles.li}>
            <Link to={`/tip-detail/${tip.id}`} style={styles.link}>{tip.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    position: 'relative',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',
    marginBottom: '20px',
  },
  title: {
    margin: 0,
  },
  ul: {
    listStyleType: 'none',
    padding: 0,
  },
  li: {
    margin: '10px 0',
    padding: '10px',
    border: '1px solid #000',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default TipsScreen;