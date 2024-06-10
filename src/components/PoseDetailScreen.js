import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Дети', path: 'children' },
  { id: 2, name: 'Женщины', path: 'women' },
  { id: 3, name: 'Мужчины', path: 'men' },
  { id: 4, name: 'Пары', path: 'couples' },
  { id: 5, name: 'Группы', path: 'groups' },
  { id: 6, name: 'Свадебные', path: 'wedding' },
  { id: 7, name: 'Гламур', path: 'glamour' },
];

function PoseDetailScreen() {
  const { categoryId, poseId } = useParams();
  const [pose, setPose] = useState(null);
  const [poses, setPoses] = useState([]);
  const category = categories.find(c => c.id === parseInt(categoryId));

  useEffect(() => {
    if (category) {
      fetch(`/images/${category.path}/data.json`)
        .then(response => response.json())
        .then(data => {
          setPoses(data);
          const poseData = data.find(p => p.id === parseInt(poseId));
          setPose(poseData);
        })
        .catch(error => console.error('Error loading data:', error));
    }
  }, [category, poseId]);

  if (!pose || !category) {
    return <div>Loading...</div>;
  }

  const nextPoseId = parseInt(poseId) < poses.length ? parseInt(poseId) + 1 : 1;
  const prevPoseId = parseInt(poseId) > 1 ? parseInt(poseId) - 1 : poses.length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to={`/pose-preview/${categoryId}`} style={styles.backButton}>
          <img src="/images/app/back.svg" alt="Назад" style={styles.backIcon} />
        </Link>
        <h1 style={styles.title}>{category.name}</h1>
      </div>
      <div style={styles.content}>
        <img src={`/images/${category.path}/${pose.image}`} alt={pose.description} style={styles.image} />
        <p style={styles.description}>{pose.description}</p>
        <div style={styles.navigation}>
          <Link to={`/pose-detail/${categoryId}/${prevPoseId}`} style={styles.navButton}>← Previous</Link>
          <Link to={`/pose-detail/${categoryId}/${nextPoseId}`} style={styles.navButton}>Next →</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
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
  content: {
    textAlign: 'center',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
  },
  description: {
    fontSize: '18px',
    marginTop: '10px',
  },
  navigation: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  navButton: {
    fontSize: '18px',
    textDecoration: 'none',
    color: '#000',
    padding: '10px',
    border: '2px solid rgb(101, 98, 94)',
    borderRadius: '5px',
    backgroundColor: 'rgb(247, 243, 238)',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

export default PoseDetailScreen;
