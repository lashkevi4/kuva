import React, { useState, useEffect } from 'react';
import { ref, get, remove } from "firebase/database";
import { database, auth } from './firebaseConfig'; // подключаем firebase
import BurgerMenu from './BurgerMenu'; // подключаем бургер-меню
import '../styles/global.css';

function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]); // создаем состояние для хранения избранных фотографий

  useEffect(() => {

    const fetchFavorites = async () => {

      const userId = auth.currentUser.uid; // получаем id текущего пользователя
      const favoritesRef = ref(database, `users/${userId}/favorites`); // создаем ссылку на данные избранного в базе

      try {

        const snapshot = await get(favoritesRef); // получаем данные из базы
        if (snapshot.exists()) {
          const favoritesData = snapshot.val(); // данные избранных фотографий
          setFavorites(Object.entries(favoritesData)); // обновляем состояние избранного
        } else {
          setFavorites([]); // если избранного нет, устанавливаем пустой массив
        }

      } catch (error) {
        console.error("Error fetching favorites:", error); // обработка ошибок при получении данных
      }

    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (key) => {

    const userId = auth.currentUser.uid; // получаем id текущего пользователя
    const favoriteRef = ref(database, `users/${userId}/favorites/${key}`); // создаем ссылку на конкретное избранное фото

    try {

      await remove(favoriteRef); // удаляем избранное из базы
      setFavorites(prevFavorites => prevFavorites.filter(([favKey]) => favKey !== key)); // обновляем состояние после удаления

    } catch (error) {

      console.error("Error removing favorite:", error); // обработка ошибок при удалении

    }

  };

  return (

    <div className="main-container">
      {/* подключаем бургер-меню */}

      <div className="header">
        <BurgerMenu />
      </div>

      <h1 className="title">Your Favorites</h1>

      {favorites.length === 0 ? (
        <>
          <p>You have no favorite photos yet.</p> {/* сообщение, если список избранных пустой */}
        </>
      ) : (
        <div className="favorites-grid">

          {favorites.map(([key, favorite]) => (

            <div key={key} className="favorite-item">

              <h2>{key.split('_')[0]}</h2> {/* отображаем имя категории фото */}

              <div className="favorite-image-container">

                <img
                  src={`/images/photos/${key.split('_')[0].toLowerCase()}/photo${favorite.photoId}.jpg`} // путь к изображению
                  alt={`Pose ${favorite.photoId}`} // описание изображения
                  className="favorite-photo"
                />

                <button className="favorite-button" onClick={() => handleRemoveFavorite(key)}>

                  <img src="/images/app/star_on.svg" alt="Remove from Favorites" className="star-icon" /> {/* кнопка удаления фото из избранного */}

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
