import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categoriesTips } from '../categoriesTips';
import '../styles/global.css';
import BurgerMenu from './BurgerMenu';

function TipDetailScreen() {

  const { categoryId, tipId } = useParams(); // получение параметров из URL
  const [state, setState] = useState({ tip: { title: '', content: [], image: '' }, tips: [] }); // инициализация состояния
  const navigate = useNavigate(); // хук для навигации

  // поиск категории по categoryid или использование пустых значений по умолчанию
  const category = categoriesTips.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' };

  useEffect(() => {

    // запрос данных советов для выбранной категории
    fetch(`/data/tips/${category.path}/data.json`)
      .then(response => response.json())
      .then(data => {

        // поиск конкретного совета по tipid
        const tipData = data.tips.find(t => t.id === parseInt(tipId));

        // обновление состояния с текущим советом и списком всех советов
        setState({ tip: tipData || { title: '', content: [], image: '' }, tips: data.tips });
      })
      .catch(error => console.error('Ошибка загрузки данных:', error));

  }, [category.path, tipId]);

  // функция для получения id следующего совета
  const getNextTipId = () => {
    const currentIndex = state.tips.findIndex(t => t.id === parseInt(tipId)); // индекс текущего совета
    return state.tips[(currentIndex + 1) % state.tips.length].id; // id следующего совета (с зацикливанием)
  };

  // функция для получения id предыдущего совета
  const getPrevTipId = () => {

    const currentIndex = state.tips.findIndex(t => t.id === parseInt(tipId)); // индекс текущего совета

    return state.tips[(currentIndex - 1 + state.tips.length) % state.tips.length].id; // id предыдущего совета (с зацикливанием)
  };

  return (

    <div className="main-container">

      {/* Компонент бургер-меню */}
      <div className="header">
        <BurgerMenu />
      </div>

      <h1 className="title">{category.name}</h1> {/* отображение названия категории */}

      <div className="tip">

        <img
          src={`/images/tips/${category.path}/${state.tip.image}`}
          alt={state.tip.title}
          className="tip-image"
        />

        <h2 className="tip-title">{state.tip.title}</h2> {/* отображение заголовка совета */}

        {/* отображение контента совета */}
        {state.tip.content.map((paragraph, index) => (
          <p key={index} className="tip-content">{paragraph}</p>
        ))}

      </div>

      <div className="tip-navigation">

        {/* кнопка перехода к предыдущему совету */}
        <button onClick={() => navigate(`/tips/${categoryId}/${getPrevTipId()}`)} className="tip-navButton">
          <img src="/images/app/left.svg" alt="previous" className="tip-icon" />
        </button>

        {/* индикатор текущей страницы */}
        <span className="tip-pageIndicator">{`${tipId}/${state.tips.length}`}</span>

        {/* кнопка перехода к следующему совету */}
        <button onClick={() => navigate(`/tips/${categoryId}/${getNextTipId()}`)} className="tip-navButton">
          <img src="/images/app/right.svg" alt="next" className="tip-icon" />
        </button>

      </div>

      <div className="tip-bottomSpace"></div> {/* дополнительное пространство внизу */}

    </div>
  );
}

export default TipDetailScreen;
