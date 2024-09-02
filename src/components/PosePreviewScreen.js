import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoriesPoses } from '../categoriesPoses';
import { slide as Menu } from 'react-burger-menu';
import '../styles/global.css';

function PosePreviewScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const { categoryId } = useParams();
  const category = useMemo(() => categoriesPoses.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' }, [categoryId]);
  const [poses, setPoses] = useState([]);

  useEffect(() => {
    fetch(`/images/photos/${category.path}/data.json`)
      .then(response => response.json())
      .then(data => setPoses(data.photos))
      .catch(error => console.error('Error loading data:', error));
  }, [category.path]);

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
        width={'70%'} /* Определяем ширину выезжающего меню */
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

      <div className="preview-grid">
        {poses.map(pose => (
          <Link to={`/pose-detail/${categoryId}/${pose.id}`} key={pose.id} className="preview-item">
            <img src={`/images/photos/${category.path}/${pose.image}`} alt={pose.description} className="preview-image" />
          </Link>
        ))}
      </div>

    </div>
  );
}

export default PosePreviewScreen;
