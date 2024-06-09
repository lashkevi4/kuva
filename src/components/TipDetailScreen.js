import React from 'react';
import { useParams } from 'react-router-dom';
import { tips } from '../data';
import BackButton from './BackButton';

function TipDetailScreen() {
  const { tipId } = useParams();
  const tip = tips.find(t => t.id === parseInt(tipId));

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <BackButton />
        <h1 style={styles.title}>Детализация совета</h1>
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
    position: 'relative',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  title: {
    margin: 0,
  },
  tip: {
    textAlign: 'center',
    margin: '0 auto',
    maxWidth: '400px',
  },
};

export default TipDetailScreen;
