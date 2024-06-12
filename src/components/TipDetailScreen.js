import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import BackButton from './BackButton';

const categories = [
  { id: 1, name: 'Основы', path: 'basic' },
  { id: 2, name: 'Голова', path: 'head' },
  { id: 3, name: 'Руки', path: 'hands' },
  { id: 4, name: 'Ноги', path: 'legs' },
  { id: 5, name: 'Тело', path: 'body' },
  { id: 6, name: 'Композиция', path: 'composition' },
  { id: 7, name: 'Оборудование', path: 'equipment' },
];

function TipDetailScreen() {
  const { categoryId, tipId } = useParams();
  const [tip, setTip] = useState(null);
  const [tips, setTips] = useState([]);
  const category = categories.find(c => c.id === parseInt(categoryId));
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      fetch(`/data/tips/${category.path}/data.json`)
        .then(response => response.json())
        .then(data => {
          setTips(data.tips);
          const tipData = data.tips.find(t => t.id === parseInt(tipId));
          setTip(tipData);
        })
        .catch(error => console.error('Error loading data:', error));
    }
  }, [category, tipId]);

  const handlers = useSwipeable({
    onSwipedLeft: () => navigate(`/tips/${categoryId}/${getNextTipId()}`),
    onSwipedRight: () => navigate(`/tips/${categoryId}/${getPrevTipId()}`),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  const getNextTipId = () => {
    const currentIndex = tips.findIndex(t => t.id === parseInt(tipId));
    return tips[(currentIndex + 1) % tips.length].id;
  };

  const getPrevTipId = () => {
    const currentIndex = tips.findIndex(t => t.id === parseInt(tipId));
    return tips[(currentIndex - 1 + tips.length) % tips.length].id;
  };

  if (!tip || !category) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container} {...handlers}>
      <div style={styles.header}>
        <BackButton />
        <h1 style={styles.title}>{category.name}</h1>
      </div>
      <div style={styles.tip}>
        <img src={`/images/tips/${category.path}/${tip.image}`} alt={tip.title} style={styles.image} />
        {tip.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <div style={styles.navigation}>
        <button
          onClick={() => navigate(`/tips/${categoryId}/${getPrevTipId()}`)}
          disabled={parseInt(tipId) === 1}
          style={styles.navButton}
        >
          <img src="/images/app/left.svg" alt="Назад" style={styles.icon} />
        </button>
        <span style={styles.pageIndicator}>{`${tipId}/${tips.length}`}</span>
        <button
          onClick={() => navigate(`/tips/${categoryId}/${getNextTipId()}`)}
          disabled={parseInt(tipId) === tips.length}
          style={styles.navButton}
        >
          <img src="/images/app/right.svg" alt="Вперед" style={styles.icon} />
        </button>
      </div>
      <div style={styles.bottomSpace}></div>
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
    fontSize: '36px',
    fontFamily: 'Georgia, serif',
  },
  tip: {
    textAlign: 'center',
    margin: '0 auto',
    maxWidth: '400px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '400px',
    margin: '20px auto',
  },
  navButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  icon: {
    width: '30px',
    height: '30px',
  },
  pageIndicator: {
    fontSize: '24px',
    fontFamily: 'Georgia, serif',
  },
  bottomSpace: {
    height: '20px',
  },
};

export default TipDetailScreen;
