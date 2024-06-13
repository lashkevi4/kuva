import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categories } from '../categories';
import './PosePreviewScreen.css';

function PosePreviewScreen() {
  const { categoryId } = useParams();
  const [poses, setPoses] = useState([]);
  const category = categories.find(c => c.id === parseInt(categoryId));

  useEffect(() => {
    if (category) {
      fetch(`/images/${category.path}/data.json`)
        .then(response => response.json())
        .then(data => setPoses(data))
        .catch(error => console.error('Error loading data:', error));
    }
  }, [category]);

  return (
    <div className="container">
      <div className="header">
        <Link to="/categories" className="backButton">
          <img src="/images/app/back.svg" alt="Назад" className="backIcon" />
        </Link>
        <h1 className="title">{category ? category.name : 'Категория'}</h1>
      </div>
      <div className="grid">
        {poses.map(pose => (
          <Link to={`/pose-detail/${categoryId}/${pose.id}`} key={pose.id} className="item">
            <img src={`/images/${category.path}/${pose.image}`} alt={pose.description} className="image" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PosePreviewScreen;
