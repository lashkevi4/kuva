import React, { useState, useEffect } from 'react';
import { ref, get, remove } from "firebase/database";
import { database, auth } from './firebaseConfig';
import { Link } from 'react-router-dom';
import './FavoritesScreen.css';

function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = auth.currentUser.uid;
      const favoritesRef = ref(database, `users/${userId}/favorites`);

      try {
        const snapshot = await get(favoritesRef);
        if (snapshot.exists()) {
          const favoritesData = snapshot.val();
          setFavorites(Object.entries(favoritesData));
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (key) => {
    const userId = auth.currentUser.uid;
    const favoriteRef = ref(database, `users/${userId}/favorites/${key}`);

    try {
      await remove(favoriteRef);
      setFavorites(prevFavorites => prevFavorites.filter(([favKey]) => favKey !== key));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="favorites-container">
      <Link to="/" className="backButton">
        <img src="/images/app/back.svg" alt="back" className="backIcon" />
      </Link>
      <h1>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>You have no favorite photos yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map(([key, favorite]) => (
            <div key={key} className="favorite-item">
              <h2>{key.split('_')[0]}</h2> {/* Имя категории */}
              <div className="favorite-image-container">
                <img
                  src={`/images/photos/${key.split('_')[0]}/photo${favorite.photoId}.png`}
                  alt={`Pose ${favorite.photoId}`}
                />
                <button className="favorite-button" onClick={() => handleRemoveFavorite(key)}>
                  <img src="/images/app/star_on.svg" alt="Remove from Favorites" />
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
