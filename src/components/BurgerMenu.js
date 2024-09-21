import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link, useNavigate } from 'react-router-dom'; //   useNavigate для перехода
import SignInOut from './SignInOut'; // авторизация
import Modal from './Modal'; // компонент модального окна
import { auth } from './firebaseConfig'; // firebase конфигурация
import '../styles/global.css';

// основной компонент бокового меню
const BurgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false); // состояние открытия меню
  const [isModalOpen, setIsModalOpen] = useState(false); // состояние открытия модального окна
  const [isLoggedIn, setIsLoggedIn] = useState(false); // состояние авторизации пользователя

  const navigate = useNavigate(); // хук для перехода между страницами

  // проверка статуса авторизации пользователя
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // обновление состояния авторизации
    });
    return unsubscribe; // отписка при размонтировании компонента
  }, []);

  const closeMenu = () => setMenuOpen(false); // закрытие бокового меню

  // обработка клика на "избранное", открывает окно входа, если не авторизован
  const handleFavoritesClick = (event) => {
    if (!isLoggedIn) {
      event.preventDefault();
      setIsModalOpen(true); // открываем модальное окно для авторизации
      closeMenu(); // закрываем меню
    } else {
      closeMenu();
    }
  };

  // функция выхода из аккаунта
  const handleSignOut = () => {
    auth.signOut().then(() => {
      closeMenu(); // закрываем меню после выхода
      navigate('/'); // переход на главную страницу
    });
  };

  // открытие модального окна и закрытие меню
  const openModalAndCloseMenu = () => {
    setIsModalOpen(true); // открываем окно авторизации
    closeMenu(); // закрываем меню
  };

  return (
    <div className="burgerMenuContainer">
      <Menu
        isOpen={menuOpen}
        onStateChange={({ isOpen }) => setMenuOpen(isOpen)} // обновление состояния меню
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
          onClick={handleFavoritesClick} // обработчик клика на "избранное"
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

      {/* модальное окно для авторизации */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <SignInOut closeModal={() => setIsModalOpen(false)} />
        </Modal>
      )}

      {/* кнопка бургера для открытия меню */}
      <div className="burgerIcon" onClick={() => setMenuOpen(!menuOpen)}>
        <img src="/images/app/burger.svg" alt="Menu" className="burgerIconSvg" />
      </div>
    </div>
  );
};

export default BurgerMenu;
