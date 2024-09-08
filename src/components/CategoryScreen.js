import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoriesPoses } from '../categoriesPoses';
import '../styles/global.css';
import BurgerMenu from './BurgerMenu'; // Импорт компонента бургер-меню
import { auth } from './firebaseConfig'; // Подключаем Firebase

function CategoryScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Добавляем состояние авторизации

  // Проверяем авторизацию при монтировании компонента
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true); // Пользователь авторизован
      } else {
        setIsLoggedIn(false); // Пользователь не авторизован
      }
    });

    // Отписываемся от слушателя при размонтировании компонента
    return () => unsubscribe();
  }, []);

  return (
    <div className="main-container">
      {/* Включаем бургер-меню */}
      <div className="header">
        <BurgerMenu isLoggedIn={isLoggedIn} />
      </div>

      <h1 className="title">Categories</h1>

      <div className="category-grid">
        {categoriesPoses.map((category) => (
          <Link to={`/pose-preview/${category.id}`} key={category.id} className="category-item">
            <img src={`/images/app/${category.icon}`} alt={category.name} className="category-icon" />
            <span className="category-text">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryScreen;
