import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoriesPoses } from '../categoriesPoses';
import '../styles/global.css';
import BurgerMenu from './BurgerMenu';

function PosePreviewScreen() {
  const { categoryId } = useParams(); // получаем параметр categoryid из url

  // находим категорию по id или создаем пустую категорию, если не найдено
  const category = useMemo(() => categoriesPoses.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' }, [categoryId]);

  const [poses, setPoses] = useState([]); // состояние для списка поз

  // загружаем данные о позах из соответствующего json файла на сервере
  useEffect(() => {

    fetch(`/images/photos/${category.path}/data.json`)
      .then(response => response.json())
      .then(data => setPoses(data.photos)) // обновляем состояние с загруженными позами
      .catch(error => console.error('Error loading data:', error)); // обработка ошибок при загрузке данных
  }, [category.path]);

  return (

    <div className="main-container">

      {/* подключаем бургер-меню */}
      <div className="header">
        <BurgerMenu />
      </div>

      {/* отображаем название категории */}
      <h1 className="title">{category.name}</h1>

      {/* отображаем сетку с превью всех поз в категории */}
      <div className="preview-grid">

        {poses.map(pose => (

          <Link to={`/pose-detail/${categoryId}/${pose.id}`} key={pose.id} className="preview-item">
            <img src={`/images/photos/${category.path}/${pose.image}`} alt={pose.description} className="preview-image" /> {/* превью изображения позы */}
          </Link>

        ))}

      </div>

    </div>

  );
}

export default PosePreviewScreen;
