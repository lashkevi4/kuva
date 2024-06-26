import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { categories } from '../categories';
import './PoseDetailScreen.css';

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
    <div className={`pose-container ${swipeDirection}`} {...handlers}>
      <div className="pose-header">
        <Link to={`/pose-preview/${categoryId}`} className="pose-backButton">
          <img src="/images/app/back.svg" alt="Назад" className="pose-backIcon" />
        </Link>
        <h1 className="pose-title">{category.name}</h1>
      </div>
      <div
        className="pose-content"
        style={{
          animationName: swipeDirection === 'left' ? 'swipeLeft' : swipeDirection === 'right' ? 'swipeRight' : 'none',
          animationDuration: `${animationDuration}ms`,
        }}
      >
        <img src={`/images/${category.path}/${pose.image}`} alt={pose.description} className="pose-image" />
        <p className="pose-description">{pose.description}</p>
      </div>
      <div className="pose-navigation">
        <button onClick={() => navigate(`/pose-detail/${categoryId}/${prevPoseId}`)} className="pose-navButton">
          <img src="/images/app/left.svg" alt="Назад" className="pose-icon" />
        </button>
        <span className="pose-pageIndicator">{`${poseId}/${poses.length}`}</span>
        <button onClick={() => navigate(`/pose-detail/${categoryId}/${nextPoseId}`)} className="pose-navButton">
          <img src="/images/app/right.svg" alt="Вперед" className="pose-icon" />
        </button>
      </div>
    </div>
  );
}

export default PoseDetailScreen;
