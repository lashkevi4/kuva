import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { categoriesPoses } from '../categoriesPoses';
import './PoseDetailScreen.css';

function PoseDetailScreen() {
  const { categoryId, poseId } = useParams();
  const [state, setState] = useState({ pose: { title: '', description: '', image: '' }, poses: [] });
  const [swipeDirection, setSwipeDirection] = useState('');
  const navigate = useNavigate();
  const animationDuration = 500;

  const category = useMemo(
    () => categoriesPoses.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' },
    [categoryId]
  );

  useEffect(() => {
    fetch(`/images/photos/${category.path}/data.json`)
      .then(response => response.json())
      .then(data => {
        const poseData = data.photos.find(p => p.id === parseInt(poseId)); // Изменение здесь
        setState({ pose: poseData || { title: '', description: '', image: '' }, poses: data.photos }); // Изменение здесь
      })
      .catch(error => console.error('Error loading data:', error));
  }, [category.path, poseId]);

  const nextPoseId = parseInt(poseId) < state.poses.length ? parseInt(poseId) + 1 : 1;
  const prevPoseId = parseInt(poseId) > 1 ? parseInt(poseId) - 1 : state.poses.length;

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

  return (
    <div className={`pose-container ${swipeDirection}`} {...handlers}>
      <div className="pose-header">
        <Link to={`/pose-preview/${categoryId}`} className="pose-backButton">
          <img src="/images/app/back.svg" alt="back" className="pose-backIcon" />
        </Link>
        <h1 className="pose-title">{category.name}</h1>
      </div>
      <div
        className="pose-content"
        style={{
          animationName: swipeDirection === 'left' ? 'swipeLeft' : swipeDirection === 'right' ? 'swipeRight' : 'none',
        }}
      >
        <img src={`/images/photos/${category.path}/${state.pose.image}`} alt={state.pose.description} className="pose-image" />
        <h2 className="pose-title">{state.pose.title}</h2> {/* Добавлено */}
        <p className="pose-description">{state.pose.description}</p>
      </div>
      <div className="pose-navigation">
        <button onClick={() => navigate(`/pose-detail/${categoryId}/${prevPoseId}`)} className="pose-navButton">
          <img src="/images/app/left.svg" alt="back" className="pose-icon" />
        </button>
        <span className="pose-pageIndicator">{`${poseId}/${state.poses.length}`}</span>
        <button onClick={() => navigate(`/pose-detail/${categoryId}/${nextPoseId}`)} className="pose-navButton">
          <img src="/images/app/right.svg" alt="back" className="pose-icon" />
        </button>
      </div>
    </div>
  );
}

export default PoseDetailScreen;
