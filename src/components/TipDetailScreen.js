import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categoriesTips } from '../categoriesTips';
import './TipDetailScreen.css';

function TipDetailScreen() {
  const { categoryId, tipId } = useParams(); // получаем id категории и совета из url
  const [state, setState] = useState({ tip: { title: '', content: [], image: '' }, tips: [] });
  const navigate = useNavigate(); // хук для навигации

  // находим нужную категорию по id
  const category = categoriesTips.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' };

  // загружаем данные о советах при монтировании компонента
  useEffect(() => {
    fetch(`/data/tips/${category.path}/data.json`)
      .then(response => response.json()) //преобразуем ответ в JSON
      .then(data => {
        const tipData = data.tips.find(t => t.id === parseInt(tipId)); // находим данные по текущему совету
        setState({ tip: tipData || { title: '', content: [], image: '' }, tips: data.tips }); // сохраняем данные в состояние
      })
      .catch(error => console.error('Error loading data:', error)); // выводим ошибку в консоль
  }, [category.path, tipId]);

  // Находим индекс текущего совета и возвращаем ID следующего совета.
  // Если текущий совет последний, возвращаем ID первого совета
  const getNextTipId = () => {
    const currentIndex = state.tips.findIndex(t => t.id === parseInt(tipId));
    return state.tips[(currentIndex + 1) % state.tips.length].id;
  };

  // Находим индекс текущего совета и возвращаем ID предыдущего совета.
  // Если текущий совет первый, возвращаем ID последнего совета.
  const getPrevTipId = () => {
    const currentIndex = state.tips.findIndex(t => t.id === parseInt(tipId));
    return state.tips[(currentIndex - 1 + state.tips.length) % state.tips.length].id;
  };

  return (
    <div className="container">
      <div className="header">
        <button onClick={() => navigate('/tips')} className="backButton">
          <img src="/images/app/back.svg" alt="back" className="backIcon" />
        </button>
        <h1 className="title">{category.name}</h1> {/* название категории */}
      </div>

      <div className="tip">
        <img src={`/images/tips/${category.path}/${state.tip.image}`} alt={state.tip.title} className="image" />
        <h2 className="tipTitle">{state.tip.title}</h2> {/* заголовок совета */}
        {state.tip.content.map((paragraph, index) => (
          <p key={index} className="tipContent">{paragraph}</p>
        ))} {/* содержимое совета */}
      </div>

      <div className="navigation">
        <button
          onClick={() => navigate(`/tips/${categoryId}/${getPrevTipId()}`)}
          className="navButton"
        >
          <img src="/images/app/left.svg" alt="previous" className="icon" />
        </button>
        <span className="pageIndicator">{`${tipId}/${state.tips.length}`}</span> {/* номер текущего совета */}
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
