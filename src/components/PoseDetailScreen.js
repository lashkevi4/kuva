import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { categoriesPoses } from '../categoriesPoses';
import './PoseDetailScreen.css';

function PoseDetailScreen() {
  const { categoryId, poseId } = useParams(); // получаем id категории и позы из url
  const [state, setState] = useState({ pose: { title: '', description: '', image: '' }, poses: [] });
  const navigate = useNavigate(); // Хук для навигации

  // находим нужную категорию по id
  const category = categoriesPoses.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' };

  // загружаем данные о позах при монтировании компонента и когда меняется poseId
  useEffect(() => {
    fetch(`/images/photos/${category.path}/data.json`)
      .then(response => response.json()) // преобразуем ответ в JSON
      .then(data => {
        const poseData = data.photos.find(p => p.id === parseInt(poseId)); // находим данные по текущей позе
        setState({ pose: poseData || { title: '', description: '', image: '' }, poses: data.photos }); // сохраняем данные в состояние
      })
      .catch(error => console.error('Error loading data:', error)); // выводим ошибку в консоль
  }, [category.path, poseId]);

  // определяем id следующей и предыдущей позы
  const nextPoseId = parseInt(poseId) < state.poses.length ? parseInt(poseId) + 1 : 1;
  const prevPoseId = parseInt(poseId) > 1 ? parseInt(poseId) - 1 : state.poses.length;

  return (
    <div className="pose-container">
      <div className="pose-header">
        <Link to={`/pose-preview/${categoryId}`} className="pose-backButton">
          <img src="/images/app/back.svg" alt="back" className="pose-backIcon" />
        </Link>
        <h1 className="pose-title">{category.name}</h1> {/* отображаем название категории */}
      </div>
      <div className="pose-content">
        <img src={`/images/photos/${category.path}/${state.pose.image}`} alt={state.pose.description} className="pose-image" />
        <h2 className="pose-title">{state.pose.title}</h2> {/* отображаем заголовок позы */}
        <p className="pose-description">{state.pose.description}</p> {/* отображаем описание позы */}
      </div>
      <div className="pose-navigation">
        <button onClick={() => navigate(`/pose-detail/${categoryId}/${prevPoseId}`)} className="pose-navButton">
          <img src="/images/app/left.svg" alt="previous" className="pose-icon" />
        </button>
        <span className="pose-pageIndicator">{`${poseId}/${state.poses.length}`}</span> {/* отображаем номер текущей позы */}
        <button onClick={() => navigate(`/pose-detail/${categoryId}/${nextPoseId}`)} className="pose-navButton">
          <img src="/images/app/right.svg" alt="next" className="pose-icon" />
        </button>
      </div>
    </div>
  );
}

export default PoseDetailScreen;
