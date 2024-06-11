import React from 'react';
import { Link } from 'react-router-dom';
import { tips } from '../data';
import BackButton from './BackButton';

const tipIcons = {
  1: 'basic.svg',
  2: 'head.svg',
  3: 'hands.svg',
  4: 'legs.svg',
  5: 'body.svg',
  6: 'composition.svg',
  7: 'camera.svg',
};

function TipsScreen() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <BackButton />
        <h1 style={styles.title}>Советы и хитрости</h1>
      </div>
      <div style={styles.grid}>
        {tips.map(tip => (
          <Link to={`/tip-detail/${tip.id}`} key={tip.id} style={styles.item}>
            <img src={`/images/app/${tipIcons[tip.id]}`} alt={tip.name} style={styles.icon} />
            <span style={styles.text}>{tip.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '36px',
    fontFamily: 'Georgia, serif',
    textAlign: 'center',
    flex: 1,
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    border: '2px solid rgb(101, 98, 94)',
    borderRadius: '5px',
    textDecoration: 'none',
    color: '#000',
    width: '80%',
    maxWidth: '300px',
    backgroundColor: 'rgb(247, 243, 238)',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
  },
  text: {
    fontSize: '30px',
    fontFamily: 'Georgia, serif',
    flex: 1,
    textAlign: 'center',
  },
};

export default TipsScreen;
