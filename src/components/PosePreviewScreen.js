import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categoriesPoses } from '../categoriesPoses';

function PosePreviewScreen() {
  const { categoryId } = useParams(); // получаю id категории из параметров url
  const [poses, setPoses] = useState([]); // использую useState для хранения списка поз

  // находим нужную категорию по id
  const category = categoriesPoses.find(c => c.id === parseInt(categoryId)) || { name: '', path: '' };

  // загружаем данные с позами при монтировании компонента
  useEffect(() => {
    if (category) {
      fetch(`/images/photos/${category.path}/data.json`)
        .then(response => response.json()) // преобразую ответ в JSON
        .then(data => setPoses(data.photos)) // сохраняю данные в состояние
        .catch(error => console.error('Error loading data:', error)); // вывожу ошибку в консоль
    }
  }, [category]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/categories" style={styles.backButton}>
          <img src="/images/app/back.svg" alt="back" style={styles.backIcon} />
        </Link>
        <h1 style={styles.title}>{category.name}</h1> {/* название категории */}
      </div>
      <div style={styles.grid}>
        {poses.map(pose => (
          <Link to={`/pose-detail/${categoryId}/${pose.id}`} key={pose.id} style={styles.item}>
            {/* изображение позы, загружаю путь к файлу */}
            <img src={`/images/photos/${category.path}/${pose.image}`} alt={pose.description} style={styles.image} />
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#000',
  },
  backIcon: {
    width: '50px',
    height: '50px',
  },
  title: {
    fontSize: '36px',
    fontFamily: 'Georgia, serif',
    textAlign: 'center',
    flex: 1,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
  item: {
    width: 'calc(50% - 10px)',
    border: '1px solid #000',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
  },
};

export default PosePreviewScreen;
