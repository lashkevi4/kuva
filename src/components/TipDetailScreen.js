import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categoriesTips } from '../categoriesTips';
import { useSwipeable } from 'react-swipeable';
import '../styles/global.css';
import BurgerMenu from './BurgerMenu';

function TipDetailScreen() {
  // получаем параметры из url
  const { categoryId, tipId } = useParams();

  // находим следующий совет, чтобы перейти к нему
  const [state, setState] = useState({
    tip: { title: '', content: [], image: '' },
    tips: []
  });

  // создаем навигацию для перехода по страницам
  const navigate = useNavigate();

  // ищем категорию по id, если нет — задаем пустое значение
  const category = categoriesTips.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' };

  useEffect(() => {

    // создаем url для запроса данных с сервера
    const url = `/data/tips/${category.path}/data.json`;

    // отправляем запрос на сервер для получения данных
    fetch(url)

      // преобразуем ответ сервера в формат json
      .then(response => response.json())
      .then(data => {

        // находим совет по id в списке данных
        const tipData = data.tips.find(t => t.id === parseInt(tipId));

        // обновляем данные текущего совета и всех советов
        setState({
          tip: tipData || { title: '', content: [], image: '' },
          tips: data.tips
        });
      })
      .catch(error => {
        // выводим ошибку в консоль
        console.error('Error loading data:', error);
      });

    // зависимости: путь категории и id совета
  }, [category.path, tipId]);

  // получаем id следующего совета
  const getNextTipId = () => {

    // находим индекс текущего совета
    const currentIndex = state.tips.findIndex(t => t.id === parseInt(tipId));

    // вычисляем индекс следующего совета
    const nextIndex = (currentIndex + 1) % state.tips.length;

    // возвращаем индекс следующего совета
    return state.tips[nextIndex].id;
  };

  // получаем индекс предыдущего совета
  const getPrevTipId = () => {

    // находим индекс текущего совета
    const currentIndex = state.tips.findIndex(t => t.id === parseInt(tipId));

    // вычисляем индекс предыдущего совета
    const prevIndex = (currentIndex - 1 + state.tips.length) % state.tips.length;

    // возвращаем индекс предыдущего совета
    return state.tips[prevIndex].id;
  };

  // обрабатываем свайп влево
  const handleSwipeLeft = () => {
    const nextTipId = getNextTipId();
    navigate(`/tips/${categoryId}/${nextTipId}`);
  };

  // обрабатываем свайп вправо
  const handleSwipeRight = () => {
    const prevTipId = getPrevTipId();
    navigate(`/tips/${categoryId}/${prevTipId}`);
  };

  // настраиваем свайпы с помощью useSwipeable
  const handlers = useSwipeable({

    // свайп влево - вызываем handleSwipeLeft
    onSwipedLeft: handleSwipeLeft,

    // свайп вправо - вызываем handleSwipeRight
    onSwipedRight: handleSwipeRight,

    // Предотвращаем стандартное поведение при свайпе
    preventDefaultTouchmoveEvent: true,

    // должно работать но у меня не заработало
    trackMouse: true
  });

  return (

    <div className="main-container">

      <div className="header">
        <BurgerMenu />
      </div>

      <h1 className="title">{category.name}</h1>

      <div className="tip" {...handlers}>

        <img
          src={`/images/tips/${category.path}/${state.tip.image}`}
          alt={state.tip.title}
          className="tip-image"
        />

        <h2 className="tip-title">{state.tip.title}</h2>

        {state.tip.content.map((paragraph, index) => (
          <p key={index} className="tip-content">{paragraph}</p>
        ))}

      </div>

      <div className="tip-navigation">

        {/* кнопка влево */}
        <button onClick={() => navigate(`/tips/${categoryId}/${getPrevTipId()}`)} className="tip-navButton">
          <img src="/images/app/left.svg" alt="previous" className="tip-icon" />
        </button>

        {/* номер текущей позы */}
        <span className="tip-pageIndicator">{`${tipId}/${state.tips.length}`}</span>

        {/* кнопка вправо */}
        <button onClick={() => navigate(`/tips/${categoryId}/${getNextTipId()}`)} className="tip-navButton">
          <img src="/images/app/right.svg" alt="next" className="tip-icon" />
        </button>

      </div>

      {/* дополнительное пространство внизу */}
      <div className="tip-bottomSpace"></div>

    </div>

  );
}

export default TipDetailScreen;
