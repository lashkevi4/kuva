import React from 'react';
import { Link } from 'react-router-dom';
// импортируем компонент link, возволяет осуществлять навигацию между стр. без перезагрузки
import { categoriesPoses } from '../categoriesPoses';
// подключаю categoriesPoses, содержит данные о категориях
import './CategoryScreen.css';

function CategoryScreen() {
  // определяем функцию-компонент CategoryScreen, которая будет отображать экран с категориями.

  return (
    <div className="container">

      <div className="header">
        <Link to="/" className="backButton">
          <img src="/images/app/back.svg" alt="back" className="backIcon" />
        </Link>

        <h1 className="title">Categories</h1>
      </div>

      <div className="grid">
        {categoriesPoses.map(category => (
          <Link to={`/pose-preview/${category.id}`} key={category.id} className="item">
            {/* создём ссылки для каждой категории, используя ID */}

            <img src={`/images/app/${category.icon}`} alt={category.name} className="icon" />
            {/* отображаем иконку категории, путь создаёится динамически */}

            <span className="text">{category.name}</span>
            {/* под иконкой название категории. */}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryScreen;
// экспортирую компонент, для использования в других частях приложения
