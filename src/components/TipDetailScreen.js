import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Добавлен импорт Link
import { categoriesTips } from '../categoriesTips';
import { slide as Menu } from 'react-burger-menu';
import BackButton from './BackButton';
import '../styles/global.css'; // Подключение глобальных стилей

function TipDetailScreen() {
  const { categoryId, tipId } = useParams();
  const [state, setState] = useState({ tip: { title: '', content: [], image: '' }, tips: [] });
  const [menuOpen, setMenuOpen] = useState(false);
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

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="main-container">
      <div className="header">
        <BackButton />
        <div className="iconButton">
          <img
            src="/images/app/burger.svg"
            alt="menu"
            className="iconImage"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>

      <h1 className="title">{category.name}</h1>

      <Menu
        isOpen={menuOpen}
        onStateChange={handleStateChange}
        width={'70%'}
        customBurgerIcon={false}
        customCrossIcon={false}
      >
        <Link to="/" onClick={closeMenu} className="menu-item">
          Home
        </Link>
        <Link to="/categories" onClick={closeMenu} className="menu-item">
          Poses
        </Link>
        <Link to="/tips" onClick={closeMenu} className="menu-item">
          Tips & Tricks
        </Link>
        <Link to="/favorites" onClick={closeMenu} className="menu-item">
          Favorites
        </Link>
      </Menu>

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
