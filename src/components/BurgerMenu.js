import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link, useNavigate } from 'react-router-dom'; // Добавили useNavigate для перехода
import SignInOut from './SignInOut'; // Компонент для авторизации
import Modal from './Modal'; // Компонент модального окна
import { auth } from './firebaseConfig'; // Firebase конфигурация
import '../styles/global.css';

const BurgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate(); // Добавили useNavigate для перехода

  // Проверка статуса авторизации при изменении состояния
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // Проверка авторизации
    });
    return unsubscribe; // Отписка при размонтировании
  }, []);

  const closeMenu = () => setMenuOpen(false); // Закрытие меню

  const handleFavoritesClick = (event) => {
    if (!isLoggedIn) {
      event.preventDefault();
      setIsModalOpen(true); // Открываем окно авторизации, если не залогинен
      closeMenu(); // Закрываем меню
    } else {
      closeMenu();
    }
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      closeMenu(); // Закрываем меню
      navigate('/'); // Переход на стартовую страницу после выхода
    });
  };

  // Новая функция для открытия модального окна и закрытия меню
  const openModalAndCloseMenu = () => {
    setIsModalOpen(true); // Открываем модальное окно
    closeMenu(); // Закрываем меню
  };

  return (
    <div className="burgerMenuContainer">
      <Menu
        isOpen={menuOpen}
        onStateChange={({ isOpen }) => setMenuOpen(isOpen)} // Простое обновление состояния
        left
        width={'70%'}
        customBurgerIcon={false}
        customCrossIcon={false}
      >
        <Link to="/" className="burgerMenuItem button" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/categories" className="burgerMenuItem button" onClick={closeMenu}>
          Poses
        </Link>
        <Link to="/tips" className="burgerMenuItem button" onClick={closeMenu}>
          Tips & Tricks
        </Link>

        <Link
          to={isLoggedIn ? "/favorites" : "#"}
          className="burgerMenuItem button"
          onClick={handleFavoritesClick}
        >
          Favorites
        </Link>

        {isLoggedIn ? (
          <Link to="#" className="burgerMenuItem button" onClick={handleSignOut}>
            Sign Out
          </Link>
        ) : (
          <Link to="#" className="burgerMenuItem button" onClick={openModalAndCloseMenu}>
            Sign In
          </Link>
        )}
      </Menu>

      {/* Модальное окно для авторизации */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <SignInOut closeModal={() => setIsModalOpen(false)} />
        </Modal>
      )}

      {/* Кнопка бургера */}
      <div className="burgerIcon" onClick={() => setMenuOpen(!menuOpen)}>
        <img src="/images/app/burger.svg" alt="Menu" className="burgerIconSvg" />
      </div>
    </div>
  );
};

export default BurgerMenu;
