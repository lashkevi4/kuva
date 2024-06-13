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
    <div className={`container ${swipeDirection}`} {...handlers}>
      <div className="header">
        <Link to={`/pose-preview/${categoryId}`} className="backButton">
          <img src="/images/app/back.svg" alt="Назад" className="backIcon" />
        </Link>
        <h1 className="title">{category.name}</h1>
      </div>
      <div
        className="content"
        style={{
          animationName: swipeDirection === 'left' ? 'swipeLeft' : swipeDirection === 'right' ? 'swipeRight' : 'none',
          animationDuration: `${animationDuration}ms`,
        }}
      >
        <img src={`/images/${category.path}/${pose.image}`} alt={pose.description} className="image" />
        <p className="description">{pose.description}</p>
      </div>
    </div>
  );
}

export default PoseDetailScreen;
