import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoriesPoses } from '../categoriesPoses';
import '../styles/global.css';
import BurgerMenu from './BurgerMenu'; // Подключаем бургер-меню

function PosePreviewScreen() {
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
      {/* Подключаем бургер-меню */}
      <div className="header">
        <BurgerMenu />
      </div>

      <h1 className="title">{category.name}</h1>

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
