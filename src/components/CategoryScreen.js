import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoriesPoses } from '../categoriesPoses';
import BurgerMenu from './BurgerMenu';
import { auth } from './firebaseConfig';
import '../styles/global.css';


function CategoryScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state for user authentication

  // check authentication status when the component is mounted
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

  return (
    <div className="main-container">

      {/* display the burger menu */}
      <div className="header">
        <BurgerMenu isLoggedIn={isLoggedIn} />
      </div>

      <h1 className="title">Categories</h1>

      <div className="category-grid">

        {categoriesPoses.map((category) => (

          <Link to={`/pose-preview/${category.id}`} key={category.id} className="category-item">

            <img src={`/images/app/${category.icon}`} alt={category.name} className="category-icon" />

            <span className="category-text">{category.name}</span>
          </Link>

        ))}

      </div>

    </div>
  );
}


export default CategoryScreen;
