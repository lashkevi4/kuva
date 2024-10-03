import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import Modal from './Modal';
import SignInOut from './SignInOut';
import { auth } from './firebaseConfig';
import '../styles/global.css';


function StartScreen() {

  const [showModal, setShowModal] = useState(false); // state to control modal visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state to track if the user is logged in

  // check user authentication when the component is mounted
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true); // user is logged in
      }
      else {
        setIsLoggedIn(false); // user is not logged in
      }
    });

    // unsubscribe from the listener when the component is unmounted
    return () => unsubscribe();

  }, []);

  // handle click on the "Favorites" button
  const handleFavoritesClick = (e) => {

    if (!isLoggedIn) {
      e.preventDefault(); // prevent navigation if the user is not logged in
      setShowModal(true); // show the login modal
    }

  };

  const closeModal = () => {
    setShowModal(false); // close the modal
  };

  return (

    <div className="main-container">

      {/* header with the burger menu, passing authentication info to the component */}
      <div className="startScreenHeader">
        <BurgerMenu isLoggedIn={isLoggedIn} />
      </div>

      <h1 className="titleSmall">— T H E —</h1>
      <h2 className="titleLarge">POSING</h2>
      <p className="description">Your story, my lens, a timeless masterpiece awaits</p>

      <img src="/images/app/start-screen.png" alt="Posing App" className="image" />

      <div className="button-container">

        <Link to="/categories" className="button">Poses</Link> {/* navigate to pose categories */}

        <Link to="/tips" className="button">Tips & Tricks</Link> {/* navigate to tips and tricks */}

        {/* Favorites" button, only accessible if the user is logged in */}
        <Link
          to={isLoggedIn ? "/favorites" : "#"} // if the user is not logged in, the link doesn't navigate anywhere
          className="button"
          onClick={handleFavoritesClick} // if not logged in, open the login modal
        >
          Favorites
        </Link>
      </div>

      {/* modal that opens on "favorites" click for unauthenticated users */}
      {showModal && (

        <Modal onClose={closeModal}>
          <SignInOut closeModal={closeModal} /> {/* login/registration form component */}
        </Modal>

      )}

    </div>

  );

}


export default StartScreen;
