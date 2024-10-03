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
  // get parameters from url
  const { categoryId, poseId } = useParams();

  // create state for the current pose and all poses
  const [state, setState] = useState({
    pose: { title: '', description: '', image: '' },
    poses: []
  });

  // create state for favorite status and modal window
  const [isPhotoFavorite, setIsPhotoFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // create function for navigation between pages
  const navigate = useNavigate();

  // find the category by id
  const category = categoriesPoses.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' };

  // load pose data when category or pose changes
  useEffect(() => {

    fetch(`/images/photos/${category.path}/data.json`)
      .then(response => response.json())
      .then(data => {

        // find the current pose by id
        const poseData = data.photos.find(p => p.id === parseInt(poseId));

        // update state with pose data
        setState({
          pose: poseData || { title: '', description: '', image: '' },
          poses: data.photos

        });

      })

      // log error to console
      .catch(error => console.error('Error loading data:', error));

  }, [category.path, poseId]);

  // check if the pose is marked as favorite
  useEffect(() => {

    // function to check if the pose is in favorites
    const checkIfFavorite = async () => {

      // if the user is not logged in, reset favorite status
      if (!auth.currentUser) {
        setIsPhotoFavorite(false);
        return;
      }

      // get the user id and create a key for the favorite pose
      const userId = auth.currentUser.uid;
      const favoriteKey = `${category.name}_${poseId}`;

      // create a reference to the favorite entry in the database
      const favoriteRef = ref(database, `users/${userId}/favorites/${favoriteKey}`);

      try {
        // check if the pose is in favorites
        const snapshot = await get(favoriteRef);

        // update favorite status based on the database entry
        setIsPhotoFavorite(snapshot.exists());
      } catch (error) {

        // log error to console
        console.error("Error checking favorite:", error);
      }

    };

    checkIfFavorite();
  }, [category.name, poseId]);

  // function to add or remove pose from favorites
  const handleFavoriteToggle = async () => {
    if (!auth.currentUser) {
      setIsModalOpen(true);
      return;
    }

    // create data for the favorite reference: user id, key, and database path
    const userId = auth.currentUser.uid;
    const favoriteKey = `${category.name}_${poseId}`;
    const favoriteRef = ref(database, `users/${userId}/favorites/${favoriteKey}`);

    // toggle favorite status: add or remove pose from favorites
    try {
      if (isPhotoFavorite) {

        // if the pose is already in favorites, remove it from the database and update state
        await remove(favoriteRef);
        setIsPhotoFavorite(false);
      } else {

        // if the pose is not in favorites, add it to the database and update state
        await set(favoriteRef, { photoId: poseId });
        setIsPhotoFavorite(true);
      }

    } catch (error) {
      // handle error while updating favorite status
      console.error("Error updating favorite:", error);
    }

  };

  // calculate id for the next and previous pose
  const nextPoseId = parseInt(poseId) < state.poses.length ? parseInt(poseId) + 1 : 1;
  const prevPoseId = parseInt(poseId) > 1 ? parseInt(poseId) - 1 : state.poses.length;

  // configure swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () => navigate(`/pose-detail/${categoryId}/${nextPoseId}`),
    onSwipedRight: () => navigate(`/pose-detail/${categoryId}/${prevPoseId}`),
    preventDefaultTouchmoveEvent: true,
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

        {/* button to go to the previos pose */}
        <button onClick={() => navigate(`/pose-detail/${categoryId}/${prevPoseId}`)} className="pose-navButton">
          <img src="/images/app/left.svg" alt="previous" className="pose-icon" />
        </button>

        {/* display the current pose number */}
        <span className="pose-pageIndicator">{`${poseId}/${state.poses.length}`}</span>

        {/* button to go to the next pose */}
        <button onClick={() => navigate(`/pose-detail/${categoryId}/${nextPoseId}`)} className="pose-navButton">
          <img src="/images/app/right.svg" alt="next" className="pose-icon" />
        </button>

      </div>

      {/* modal window for login */}
      {isModalOpen && (

        <Modal onClose={() => setIsModalOpen(false)}>
          <SignInOut closeModal={() => setIsModalOpen(false)} />
        </Modal>

      )}

    </div>

  );

}


export default PoseDetailScreen;
