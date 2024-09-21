import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categoriesPoses } from '../categoriesPoses';
import '../styles/global.css'; // подключаем глобальные стили
import { ref, get, remove, set } from "firebase/database";
import { database, auth } from './firebaseConfig'; // подключаем firebase
import BurgerMenu from './BurgerMenu'; // подключаем бургер-меню
import Modal from './Modal'; // подключаем модальное окно
import SignInOut from './SignInOut'; // компонент для авторизации

function PoseDetailScreen() {

  const { categoryId, poseId } = useParams(); // получаем параметры из URL
  const [state, setState] = useState({ pose: { title: '', description: '', image: '' }, poses: [] }); // состояние для текущей позы и списка поз
  const [isPhotoFavorite, setIsPhotoFavorite] = useState(false); // состояние для избранного
  const [isModalOpen, setIsModalOpen] = useState(false); // состояние для модального окна авторизации
  const navigate = useNavigate(); // функция для навигации

  const category = categoriesPoses.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' }; // находим категорию по id или создаем пустую

  useEffect(() => {

    fetch(`/images/photos/${category.path}/data.json`)
      .then(response => response.json())
      .then(data => {
        const poseData = data.photos.find(p => p.id === parseInt(poseId)); // ищем текущую позу по id
        setState({ pose: poseData || { title: '', description: '', image: '' }, poses: data.photos }); // обновляем состояние с текущей позой и списком поз
      })
      .catch(error => console.error('Error loading data:', error)); // обработка ошибок при загрузке данных
  }, [category.path, poseId]);

  useEffect(() => {

    const checkIfFavorite = async () => {
      if (!auth.currentUser) {
        setIsPhotoFavorite(false); // если пользователь не авторизован, фото не может быть в избранном
        return;
      }

      const userId = auth.currentUser.uid; // получаем id текущего пользователя
      const favoriteKey = `${category.name}_${poseId}`; // формируем ключ для избранного
      const favoriteRef = ref(database, `users/${userId}/favorites/${favoriteKey}`); // создаем ссылку на данные избранного в базе

      try {
        const snapshot = await get(favoriteRef); // проверяем, есть ли данные в базе
        if (snapshot.exists()) {
          setIsPhotoFavorite(true); // если данные есть, фото в избранном
        } else {
          setIsPhotoFavorite(false); // если данных нет, фото не в избранном
        }

      } catch (error) {
        console.error("Error checking favorites:", error); // обработка ошибок при проверке
      }

    };

    checkIfFavorite();
  }, [category.name, poseId]);

  const handleFavoriteToggle = async () => {

    if (!auth.currentUser) {
      setIsModalOpen(true); // открываем модальное окно для авторизации, если пользователь не залогинен
      return;
    }

    const userId = auth.currentUser.uid; // получаем id текущего пользователя
    const favoriteKey = `${category.name}_${poseId}`; // формируем ключ для избранного
    const favoriteRef = ref(database, `users/${userId}/favorites/${favoriteKey}`); // создаем ссылку на конкретное избранное фото

    try {

      if (isPhotoFavorite) {
        await remove(favoriteRef); // удаляем из избранного, если фото уже добавлено
        setIsPhotoFavorite(false); // обновляем состояние
      } else {
        await set(favoriteRef, { photoId: poseId }); // добавляем фото в избранное
        setIsPhotoFavorite(true); // обновляем состояние
      }

    } catch (error) {
      console.error("Error updating favorites:", error); // обработка ошибок при обновлении избранного
    }

  };

  const nextPoseId = parseInt(poseId) < state.poses.length ? parseInt(poseId) + 1 : 1; // вычисляем id следующей позы
  const prevPoseId = parseInt(poseId) > 1 ? parseInt(poseId) - 1 : state.poses.length; // вычисляем id предыдущей позы

  return (
    <div className="main-container">
      {/* подключаем бургер-меню */}

      <div className="header">
        <BurgerMenu />
      </div>

      <h1 className="title">{category.name}</h1>

      <div className="pose-content">

        <div className="pose-image-container">

          <img src={`/images/photos/${category.path}/${state.pose.image}`} alt={state.pose.description} className="pose-image" />

          <button className="favorite-button" onClick={handleFavoriteToggle}>
            {isPhotoFavorite ? (
              // иконка для удаления из избранного
              <img src="/images/app/star_on.svg" alt="remove from favorites" />
            ) : (
              // иконка для добавления в избранное
              <img src="/images/app/star_off.svg" alt="add to favorites" />
            )}
          </button>

        </div>

        {/* название текущей позы */}
        <h2 className="pose-title">{state.pose.title}</h2>

        {/* описание текущей позы */}
        <p className="pose-description">{state.pose.description}</p>

      </div>

      <div className="pose-navigation">

        {/* кнопка для перехода к предыдущей позе */}
        <button onClick={() => navigate(`/pose-detail/${categoryId}/${prevPoseId}`)} className="pose-navButton">
          <img src="/images/app/left.svg" alt="previous" className="pose-icon" />
        </button>

        {/* индикатор текущей позы */}
        <span className="pose-pageIndicator">{`${poseId}/${state.poses.length}`}</span>

        {/* кнопка для перехода к следующей позе */}
        <button onClick={() => navigate(`/pose-detail/${categoryId}/${nextPoseId}`)} className="pose-navButton">
          <img src="/images/app/right.svg" alt="next" className="pose-icon" />
        </button>

      </div>

      {/* модальное окно для авторизации */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <SignInOut closeModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default PoseDetailScreen;
