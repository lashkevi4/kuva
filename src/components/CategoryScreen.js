import React from 'react';
import { Link } from 'react-router-dom';
// Импортируем Link для навигации между страницами без перезагрузки страницы.
import { categoriesPoses } from '../categoriesPoses';
// Импортируем данные о категориях из categoriesPoses.
import './CategoryScreen.css';
// Подключаем CSS файл для стилизации компонента.

function CategoryScreen() {
  // Определяем компонент CategoryScreen, который отвечает за отображение категорий.

  return (
    <div className="container">
      {/* Основной контейнер компонента */}

      <div className="header">
        {/* Заголовок страницы с кнопкой назад */}
        <Link to="/" className="backButton">
          <img src="/images/app/back.svg" alt="back" className="backIcon" />
        </Link>

        <h1 className="title">Categories</h1>
      </div>

      <div className="grid">
        {/* Сетка для отображения категорий */}
        {categoriesPoses.map(category => (
          <Link to={`/pose-preview/${category.id}`} key={category.id} className="item">
            {/* Создаем ссылку для каждой категории, используем уникальный ID в качестве ключа */}

            <img src={`/images/app/${category.icon}`} alt={category.name} className="icon" />
            {/* Отображаем иконку категории */}

            <span className="text">{category.name}</span>
            {/* Отображаем название категории */}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryScreen;
// Экспортируем компонент для использования в других частях приложения
