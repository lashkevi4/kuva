import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

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
  const [swipeDirection, setSwipeDirection] = useState('');
  const category = categories.find(c => c.id === parseInt(categoryId));
  const navigate = useNavigate();
  const animationDuration = 500; // Время анимации в миллисекундах

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

  const nextPoseId = parseInt(poseId) < poses.length ? parseInt(poseId) + 1 : 1;
  const prevPoseId = parseInt(poseId) > 1 ? parseInt(poseId) - 1 : poses.length;

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setSwipeDirection('left');
      setTimeout(() => {
        setSwipeDirection('');
        navigate(`/pose-detail/${categoryId}/${nextPoseId}`);
      }, animationDuration);
    },
    onSwipedRight: () => {
      setSwipeDirection('right');
      setTimeout(() => {
        setSwipeDirection('');
        navigate(`/pose-detail/${categoryId}/${prevPoseId}`);
      }, animationDuration);
    },
  });

  if (!pose || !category) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container} {...handlers}>
      <div style={styles.header}>
        <Link to={`/pose-preview/${categoryId}`} style={styles.backButton}>
          <img src="/images/app/back.svg" alt="Назад" style={styles.backIcon} />
        </Link>
        <h1 style={styles.title}>{category.name}</h1>
      </div>
      <div style={{ ...styles.content, animationName: swipeDirection === 'left' ? 'swipeLeft' : swipeDirection === 'right' ? 'swipeRight' : 'none', animationDuration: `${animationDuration}ms` }}>
        <img src={`/images/${category.path}/${pose.image}`} alt={pose.description} style={styles.image} />
        <p style={styles.description}>{pose.description}</p>
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
    animationTimingFunction: 'ease-in-out',
    animationFillMode: 'both',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
  },
  description: {
    fontSize: '18px',
    marginTop: '10px',
  },
};

// Добавьте анимации в CSS
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes swipeLeft {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  @keyframes swipeRight {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
`, styleSheet.cssRules.length);

export default PoseDetailScreen;
