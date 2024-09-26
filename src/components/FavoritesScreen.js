import React, { useState, useEffect } from 'react';
import { ref, get, remove } from "firebase/database";
import { database, auth } from './firebaseConfig';
import BurgerMenu from './BurgerMenu';
import '../styles/global.css';

function FavoritesScreen() {
  // создаем состояние для хранения избранных фотографий
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // получаем данные избранного из базы
    const fetchFavorites = async () => {

      // получаем id текущего пользователя
      const userId = auth.currentUser.uid;
      // создаем ссылку на данные избранного в базе
      const favoritesRef = ref(database, `users/${userId}/favorites`);

      try {
        // получаем данные из базы
        const snapshot = await get(favoritesRef);
        if (snapshot.exists()) {

          // данные избранных фотографий
          const favoritesData = snapshot.val();

          // обновляем состояние избранного
          setFavorites(Object.entries(favoritesData));

        } else {
          // если избранного нет, устанавливаем пустой массив
          setFavorites([]);
        }

      } catch (error) {
        // обработка ошибок при получении данных
        console.error("Error fetching favorites:", error);
      }

    };

    fetchFavorites();
  }, []);

  // функция для удаления избранного фото
  const handleRemoveFavorite = async (key) => {

    // получаем id текущего пользователя
    const userId = auth.currentUser.uid;

    // создаем ссылку на конкретное избранное фото
    const favoriteRef = ref(database, `users/${userId}/favorites/${key}`);

    try {
      // удаляем избранное из базы
      await remove(favoriteRef);

      // обновляем состояние после удаления
      setFavorites(prevFavorites => prevFavorites.filter(([favKey]) => favKey !== key));

    } catch (error) {
      // обработка ошибок при удалении
      console.error("Error removing favorite:", error);
    }

  };

  return (

    <div className="main-container">

      <div className="header">
        <BurgerMenu />
      </div>

      <h1 className="title">Your Favorites</h1>

      {favorites.length === 0 ? (
        <>
          <p>You have no favorite photos yet.</p> {/* сообщение пользователю  */}
        </>
      ) : (
        <div className="favorites-grid">

          {favorites.map(([key, favorite]) => (

            <div key={key} className="favorite-item">

              <h2>{key.split('_')[0]}</h2> {/* имя категории */}

              <div className="favorite-image-container">

                <img
                  src={`/images/photos/${key.split('_')[0].toLowerCase()}/photo${favorite.photoId}.jpg`} // путь к изображению
                  alt={`Pose ${favorite.photoId}`} // описание изображения
                  className="favorite-photo"
                />

                <button className="favorite-button" onClick={() => handleRemoveFavorite(key)}>

                  <img src="/images/app/star_on.svg" alt="Remove from Favorites" className="star-icon" /> {/* удаления фото из избранного */}

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default FavoritesScreen;
