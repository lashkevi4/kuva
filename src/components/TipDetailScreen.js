import React from 'react';
import { useParams } from 'react-router-dom';
import { tips } from '../data';
import BackButton from './BackButton';

const tipCategories = {
  1: 'Основы',
  2: 'Голова',
  3: 'Руки',
  4: 'Ноги',
  5: 'Тело',
  6: 'Композиция',
  7: 'Оборудование',
};

function TipDetailScreen() {
  const { tipId } = useParams();
  const tip = tips.find(t => t.id === parseInt(tipId));

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <BackButton />
        <h1 style={styles.title}>{tip ? tipCategories[tip.id] : 'Совет'}</h1>
      </div>
      {tip && (
        <div style={styles.tip}>
          <p>{tip.content}</p>
        </div>
      )}
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
  tip: {
    textAlign: 'center',
    margin: '0 auto',
    maxWidth: '400px',
    fontSize: '18px',
  },
};

export default TipDetailScreen;
