import React, { useState, useEffect } from 'react';
import { ref, get, remove } from "firebase/database";
import { database, auth } from './firebaseConfig';
import BurgerMenu from './BurgerMenu';
import '../styles/global.css';

function FavoritesScreen() {
  // create state to store favorite photos
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // fetch favorite data from the database
    const fetchFavorites = async () => {

      // get the current user id
      const userId = auth.currentUser.uid;

      // create a reference to the user's favorites in the database
      const favoritesRef = ref(database, `users/${userId}/favorites`);

      try {
        // get the data from the database
        const snapshot = await get(favoritesRef);
        if (snapshot.exists()) {

          // store the favorite photos data
          const favoritesData = snapshot.val();

          // update the favorites state
          setFavorites(Object.entries(favoritesData));

        } else {
          // if no favorites, set an empty array
          setFavorites([]);
        }

      } catch (error) {
        // handle errors while fetching data
        console.error("Error fetching favorites:", error);
      }

    };

    fetchFavorites();
  }, []);

  // function to remove a photo from favorites
  const handleRemoveFavorite = async (key) => {

    // get the current user id
    const userId = auth.currentUser.uid;

    // create a reference to the specific favorite photo
    const favoriteRef = ref(database, `users/${userId}/favorites/${key}`);

    try {
      // remove the favorite from the database
      await remove(favoriteRef);

      // update the state after removal
      setFavorites(prevFavorites => prevFavorites.filter(([favKey]) => favKey !== key));

    } catch (error) {
      // handle errors during removal
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

              <h2>{key.split('_')[0]}</h2> {/* category name */}

              <div className="favorite-image-container">

                <img
                  src={`/images/photos/${key.split('_')[0].toLowerCase()}/photo${favorite.photoId}.jpg`} // path to the image
                  alt={`Pose ${favorite.photoId}`} // image description
                  className="favorite-photo"
                />

                <button className="favorite-button" onClick={() => handleRemoveFavorite(key)}>

                  <img src="/images/app/star_on.svg" alt="Remove from Favorites" className="star-icon" /> {/* button to remove the photo from favorites */}

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
