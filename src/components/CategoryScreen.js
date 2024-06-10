import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';

const categories = [
  { id: 1, name: 'Дети', icon: 'children.svg' },
  { id: 2, name: 'Женщины', icon: 'women.svg' },
  { id: 3, name: 'Мужчины', icon: 'men.svg' },
  { id: 4, name: 'Пары', icon: 'couples.svg' },
  { id: 5, name: 'Группы', icon: 'groups.svg' },
  { id: 6, name: 'Свадебные', icon: 'wedding.svg' },
  { id: 7, name: 'Гламур', icon: 'glamour.svg' },
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
            <img src={`/images/app/${category.icon}`} alt={category.name} style={styles.icon} />
            <span style={styles.text}>{category.name}</span>
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
    alignItems: 'center', // центрируем элементы по горизонтали
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #000',
    borderRadius: '5px',
    textDecoration: 'none',
    color: '#000',
    width: '100%',
    maxWidth: '300px',
    justifyContent: 'center', // центрируем элементы по горизонтали внутри
  },
  icon: {
    width: '50px',
    height: '50px',
    marginRight: '10px', // небольшое расстояние между картинкой и текстом
  },
  text: {
    fontSize: '30px', // используем тот же размер шрифта, что и на главной странице
    fontFamily: 'Georgia, serif', // используем тот же шрифт, что и на главной странице
  },
};

export default CategoryScreen;
