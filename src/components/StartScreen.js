import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import BurgerMenu from './BurgerMenu';
import Modal from './Modal';
import SignInOut from './SignInOut'; // Импорт компонента авторизации
import { auth } from './firebaseConfig'; // Импорт Firebase конфигурации

function StartScreen() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние для отслеживания авторизации

  // Проверяем состояние пользователя при монтировании компонента
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true); // Если пользователь залогинен
      } else {
        setIsLoggedIn(false); // Если пользователь не залогинен
      }
    });

    // Отписываемся от слушателя при размонтировании компонента
    return () => unsubscribe();
  }, []);

  const handleFavoritesClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Предотвращаем переход по ссылке, если пользователь не авторизован
      setShowModal(true); // Открываем модальное окно
    }
  };

  const closeModal = () => {
    setShowModal(false); // Закрываем модальное окно
  };

  return (
    <div className="main-container">
      <div className="startScreenHeader">
        <BurgerMenu isLoggedIn={isLoggedIn} /> {/* Передаем состояние авторизации в бургер меню */}
      </div>

      <h1 className="titleSmall">— T H E —</h1>
      <h2 className="titleLarge">POSING</h2>
      <p className="description">Your story, my lens, a timeless masterpiece awaits</p>
      <img src="/images/app/start-screen.png" alt="Posing App" className="image" />

      <div className="button-container">
        <Link to="/categories" className="button">Poses</Link>
        <Link to="/tips" className="button">Tips & Tricks</Link>

        {/* Favorites Button */}
        <Link
          to={isLoggedIn ? "/favorites" : "#"}
          className="button"
          onClick={handleFavoritesClick}
        >
          Favorites
        </Link>
      </div>

      {showModal && (
        <Modal onClose={closeModal}>
          {/* Заменил текстовое сообщение на компонент авторизации */}
          <SignInOut closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default StartScreen;
