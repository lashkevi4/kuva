import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { categoriesTips } from '../categoriesTips';
import './TipDetailScreen.css';

function TipDetailScreen() {
  const { categoryId, tipId } = useParams();
  const [tip, setTip] = useState(null);
  const [tips, setTips] = useState([]);
  const category = categoriesTips.find(c => c.id === parseInt(categoryId));
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
    trackMouse: true,
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
    <div className="container" {...handlers}>
      <div className="header">
        <button onClick={() => navigate('/tips')} className="backButton">
          <img src="/images/app/back.svg" alt="back" className="backIcon" />
        </button>
        <h1 className="title">{category.name}</h1>
      </div>
      <div className="tip">
        <img src={`/images/tips/${category.path}/${tip.image}`} alt={tip.title} className="image" />
        <h2 className="tipTitle">{tip.title}</h2>
        {tip.content.map((paragraph, index) => (
          <p key={index} className="tipContent">{paragraph}</p>
        ))}
      </div>
      <div className="navigation">
        <button
          onClick={() => navigate(`/tips/${categoryId}/${getPrevTipId()}`)}
          className="navButton"
        >
          <img src="/images/app/left.svg" alt="previous" className="icon" />
        </button>
        <span className="pageIndicator">{`${tipId}/${tips.length}`}</span>
        <button
          onClick={() => navigate(`/tips/${categoryId}/${getNextTipId()}`)}
          className="navButton"
        >
          <img src="/images/app/right.svg" alt="next" className="icon" />
        </button>
      </div>
      <div className="bottomSpace"></div>
    </div>
  );
}

export default TipDetailScreen;
