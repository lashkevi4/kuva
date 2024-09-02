import React, { useState, useEffect } from 'react';
import { ref, get, remove } from "firebase/database";
import { database, auth } from './firebaseConfig';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import BackButton from './BackButton';
import '../styles/global.css';

function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="main-container">
      <div className="header">
        <BackButton />
        <div className="iconButton">
          <img
            src="/images/app/burger.svg"
            alt="menu"
            className="iconImage"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>

      <h1 className="title">Your Favorites</h1>

      <Menu
        isOpen={menuOpen}
        onStateChange={handleStateChange}
        width={'70%'}
        customBurgerIcon={false}
        customCrossIcon={false}
      >
        <Link to="/" onClick={closeMenu} className="menu-item">
          Home
        </Link>
        <Link to="/categories" onClick={closeMenu} className="menu-item">
          Poses
        </Link>
        <Link to="/tips" onClick={closeMenu} className="menu-item">
          Tips & Tricks
        </Link>
        <Link to="/favorites" onClick={closeMenu} className="menu-item">
          Favorites
        </Link>
      </Menu>

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
                  className="favorite-photo" // Применяем новый класс для фотографий
                />
                <button className="favorite-button" onClick={() => handleRemoveFavorite(key)}>
                  <img src="/images/app/star_on.svg" alt="Remove from Favorites" className="star-icon" />
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
