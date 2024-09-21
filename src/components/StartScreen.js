import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import Modal from './Modal';
import SignInOut from './SignInOut';
import { auth } from './firebaseConfig';
import '../styles/global.css';


function StartScreen() {

  const [showModal, setShowModal] = useState(false); // состояние, управляющее видимостью модального окна
  const [isLoggedIn, setIsLoggedIn] = useState(false); // состояние для отслеживания, авторизован ли пользователь

  // проверка авторизации пользователя при загрузке компонента
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true); // устанавливаем, что пользователь авторизован
      } else {
        setIsLoggedIn(false); // устанавливаем, что пользователь не авторизован
      }
    });

    // отписываемся от слушателя событий при размонтировании компонента
    return () => unsubscribe();

  }, []);

  // обработчик клика на кнопку "Favorites"
  const handleFavoritesClick = (e) => {

    if (!isLoggedIn) {
      e.preventDefault(); // предотвращаем переход по ссылке, если пользователь не авторизован
      setShowModal(true); // открываем модальное окно с формой авторизации
    }

  };

  const closeModal = () => {
    setShowModal(false); // скрываем модальное окно
  };

  return (

    <div className="main-container">

      {/* шапка с бургер-меню, передаем в компонент информацию об авторизации */}
      <div className="startScreenHeader">
        <BurgerMenu isLoggedIn={isLoggedIn} />
      </div>

      <h1 className="titleSmall">— T H E —</h1>
      <h2 className="titleLarge">POSING</h2>
      <p className="description">Your story, my lens, a timeless masterpiece awaits</p>

      <img src="/images/app/start-screen.png" alt="Posing App" className="image" />

      <div className="button-container">

        <Link to="/categories" className="button">Poses</Link> {/* переход к категориям поз */}

        <Link to="/tips" className="button">Tips & Tricks</Link> {/* переход к советам и трюкам */}

        {/* кнопка "Favorites", доступна только если пользователь авторизован */}
        <Link
          to={isLoggedIn ? "/favorites" : "#"} // если пользователь не авторизован, ссылка не ведет никуда
          className="button"
          onClick={handleFavoritesClick} // если не авторизован, открываем окно авторизации
        >
          Favorites
        </Link>
      </div>

      {/* модальное окно, открывается при клике на favoritesf для неавторизованных пользователей */}
      {showModal && (

        <Modal onClose={closeModal}>
          <SignInOut closeModal={closeModal} /> {/* компонент формы входа/регистрации */}
        </Modal>

      )}

    </div>

  );

}

export default StartScreen;
