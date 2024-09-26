import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categoriesPoses } from '../categoriesPoses';
import { ref, get, remove, set } from "firebase/database";
import { database, auth } from './firebaseConfig';
import BurgerMenu from './BurgerMenu';
import Modal from './Modal';
import SignInOut from './SignInOut';
import { useSwipeable } from 'react-swipeable';
import '../styles/global.css';

function PoseDetailScreen() {
  // берем параметры из url
  const { categoryId, poseId } = useParams();

  //создаем состояние для текущей позы и всех поз
  const [state, setState] = useState({
    pose: { title: '', description: '', image: '' },
    poses: []
  });

  // создаем состояние для избранного и состояния модального окна
  const [isPhotoFavorite, setIsPhotoFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // создаем функцию для навигации между страницами
  const navigate = useNavigate();

  // ищем категорию по id
  const category = categoriesPoses.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' };

  // загружаем данные о позах при изменении категории или позы
  useEffect(() => {
    fetch(`/images/photos/${category.path}/data.json`)
      .then(response => response.json())
      .then(data => {
        // ищем текущую позу по id
        const poseData = data.photos.find(p => p.id === parseInt(poseId));
        // обновляем состояние с данными поз
        setState({
          pose: poseData || { title: '', description: '', image: '' },
          poses: data.photos
        });
      })
      .catch(error => console.error('Error loading data:', error));
  }, [category.path, poseId]);

  // Проверяем, добавлена ли поза в избранное
  useEffect(() => {

    // функция для проверки, является ли поза избранной
    const checkIfFavorite = async () => {

      // если пользователь не авторизован, сбрасываем флаг избранного
      if (!auth.currentUser) {
        setIsPhotoFavorite(false);
        return;
      }

      // получаем id пользователя и создаем ключ избранного
      const userId = auth.currentUser.uid;
      const favoriteKey = `${category.name}_${poseId}`;
      // создаем ссылку на запись избранного в базе данных
      const favoriteRef = ref(database, `users/${userId}/favorites/${favoriteKey}`);

      try {
        // проверяем, существует ли запись в избранном
        const snapshot = await get(favoriteRef);
        // обновляем состояние избранного в зависимости от наличия записи
        setIsPhotoFavorite(snapshot.exists());
      } catch (error) {
        // сообщение об ошибке в консоль
        console.error("Error checking favorite:", error);
      }

    };

    checkIfFavorite();
  }, [category.name, poseId]);

  // функция для добавления или удаления позы в избранное
  const handleFavoriteToggle = async () => {
    if (!auth.currentUser) {
      setIsModalOpen(true);
      return;
    }

    // создаем данные для ссылки на избранное: id пользователя, ключ и путь в базе данных
    const userId = auth.currentUser.uid;
    const favoriteKey = `${category.name}_${poseId}`;
    const favoriteRef = ref(database, `users/${userId}/favorites/${favoriteKey}`);

    // переключаем состояние избранного: добавляем или удаляем позу 'в' или 'из' избранного
    try {
      if (isPhotoFavorite) {

        // если поза уже в избранном, удаляем ее из базы данных и обновляем состояние
        await remove(favoriteRef);
        setIsPhotoFavorite(false);
      } else {

        // если поза не в избранном, добавляем ее в базу данных и обновляем состояние
        await set(favoriteRef, { photoId: poseId });
        setIsPhotoFavorite(true);
      }
    } catch (error) {
      // обрабатываем ошибку при обновлении избранного
      console.error("Error updating favorite:", error);
    }
  };

  // рассчитываем id для следующей и предыдущей позы
  const nextPoseId = parseInt(poseId) < state.poses.length ? parseInt(poseId) + 1 : 1;
  const prevPoseId = parseInt(poseId) > 1 ? parseInt(poseId) - 1 : state.poses.length;

  // настраиваем жесты свайпов
  const handlers = useSwipeable({
    onSwipedLeft: () => navigate(`/pose-detail/${categoryId}/${nextPoseId}`),
    onSwipedRight: () => navigate(`/pose-detail/${categoryId}/${prevPoseId}`),
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

      <div className="pose-content" {...handlers}>

        <div className="pose-image-container">

          <img
            src={`/images/photos/${category.path}/${state.pose.image}`}
            alt={state.pose.description}
            className="pose-image"
          />

          <button className="favorite-button" onClick={handleFavoriteToggle}>
            {isPhotoFavorite ? (
              <img src="/images/app/star_on.svg" alt="remove from favorites" />
            ) : (
              <img src="/images/app/star_off.svg" alt="add to favorites" />
            )}
          </button>

        </div>

        <h2 className="pose-title">{state.pose.title}</h2>

        <p className="pose-description">{state.pose.description}</p>

      </div>

      <div className="pose-navigation">

        {/* кнопка влево */}
        <button onClick={() => navigate(`/pose-detail/${categoryId}/${prevPoseId}`)} className="pose-navButton">
          <img src="/images/app/left.svg" alt="previous" className="pose-icon" />
        </button>

        {/* номер текущей позы */}
        <span className="pose-pageIndicator">{`${poseId}/${state.poses.length}`}</span>

        {/* кнопка вправо */}
        <button onClick={() => navigate(`/pose-detail/${categoryId}/${nextPoseId}`)} className="pose-navButton">
          <img src="/images/app/right.svg" alt="next" className="pose-icon" />
        </button>

      </div>

      {/* модальное окно */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <SignInOut closeModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default PoseDetailScreen;
