import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categoriesPoses } from '../categoriesPoses';

function PosePreviewScreen() {
  const { categoryId } = useParams();
  const [poses, setPoses] = useState([]);
  const category = categoriesPoses.find(c => c.id === parseInt(categoryId));

  useEffect(() => {
    if (category) {
      fetch(`/images/photos/${category.path}/data.json`)
        .then(response => response.json())
        .then(data => setPoses(data.photos)) // Изменение здесь
        .catch(error => console.error('Error loading data:', error));
    }
  }, [category]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/categories" style={styles.backButton}>
          <img src="/images/app/back.svg" alt="back" style={styles.backIcon} />
        </Link>
        <h1 style={styles.title}>{category ? category.name : 'Category'}</h1>
      </div>
      <div style={styles.grid}>
        {poses.map(pose => (
          <Link to={`/pose-detail/${categoryId}/${pose.id}`} key={pose.id} style={styles.item}>
            <img src={`/images/photos/${category.path}/${pose.image}`} alt={pose.description} style={styles.image} />
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
  backButton: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#000',
  },
  backIcon: {
    width: '50px',
    height: '50px',
  },
  title: {
    fontSize: '36px',
    fontFamily: 'Georgia, serif',
    textAlign: 'center',
    flex: 1,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
  item: {
    width: 'calc(50% - 10px)',
    border: '1px solid #000',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
  },
};

export default PosePreviewScreen;
