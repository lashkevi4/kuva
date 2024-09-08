import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { categoriesTips } from '../categoriesTips';
import '../styles/global.css';
import BurgerMenu from './BurgerMenu'; // Подключаем бургер-меню

function TipDetailScreen() {
  const { categoryId, tipId } = useParams();
  const [state, setState] = useState({ tip: { title: '', content: [], image: '' }, tips: [] });
  const navigate = useNavigate();

  const category = categoriesTips.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' };

  useEffect(() => {
    fetch(`/data/tips/${category.path}/data.json`)
      .then(response => response.json())
      .then(data => {
        const tipData = data.tips.find(t => t.id === parseInt(tipId));
        setState({ tip: tipData || { title: '', content: [], image: '' }, tips: data.tips });
      })
      .catch(error => console.error('Error loading data:', error));
  }, [category.path, tipId]);

  const getNextTipId = () => {
    const currentIndex = state.tips.findIndex(t => t.id === parseInt(tipId));
    return state.tips[(currentIndex + 1) % state.tips.length].id;
  };

  const getPrevTipId = () => {
    const currentIndex = state.tips.findIndex(t => t.id === parseInt(tipId));
    return state.tips[(currentIndex - 1 + state.tips.length) % state.tips.length].id;
  };

  return (
    <div className="main-container">
      <div className="header">
        <BurgerMenu /> {/* Подключаем бургер-меню */}
      </div>

      <h1 className="title">{category.name}</h1>

      <div className="tip">
        <img src={`/images/tips/${category.path}/${state.tip.image}`} alt={state.tip.title} className="tip-image" />
        <h2 className="tip-title">{state.tip.title}</h2>
        {state.tip.content.map((paragraph, index) => (
          <p key={index} className="tip-content">{paragraph}</p>
        ))}
      </div>

      <div className="tip-navigation">
        <button onClick={() => navigate(`/tips/${categoryId}/${getPrevTipId()}`)} className="tip-navButton">
          <img src="/images/app/left.svg" alt="previous" className="tip-icon" />
        </button>
        <span className="tip-pageIndicator">{`${tipId}/${state.tips.length}`}</span>
        <button onClick={() => navigate(`/tips/${categoryId}/${getNextTipId()}`)} className="tip-navButton">
          <img src="/images/app/right.svg" alt="next" className="tip-icon" />
        </button>
      </div>
      <div className="tip-bottomSpace"></div>
    </div>
  );
}

export default TipDetailScreen;
