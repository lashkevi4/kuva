import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoriesPoses } from '../categoriesPoses';
import BurgerMenu from './BurgerMenu';
import '../styles/global.css';


function PosePreviewScreen() {
  const { categoryId } = useParams(); // get categoryId from the url

  // find the category by id or create an empty one if not found
  const category = useMemo(() => categoriesPoses.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' }, [categoryId]);

  // state to store the list of poses
  const [poses, setPoses] = useState([]);

  // load pose data from the corresponding json file on the server
  useEffect(() => {

    // fetch pose data from the json file on the server
    fetch(`/images/photos/${category.path}/data.json`)
      .then(response => response.json())
      .then(data => setPoses(data.photos)) // оupdate state with loaded poses

      .catch(error => console.error('Error loading data:', error)); // log error if data loading fails

  }, [category.path]);

  return (

    <div className="main-container">

      {/* display burger menu */}
      <div className="header">
        <BurgerMenu />
      </div>

      {/* display category name */}
      <h1 className="title">{category.name}</h1>

      {/* displey grid with previews of all poses in the category*/}
      <div className="preview-grid">

        {poses.map(pose => (

          <Link to={`/pose-detail/${categoryId}/${pose.id}`} key={pose.id} className="preview-item">

            <img src={`/images/photos/${category.path}/${pose.image}`} alt={pose.description} className="preview-image" /> {/* pose preview image */}

          </Link>

        ))}

      </div>

    </div>

  );
}


export default PosePreviewScreen;
