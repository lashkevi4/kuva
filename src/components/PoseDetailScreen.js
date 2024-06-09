import React from 'react';
import { useParams } from 'react-router-dom';
import { poses } from '../data';
import BackButton from './BackButton';

function PoseDetailScreen() {
  const { poseId } = useParams();
  const pose = poses.find(p => p.id === parseInt(poseId));

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <BackButton />
        <h1 style={styles.title}>Детализация позы</h1>
      </div>
      {pose && (
        <div style={styles.pose}>
          <img src={pose.image} alt={pose.name} style={styles.image} />
          <p style={styles.name}>{pose.name}</p>
          <p style={styles.description}>Описание позы и советы по выполнению.</p>
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
    justifyContent: 'flex-start',
    gap: '10px',
    marginBottom: '20px',
  },
  title: {
    margin: 0,
  },
  pose: {
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '400px',
  },
  image: {
    width: '100%',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '10px',
  },
  description: {
    marginTop: '10px',
  },
};

export default PoseDetailScreen;