import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { categoriesPoses } from '../categoriesPoses';
import { slide as Menu } from 'react-burger-menu';
import '../styles/global.css'; // Глобальные стили
import { ref, get, remove, set } from "firebase/database";
import { database, auth } from './firebaseConfig';

function PoseDetailScreen() {
  const { categoryId, poseId } = useParams();
  const [state, setState] = useState({ pose: { title: '', description: '', image: '' }, poses: [] });
  const [isPhotoFavorite, setIsPhotoFavorite] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const category = categoriesPoses.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' };

  useEffect(() => {
    fetch(`/images/photos/${category.path}/data.json`)
      .then(response => response.json())
      .then(data => {
        const poseData = data.photos.find(p => p.id === parseInt(poseId));
        setState({ pose: poseData || { title: '', description: '', image: '' }, poses: data.photos });
      })
      .catch(error => console.error('Error loading data:', error));
  }, [category.path, poseId]);

  useEffect(() => {
    const checkIfFavorite = async () => {
      const userId = auth.currentUser.uid;
      const favoriteKey = `${category.name}_${poseId}`;
      const favoriteRef = ref(database, `users/${userId}/favorites/${favoriteKey}`);

      try {
        const snapshot = await get(favoriteRef);
        if (snapshot.exists()) {
          setIsPhotoFavorite(true);
        } else {
          setIsPhotoFavorite(false);
        }
      } catch (error) {
        console.error("Error checking favorites:", error);
      }
    };

    checkIfFavorite();
  }, [category.name, poseId]);

  const handleFavoriteToggle = async () => {
    const userId = auth.currentUser.uid;
    const favoriteKey = `${category.name}_${poseId}`;
    const favoriteRef = ref(database, `users/${userId}/favorites/${favoriteKey}`);

    try {
      if (isPhotoFavorite) {
        await remove(favoriteRef);
        setIsPhotoFavorite(false);
      } else {
        await set(favoriteRef, {
          photoId: poseId
        });
        setIsPhotoFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const nextPoseId = parseInt(poseId) < state.poses.length ? parseInt(poseId) + 1 : 1;
  const prevPoseId = parseInt(poseId) > 1 ? parseInt(poseId) - 1 : state.poses.length;

  return (
    <div className="main-container">
      <div className="header">
        <div className="iconButton">
          <img
            src="/images/app/burger.svg"
            alt="menu"
            className="iconImage"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>
      <h1 className="title">{category.name}</h1>

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

      <div className="pose-content">
        <div className="pose-image-container">
          <img src={`/images/photos/${category.path}/${state.pose.image}`} alt={state.pose.description} className="pose-image" />
          <button className="favorite-button" onClick={handleFavoriteToggle}>
            {isPhotoFavorite ? (
              <img src="/images/app/star_on.svg" alt="Remove from Favorites" />
            ) : (
              <img src="/images/app/star_off.svg" alt="Add to Favorites" />
            )}
          </button>
        </div>
        <h2 className="pose-title">{state.pose.title}</h2>
        <p className="pose-description">{state.pose.description}</p>
      </div>
      <div className="pose-navigation">
        <button onClick={() => navigate(`/pose-detail/${categoryId}/${prevPoseId}`)} className="pose-navButton">
          <img src="/images/app/left.svg" alt="previous" className="pose-icon" />
        </button>
        <span className="pose-pageIndicator">{`${poseId}/${state.poses.length}`}</span>
        <button onClick={() => navigate(`/pose-detail/${categoryId}/${nextPoseId}`)} className="pose-navButton">
          <img src="/images/app/right.svg" alt="next" className="pose-icon" />
        </button>
      </div>
    </div>
  );
}

export default PoseDetailScreen;
