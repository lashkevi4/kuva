import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link, useNavigate } from 'react-router-dom';
import SignInOut from './SignInOut';
import Modal from './Modal';
import { auth } from './firebaseConfig';
import '../styles/global.css';

// main component for the sidebar menu
const BurgerMenu = () => {

  const [menuOpen, setMenuOpen] = useState(false); // state for menu open/close
  const [isModalOpen, setIsModalOpen] = useState(false); // state for modal window open/close
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state for user authentication


  const navigate = useNavigate(); // hook for page navigation

  // check user authentication status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // update authentication state
    });

    return unsubscribe; // unsubscribe when component unmounts
  }, []);

  const closeMenu = () => setMenuOpen(false); // close the menu

  // handle click on "favorites", open login modal if not logged in
  const handleFavoritesClick = (event) => {

    if (!isLoggedIn) {
      event.preventDefault();
      setIsModalOpen(true); // open modal for login
      closeMenu(); // close the menu
    }

    else {
      closeMenu();
    }

  };

  // function for signout
  const handleSignOut = () => {

    auth.signOut().then(() => {
      closeMenu(); // close the menu after sign out
      navigate('/'); // navigate to the homepage
    });

  };

  // open modal and close menu
  const openModalAndCloseMenu = () => {

    setIsModalOpen(true); // open the login modal
    closeMenu(); // close the menu

  };

  return (

    <div className="burgerMenuContainer">

      <Menu
        isOpen={menuOpen}
        onStateChange={({ isOpen }) => setMenuOpen(isOpen)} // update menu state
        left
        width={'70%'}
        customBurgerIcon={false}
        customCrossIcon={false}
      >

        <Link to="/" className="burgerMenuItem button" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/categories" className="burgerMenuItem button" onClick={closeMenu}>
          Poses
        </Link>

        <Link to="/tips" className="burgerMenuItem button" onClick={closeMenu}>
          Tips & Tricks
        </Link>

        <Link
          to={isLoggedIn ? "/favorites" : "#"}
          className="burgerMenuItem button"
          onClick={handleFavoritesClick} // handle click on "favorites"
        >
          Favorites
        </Link>

        {isLoggedIn ? (

          <Link to="#" className="burgerMenuItem button" onClick={handleSignOut}>
            Sign Out
          </Link>

        ) : (
          <Link to="#" className="burgerMenuItem button" onClick={openModalAndCloseMenu}>
            Sign In
          </Link>

        )}

      </Menu>

      {/* modal window for authentication */}
      {isModalOpen && (

        <Modal onClose={() => setIsModalOpen(false)}>
          <SignInOut closeModal={() => setIsModalOpen(false)} />
        </Modal>

      )}

      {/* burger button to open the menu */}
      <div className="burgerIcon" onClick={() => setMenuOpen(!menuOpen)}>

        <img src="/images/app/burger.svg" alt="Menu" className="burgerIconSvg" />

      </div>

    </div>

  );
};

export default BurgerMenu;
