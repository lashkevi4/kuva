import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';

const categories = [
  { id: 1, name: 'Дети' },
  { id: 2, name: 'Женщины' },
  { id: 3, name: 'Мужчины' },
  { id: 4, name: 'Пары' },
  { id: 5, name: 'Группы' },
  { id: 6, name: 'Свадебные' },
  { id: 7, name: 'Гламур' },
];

function CategoryScreen() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <BackButton />
        <h1 style={styles.title}>Катагеории</h1>
      </div>
      <div style={styles.grid}>
        {categories.map(category => (
          <Link to={`/pose-preview/${category.id}`} key={category.id} style={styles.item}>
            {category.name}
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
    position: 'relative',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  title: {
    margin: 0,
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  item: {
    padding: '20px',
    border: '1px solid #000',
    borderRadius: '5px',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#000',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default CategoryScreen;
