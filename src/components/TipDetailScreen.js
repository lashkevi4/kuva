import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { categoriesTips } from '../categoriesTips';
import './TipDetailScreen.css';

function TipDetailScreen() {
  const { categoryId, tipId } = useParams();
  const [state, setState] = useState({ tip: { title: '', content: [], image: '' }, tips: [] });
  const navigate = useNavigate();

  const category = useMemo(
    () => categoriesTips.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' },
    [categoryId]
  );

  useEffect(() => {
    fetch(`/data/tips/${category.path}/data.json`)
      .then(response => response.json())
      .then(data => {
        const tipData = data.tips.find(t => t.id === parseInt(tipId));
        setState({ tip: tipData || { title: '', content: [], image: '' }, tips: data.tips });
      })
      .catch(error => console.error('Error loading data:', error));
  }, [category.path, tipId]);

  const handlers = useSwipeable({
    onSwipedLeft: () => navigate(`/tips/${categoryId}/${getNextTipId()}`),
    onSwipedRight: () => navigate(`/tips/${categoryId}/${getPrevTipId()}`),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const getNextTipId = () => {
    const currentIndex = state.tips.findIndex(t => t.id === parseInt(tipId));
    return state.tips[(currentIndex + 1) % state.tips.length].id;
  };

  const getPrevTipId = () => {
    const currentIndex = state.tips.findIndex(t => t.id === parseInt(tipId));
    return state.tips[(currentIndex - 1 + state.tips.length) % state.tips.length].id;
  };

  return (
    <div className="container" {...handlers}>
      <div className="header">
        <button onClick={() => navigate('/tips')} className="backButton">
          <img src="/images/app/back.svg" alt="back" className="backIcon" />
        </button>
        <h1 className="title">{category.name}</h1>
      </div>
      <div className="tip">
        <img src={`/images/tips/${category.path}/${state.tip.image}`} alt={state.tip.title} className="image" />
        <h2 className="tipTitle">{state.tip.title}</h2>
        {state.tip.content.map((paragraph, index) => (
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
        <span className="pageIndicator">{`${tipId}/${state.tips.length}`}</span>
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
