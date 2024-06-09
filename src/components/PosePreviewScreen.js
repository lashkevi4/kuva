import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { poses, categories } from '../data';
import BackButton from './BackButton';

function PosePreviewScreen() {
  const { categoryId } = useParams();
  const category = categories.find(c => c.id === parseInt(categoryId));
  const filteredPoses = poses.filter(pose => pose.category === parseInt(categoryId));

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <BackButton />
        <h1 style={styles.title}>{category ? category.name : 'Категория'}</h1>
      </div>
      <div style={styles.grid}>
        {filteredPoses.map(pose => (
          <Link to={`/pose-detail/${pose.id}`} key={pose.id} style={styles.item}>
            <img src={pose.image} alt={pose.name} style={styles.image} />
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
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  item: {
    border: '1px solid #000',
    borderRadius: '5px',
    padding: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#000',
  },
  image: {
    width: '100%',
  },
};

export default PosePreviewScreen;
